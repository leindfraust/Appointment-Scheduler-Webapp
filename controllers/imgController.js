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

//doctor can upload an image as a message to the patient
const imgUploadImgMsg = ((req, res, next) => {

    const form = formidable({
        multiples: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile.filepath, {
            public_id: fields.doctorID + fields.id,
            folder: "assets/patientimgmsg/doctorCopy/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
                cloudinary.v2.uploader.add_tag(fields.doctorID, `assets/patientimgmsg/doctorCopy/${fields.doctorID + fields.id}`, {
                    invalidate: true
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result)
                    }
                })
                cloudinary.v2.uploader.upload(files.imgFile.filepath, {
                    public_id: fields.id,
                    folder: "assets/patientimgmsg/patientCopy/",
                    overwrite: true,
                    invalidate: true,
                    format: "jpg"
                }, function (error, result) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(result)
                        res.status(200).end()
                    }
                });
            }
        });
    });
});

//delete an image of the patient
const imgUploadImgMsgDeletePatient = ((req, res, next) => {

    cloudinary.v2.api.delete_resources([req.body.id], {
        invalidate: true
    }, (err, success) => {
        if (err) {
            console.log(err)
            res.status(400);
        } else {
            console.log(success)
            res.status(200).end()
        }
    })
});

//delete an image of the doctor
const imgUploadImgMsgDeleteDoctor = ((req, res, next) => {

    cloudinary.v2.api.delete_resources([req.body.doctorID + req.body.id], {
        invalidate: true
    }, (err, success) => {
        if (err) {
            console.log(err)
            res.status(400);
        } else {
            console.log(success)
            res.status(200).end()
        }
    })
});

//clear images in a folder due to clearing of messages
const imgUploadImgMsgClearDoctor = ((req, res, next) => {

    cloudinary.v2.api.delete_resources_by_tag(req.body.doctorID, {
        invalidate: true
    }, (err, success) => {
        if (err) {
            console.log(err)
            res.status(400);
        } else {
            console.log(success)
            res.status(200).end()
        }
    })
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
        res.status(200).redirect('/imgUploadSuccessDoctor')
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
    imgUploadImgMsg,
    imgUploadImgMsgDeleteDoctor,
    imgUploadImgMsgDeletePatient,
    imgUploadImgMsgClearDoctor,
    imgUploadDoctor,
    imgUploadManager,
}