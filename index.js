const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const MongoStore = require('connect-mongo');
const history = require('connect-history-api-fallback');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
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
app.use(fileUpload());
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

//file image upload
app.post('/api/imgUpload',function(req,res){
    let alias;
    let imgFile;
    let uploadDir;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field is used to retrieve the uploaded file
      alias = req.body.alias
      imgFile = req.files.imgFile;
    
      uploadDir = __dirname + '/appointment-scheduler-webapp/src/assets/doctors/' + imgFile.name;
      completeDir = __dirname + '/appointment-scheduler-webapp/src/assets/doctors/' + alias + '.jpg'

      // Use the mv() method to place the file somewhere on your server
      imgFile.mv(uploadDir, function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.status(200);
      });

      //rename uploaded image file to assigned alias
      fs.rename(uploadDir, completeDir, (err) => {
        if(err) throw err
        res.status(200);
    });
});

app.get('/' , (req , res)=>{

   res.sendFile(path.join(__dirname, 'appointment-scheduler-webapp/dist/index.html'))

})

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});