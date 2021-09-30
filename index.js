const express = require('express');
const session = require('express-session');
const formidable = require('formidable');
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

//schemas
const specializationRoute = require('./routes/api/specializationList')
const appointmentListRoute = require('./routes/api/appointmentList')
const adminRoute = require('./routes/api/adminList')
const sess = require('./sessions/users/user')

const cors = require('cors');
const morgan = require('morgan');

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
app.use('/session/user', sess)

//doctor image upload
app.post('/api/imgUpload', function (req, res, next) {

    const form = new formidable()
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
        }, function (error, result){console.log(result,error); });
    });
    res.status(200)
    /* .send(
        '<h1 style="margin: 0 auto; margin-top:20%; display: table;">Profile image changed successfully, changes may take few minutes up to hours to take effect.</h1><h1 style="margin: 0 auto; display:table"> Redirecting browser in 15 seconds.</h1><h1 style="margin: 0 auto; display: table;">If the page does not load automatically after 15 seconds, click <a href="/login">here</a>.</h1><script>setTimeout(() => {window.location.href="/login"}, 15000)</script>'
        ); */
});
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'appointment-scheduler-webapp/dist/index.html'))

});

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});