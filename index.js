const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express();
const mongoose = require('mongoose');
const {
    PORT,
    mongoUri
} = require('./config');
const appointmentListRoute = require('./routes/api/appointmentList')
const adminRoute = require('./routes/api/adminList')
const helloRoute = require('./routes/api/helloworld')
const sess = require('./sessions/users/user')

const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const dbConnect = async () => {
    await mongoose.connect(encodeURI(mongoUri), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
};

dbConnect().then(() => console.log('MongoDB online')).catch((err) => console.log(err))

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

app.use('/api/hello', helloRoute)
app.use('/api/appointmentList', appointmentListRoute)
app.use('/api/admin', adminRoute)
app.use('/session/user', sess)

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});