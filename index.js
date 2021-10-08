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
const sess = require('./sessions/models/admin')
const user = require('./routes/api/user')

//app usages
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
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});


io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('message', (msg, user) => {
        io.emit('chat message', msg, user);
    });

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
            connected: socket.connected
        });
    }
    socket.emit("users", users);

    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
        connected: socket.connected
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
app.use('/session/admin', sess)

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