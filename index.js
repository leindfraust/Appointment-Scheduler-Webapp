require("dotenv").config()
const express = require('express');
const session = require('express-session');
const formidable = require('formidable');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util')
const fs = require('fs');
const MongoStore = require('connect-mongo');
const history = require('connect-history-api-fallback');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const nodemailer = require('nodemailer');
const {
    PORT,
    mongoUri
} = require('./config');
const server = app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080" || "http://192.168.1.11:8080"
    }
});

//schemas
const managerRoute = require('./routes/api/manager')
const appointmentListRoute = require('./routes/api/appointmentList')
const superUserRoute = require('./routes/api/superuser')
const authenticationCodeRoute = require('./routes/api/authenticationCodes')
const adminRoute = require('./routes/api/adminList')
const sessAdmin = require('./sessions/models/admin')
const sessPatient = require('./sessions/models/user')
const sessManager = require('./sessions/models/manager')
const sessSuperuser = require('./sessions/models/superuser')
const user = require('./routes/api/user')
const rooms = require('./routes/api/rooms')
const geolocation = require('./routes/api/geolocation')

//geoHospital queries global variable
let userLocationQuery = ''

//express usages
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(history())
app.use(express.static(path.join(__dirname, 'appointment-scheduler-webapp/dist')))

//connect to mongoDB
const dbConnect = async () => {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};

dbConnect().then(() => console.log('MongoDB online')).catch((err) => console.log(err))

//cloudinary config
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

//io middlewares
/*io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!this.username) {
        return next(new Error("cannot connect, please try again"));
    }
    socket.username = username
    next();
}); */


//add patient records to the doctor of a new patient
app.post('/api/patientUpdate', async (req, res) => {
    let doctorID = req.body.doctorID
    let patientID = req.body.patientID
    let patientFullName = req.body.patientFullName
    const Doctor = require('./model/adminList')

    Doctor.findOneAndUpdate({
        _id: doctorID
    }, {
        $push: {
            patients: {
                patient: patientID,
                patientName: patientFullName
            }
        }
    }, {
        returnOriginal: false
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

//pull doctor from a hospital
app.post('/api/doctorPullHospital', async (req, res) => {
    let doctorID = req.body.doctorID
    let hospital = req.body.hospital
    const Doctor = require('./model/adminList')

    Doctor.findOneAndUpdate({
        _id: doctorID
    }, {
        $pull: {
            hospitalOrigin: {
                hospital: hospital
            }
        }
    }, {
        returnOriginal: false,
        multi: true
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.status(200).end()
        }
    });
});

//push city/municipality in a Province 
app.post('/api/provinceUpdate', async (req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    const Province = require('./model/geolocation')

    Province.findOneAndUpdate({
        _id: provinceID
    }, {
        $push: {
            citiesOrMunicipalities: {
                name: cityOrMunicipality,
                postalCode: postalCode,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }

        }
    }, {
        returnOriginal: false
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

//pull city or municipality from a province
app.post('/api/provinceCityPull', async (req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    const Province = require('./model/geolocation')

    Province.findOneAndUpdate({
        _id: provinceID
    }, {
        $pull: {
            citiesOrMunicipalities: {
                name: cityOrMunicipality,
                postalCode: postalCode,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }
        }
    }, {
        returnOriginal: false,
        multi: true
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

//geospatial query find near hospital in user's current location
app.post('/api/geoFindHospitalNearestUser', async (req, res, next) => {
    let province = req.body.province
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    const userLocation = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    const Hospital = require('./model/manager')

    Hospital.aggregate([{
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            key: "location",
            distanceField: 'distance',
            spherical: true
        }
    }], (error, success) => {
        if (error) {
            console.log(error)
            res.end()
        } else {
            console.log(success)
            userLocationQuery = success.filter(x => x.province === province && x.status === 'Active')
            res.status(200).end()
        }
    })

})
app.get('/api/geoHospitalNearestUser', (req, res, next) => {
    res.send(userLocationQuery).status(200)
})
//io connect/usages
io.on('connection', (socket) => {
    let roomNo = null
    const Patient = require('./model/user')
    socket.on('join room', (id) => {
        socket.join(id)
        roomNo = id
        Patient.find({
            _id: id
        }).then(response => {
            io.to(roomNo).emit('messages', response[0].messages)
        }).catch(error => {
            //do nothing
        })
    });
    console.log('Client connected');
    socket.on('connect', () => console.log('Client connected'))
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('message', (msg, user, date) => {
        Patient.findOneAndUpdate({
            _id: roomNo
        }, {
            $push: {
                messages: {
                    from: user,
                    message: msg,
                    date: date,
                    new: true
                },
            },
        }, {
            returnOriginal: false
        }, function (error, success) {
            if (error) {
                console.log(error)
            } else {
                console.log(success)
                io.to(roomNo).emit('send messages', success.messages)
            }
        });
    });
    socket.on('update message', (notifications) => {
        Patient.findOneAndUpdate({
            _id: roomNo
        }, {
            messages: notifications
        }, {
            returnOriginal: false
        }, function (error, success) {
            if (error) {
                console.log(error)
            } else {
                console.log(success)
            }
        });
    });
    socket.on('delete message', (id, notif) => {
        Patient.findOneAndUpdate({
            _id: id
        }, {
            $pull: {
                messages: {
                    from: notif.user,
                    message: notif.message,
                    date: notif.date,
                    new: notif.new
                }
            }
        }, {
            returnOriginal: false
        }, function (error, success) {
            if (error) {
                console.log(error)
            } else {
                console.log(success)
            }
        }).clone().catch((err) => {
            console.log(err)
        }).then(response => {
            io.to(roomNo).emit('delete messages', response.messages)
        });
    });
});

//use sessions
app.use(session({
    secret: 'leindfraust',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
        mongoUrl: encodeURI(mongoUri),
    })
}));

// routes
app.use('/api/manager', managerRoute)
app.use('/api/appointmentList', appointmentListRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', user)
app.use('/session/admin', sessAdmin)
app.use('/session/patient', sessPatient)
app.use('/session/manager', sessManager)
app.use('/session/superuser', sessSuperuser)
app.use('/api/chatrooms', rooms)
app.use('/api/superuser', superUserRoute)
app.use('/api/code', authenticationCodeRoute)
app.use('/api/geolocation', geolocation)

//doctor image change profile picture upload
app.post('/api/imgUpload', async function (req, res, next) {

    const form = formidable({
        multiples: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile.filepath, {
            public_id: fields.alias,
            folder: "assets/doctors/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
            }
        });
    });
    setTimeout(() => {
        res.status(200).redirect('/imgUploadSuccess')
    }, 5000)
});
//doctor signup image upload
app.post('/api/imgUploadAdmin', async function (req, res, next) {

    const form = formidable({
        multiples: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile.filepath, {
            public_id: fields.alias,
            folder: "assets/doctors/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }, function (error, result) {
            console.log(result, error);
        });
    });
    setTimeout(() => {
        res.status(200).redirect('/imgUploadSuccessAdmin')
    }, 5000)
});

//manager upload photo 
app.post('/api/imgUploadManager', async function (req, res, next) {

    const form = formidable({
        multiples: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile.filepath, {
            public_id: fields.hospital,
            folder: "assets/managers/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }, function (error, result) {
            console.log(result, error);
        });
    });
    setTimeout(() => {
        res.status(200).redirect('/imgUploadSuccessManager')
    }, 5000)
});

//nodemailer config
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.nodemaileruser,
        pass: process.env.nodemailerpass
    }
});

//nodemailer smtp@gmail
app.post('/api/sendMail', async (req, res) => {
    let email = req.body.email
    let code = req.body.code
    var mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Login request code',
        text: `Your login request code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nRonan`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).end();
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).end();
        }
    });
});

//OTP
app.post('/api/OTPMail', async (req, res) => {
    let email = req.body.email
    let code = req.body.code
    var mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Verification',
        text: `Your verification code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nRonan`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).end();
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).end();
        }
    });
});

//serve dist in node local server
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'appointment-scheduler-webapp/dist/index.html'))

});