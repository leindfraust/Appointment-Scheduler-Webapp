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
const specializationRoute = require('./routes/api/specializationList')
const appointmentListRoute = require('./routes/api/appointmentList')
const adminRoute = require('./routes/api/adminList')
const sessAdmin = require('./sessions/models/admin')
const sessPatient = require('./sessions/models/user')
const user = require('./routes/api/user')
const rooms = require('./routes/api/rooms')

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
    cloud_name: 'leindfraust',
    api_key: '578841911666182',
    api_secret: 'y397TRyKmeYukzShGtUysWR4MFo'
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

//io connect/usages
io.on('connection', (socket) => {
    let roomNo = null
    const Rooms = require('./model/rooms')
    socket.on('join room', (roomID, user) => {
        socket.join(roomID)
        roomNo = roomID
        Rooms.find({
            roomID: roomNo
        }).then(response => {
            io.to(roomNo).emit('messages', response)
        })
    });
    console.log('Client connected');
    socket.on('connect', () => console.log('Client connected'))
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('message', (msg, user, date) => {
        Rooms.findOneAndUpdate({
            roomID: roomNo
        }, {
            $push: {
                messages: {
                    user: user,
                    message: msg,
                    date: date
                },
            },
        }, {
            returnOriginal: false
        }, function (error, success) {
            if (error) {
                console.log(error)
            } else {
                console.log(success)
            }
        })
        io.to(roomNo).emit('chat message', msg, user, date);
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
app.use('/api/specialistList', specializationRoute)
app.use('/api/appointmentList', appointmentListRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', user)
app.use('/session/admin', sessAdmin)
app.use('/session/patient', sessPatient)
app.use('/api/chatrooms', rooms)

//doctor image change profile picture upload
app.post('/api/imgUpload', async function (req, res, next) {

    const form = await new formidable()
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile.path, {
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
        res.status(200).redirect('/imgUploadSuccess')
    }, 5000)
});
//doctor signup image upload
app.post('/api/imgUploadAdmin', async function (req, res, next) {

    const form = await new formidable()
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile.path, {
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

//serve dist in node local server
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'appointment-scheduler-webapp/dist/index.html'))

});