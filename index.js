import 'dotenv/config.js'
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';
import MongoStore from 'connect-mongo'
import path from 'path';
import mongoose from 'mongoose';
import {
    PORT,
    mongoUri
} from './config.js';
const app = express();
const server = app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});
import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});
//cors option
let allowlist = ['https://medic-search-beta.herokuapp.com', 'http://localhost:8080', 'https://medic-search.onrender.com']
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
            "connect-src": ["'self'", "https://use.fontawesome.com", "https://ka-f.fontawesome.com", "https://res.cloudinary.com", "https://api.paymongo.com"],
            "script-src": ["'self'", "https://use.fontawesome.com", "maps.googleapis.com", "https://kit.fontawesome.com/4ca5ad86da.js"],
            "frame-src": ["'self'", "https://www.google.com/maps", "https://maps.google.com/"]
        }
    },
    crossOriginResourcePolicy: {
        policy: "same-origin"
    }
}));
app.use(express.static(path.join(new URL('.', import.meta.url).pathname, 'client/dist')))
app.use(async (req, res, next) => {
    if (await app.get('env') === 'production' && !req.secure) {
        return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
});
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
const sessDoctor = await import('./sessions/doctor.js');
const sessPatient = await import('./sessions/user.js');
const sessManager = await import('./sessions/manager.js');
const sessSuperuser = await import('./sessions/superuser.js');

app.use('/session/doctor', sessDoctor.default);
app.use('/session/patient', sessPatient.default);
app.use('/session/manager', sessManager.default);
app.use('/session/superuser', sessSuperuser.default);

/* schemas and route logic */

//accounts
const user = await import('./routes/api/user.js');
const doctor = await import('./routes/api/doctor.js');
const manager = await import('./routes/api/manager.js');
const superuser = await import('./routes/api/superuser.js');

const appointmentList = await import('./routes/api/appointmentList.js');
const authenticationCodeRoute = await import('./routes/api/authenticationCodes.js');
const geolocation = await import('./routes/api/geolocation.js');
const doctorQuery = await import('./routes/api/doctorQuery.js');
const provinceQuery = await import('./routes/api/provinceQuery.js');
const geoHospitalQuery = await import('./routes/api/geoHospitalQuery.js');
const imgUploader = await import('./routes/api/imgUploader.js');
const nodemailer = await import('./routes/api/nodemailer.js');
const openAIQuery = await import('./routes/api/openAIQuery.js');

const loginAuth = await import('./routes/api/loginAuth.js');
const updatePassword = await import('./routes/api/updatePassword.js');
const fupdatePassword = await import('./routes/api/forceUpdatePassword.js');

/* APIs */

//accounts
app.use('/api/user', user.default);
app.use('/api/doctor', doctor.default);
app.use('/api/manager', manager.default);
app.use('/api/superuser', superuser.default);

app.use('/api/appointmentList', appointmentList.default);
app.use('/api/code', authenticationCodeRoute.default);
app.use('/api/geolocation', geolocation.default);
app.use('/api', doctorQuery.default);
app.use('/api', provinceQuery.default);
app.use('/api', geoHospitalQuery.default);
app.use('/api', imgUploader.default);
app.use('/api', nodemailer.default);
app.use('/api', openAIQuery.default);

app.use('/api/auth', loginAuth.default);
app.use('/api/updatePassword', updatePassword.default);
app.use('/api/fupdatePassword', fupdatePassword.default);

//connect to MongoDB
const dbConnect = async () => {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

dbConnect().then(() => console.log('MongoDB online')).catch((err) => console.log(err));

//socket io
io.on('connection', async (socket) => {

    const { User } = await import('./models/user.js')

    let roomNo = null;
    socket.on('join room', (id) => {
        socket.join(id);
        roomNo = id;
        User.find({
            _id: id
        }).then(response => {
            io.to(roomNo).emit('messages', response[0].messages);
        }).catch(error => {
            //ignore type error
        });
    });
    console.log('Client connected');
    socket.on('connect', () => console.log('Client connected'));
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('message', async (refID, title, msg, user, date) => {

        try {
            const patient = await User.findOneAndUpdate({
                _id: roomNo
            }, {
                $push: {
                    messages: {
                        id: refID,
                        from: user,
                        subject: title,
                        message: msg,
                        date: date,
                        new:
                            true
                    },
                },
            }, {
                new: true
            });
            io.to(roomNo).emit('send messages', patient?.messages);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('update message', async (notifications) => {
        async function updatePatient() {
            await User.findOneAndUpdate({
                _id: roomNo
            }, {
                messages: notifications
            }, {
                new: true
            });
        }

        try {
            await updatePatient();
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('delete message', async (id, notif) => {
        try {
            const patient = await User.findOneAndUpdate({
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
                new: true
            }).clone();
            io.to(roomNo).emit('delete messages', patient?.messages);
        } catch (err) {
            console.log(err);
        }
    });
});

//serve dist in node local server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

//remove console statements in production
if (process.env.NODE_ENV == "production") {
    console.log = () => { };
    console.debug = () => { };
    console.info = () => { };
    console.warn = () => { };
}

export default app;

