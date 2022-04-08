const formidable = require('formidable')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

const imgUpload = ((req, res, next) => {

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
const imgUploadDoctor = ((req, res, next) => {

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
const imgUploadManager = ((req, res, next) => {

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

module.exports = {
    imgUpload,
    imgUploadDoctor,
    imgUploadManager
}