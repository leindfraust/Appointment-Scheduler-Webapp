require("dotenv").config()
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
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
        origin: ["http://localhost:8080", "http://192.168.1.11:8080"]
    }
});

//cors option
let allowlist = ['https://desolate-lowlands-18826.herokuapp.com', 'http://localhost:8080']
let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true
        } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = {
            origin: false
        } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

//express usages
app.use(cors(corsOptionsDelegate));
app.use(morgan('tiny'));
app.use(express.json({ limit: '50mb' }));
app.use(history())
app.use(helmet({
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        useDefault: true,
        directives: {
            "img-src": ["'self'", "data:", "https://res.cloudinary.com", "https://ui-avatars.com"],
            "connect-src": ["'self'", "https://use.fontawesome.com", "https://ka-f.fontawesome.com", "https://res.cloudinary.com"],
            "script-src": ["'self'", "https://use.fontawesome.com", "maps.googleapis.com", "https://kit.fontawesome.com/4ca5ad86da.js"],
            "frame-src": ["'self'", "https://www.google.com/maps", "https://maps.google.com/"]
        }
    },
    crossOriginResourcePolicy: {
        policy: "same-origin"
    }
}));
app.use(express.static(path.join(__dirname, 'client/dist')))
app.use((req, res, next) => {
    if (app.get('env') === 'production' && !req.secure) {
        return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
})
//use sessions
const sess = {
    secret: 'leindfraust',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: MongoStore.create({
        mongoUrl: encodeURI(mongoUri),
        crypto: {
            secret: 'leindfraust'
        },
    })
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(session(sess));
const sessDoctor = require('./sessions/doctor')
const sessPatient = require('./sessions/user')
const sessManager = require('./sessions/manager')
const sessSuperuser = require('./sessions/superuser')

app.use('/session/doctor', sessDoctor)
app.use('/session/patient', sessPatient)
app.use('/session/manager', sessManager)
app.use('/session/superuser', sessSuperuser)

/* schemas and route logic */

//accounts
const user = require('./routes/api/user')
const doctor = require('./routes/api/doctor')
const manager = require('./routes/api/manager')
const superuser = require('./routes/api/superuser')

const appointmentList = require('./routes/api/appointmentList')
const authenticationCodeRoute = require('./routes/api/authenticationCodes')
const geolocation = require('./routes/api/geolocation')
const doctorQuery = require('./routes/api/doctorQuery')
const provinceQuery = require('./routes/api/provinceQuery')
const geoHospitalQuery = require('./routes/api/geoHospitalQuery')
const imgUploader = require('./routes/api/imgUploader')
const nodemailer = require('./routes/api/nodemailer')

const loginAuth = require('./routes/api/loginAuth')
const updatePassword = require('./routes/api/updatePassword');
const fupdatePassword = require('./routes/api/forceUpdatePassword');

/* APIs */

//accounts
app.use('/api/user', user)
app.use('/api/doctor', doctor)
app.use('/api/manager', manager)
app.use('/api/superuser', superuser)

app.use('/api/appointmentList', appointmentList)
app.use('/api/code', authenticationCodeRoute)
app.use('/api/geolocation', geolocation)
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
    mongoose.connect(mongoUri, {
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
            //ignore type error
        })
    });
    console.log('Client connected');
    socket.on('connect', () => console.log('Client connected'))
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('message', (refID, title, msg, user, date) => {
        Patient.findOneAndUpdate({
            _id: roomNo
        }, {
            $push: {
                messages: {
                    id: refID,
                    from: user,
                    subject: title,
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
            }
        });
    });
    socket.on('delete message', (id, notif) => {
        Patient.findOneAndUpdate({
            _id: id
        }, {
            $pull: {
                messages: {
                    id: notif.refID,
                    from: notif.user,
                    subject: notif.title,
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

    res.sendFile(path.join(__dirname, 'client/dist/index.html'))

});