require("dotenv").config()
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const history = require('connect-history-api-fallback');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
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

//express usages
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(history())
app.use(express.static(path.join(__dirname, '../client/dist')))

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

//schemas and route logic
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
const geolocation = require('./routes/api/geolocation')
const doctorQuery = require('./routes/api/doctorQuery')
const provinceQuery = require('./routes/api/provinceQuery')
const geoHospitalQuery = require('./routes/api/geoHospitalQuery')
const imgUploader = require('./routes/api/imgUploader')
const nodemailer = require('./routes/api/nodemailer')
const loginAuth = require('./routes/api/loginAuth')
const updatePassword = require('./routes/api/updatePassword');
const fupdatePassword = require('./routes/api/forceUpdatePassword');

//apis
app.use('/api/manager', managerRoute)
app.use('/api/appointmentList', appointmentListRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', user)
app.use('/api/superuser', superUserRoute)
app.use('/api/code', authenticationCodeRoute)
app.use('/api/geolocation', geolocation)
app.use('/session/admin', sessAdmin)
app.use('/session/patient', sessPatient)
app.use('/session/manager', sessManager)
app.use('/session/superuser', sessSuperuser)
app.use('/api', doctorQuery)
app.use('/api', provinceQuery)
app.use('/api', geoHospitalQuery)
app.use('/api', imgUploader)
app.use('/api', nodemailer)
app.use('/api/auth', loginAuth)
app.use('/api/updatePassword', updatePassword)
app.use('/api/fupdatePassword', fupdatePassword)

//connect to mongoDB
const dbConnect = async () => {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};

dbConnect().then(() => console.log('MongoDB online')).catch((err) => console.log(err))

//socket io
io.on('connection', (socket) => {
    let roomNo = null
    const Patient = require('./models/user')
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

//serve dist in node local server
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../client/dist/index.html'))

});