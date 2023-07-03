import formidable from 'formidable'
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
    secure: true
});

const imgUpload = ((req, res, next) => {

    const form = formidable({
        multiples: true,
        keepExtensions: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile[0].filepath, {
            public_id: fields.alias[0],
            folder: "assets/doctors/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }).then(result => {
            console.log(result)
            res.status(200).redirect('/imgUploadSuccess')
        }).catch(err => {
            console.log(err)
            res.status(500).end()
        })
    });
});

//doctor can upload an image as a message to the patient
const imgUploadImgMsg = ((req, res, next) => {

    const form = formidable({
        multiples: true,
        keepExtensions: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile[0].filepath, {
            public_id: fields.doctorID[0] + fields.id[0],
            folder: "assets/patientimgmsg/doctorCopy/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
                cloudinary.v2.uploader.add_tag(fields.doctorID[0], `assets/patientimgmsg/doctorCopy/${fields.doctorID[0] + fields.id[0]}`, {
                    invalidate: true
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result)
                    }
                })
                cloudinary.v2.uploader.upload(files.imgFile[0].filepath, {
                    public_id: fields.id[0],
                    folder: "assets/patientimgmsg/patientCopy/",
                    overwrite: true,
                    invalidate: true,
                    format: "jpg"
                }).then(result => {
                    console.log(result)
                    res.status(200).end()
                }).catch(err => {
                    console.log(err)
                    res.status(500).end()
                })
            }
        });
    });
});

//for uploading digital prescription when confirming visitation
const imgUploadVisitation = ((req, res, next) => {

    const form = formidable({
        multiples: true,
        keepExtensions: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile[0].filepath, {
            public_id: fields.id[0],
            folder: "assets/patientimgmsg/patientCopy/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }).then(result => {
            console.log(result)
            res.status(200).end()
        }).catch(err => {
            console.log(err)
            res.status(500).end()
        })
    });
});

//delete an image of the patient
const imgUploadImgMsgDeletePatient = ((req, res) => {

    cloudinary.v2.api.delete_resources([req.body.id], {
        invalidate: true
    }).then(result => {
        console.log(result)
        res.status(200).end()
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    })
});

//delete an image of the doctor
const imgUploadImgMsgDeleteDoctor = ((req, res) => {

    cloudinary.v2.api.delete_resources([req.body.doctorID + req.body.id], {
        invalidate: true
    }).then(result => {
        console.log(result)
        res.status(200).end()
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    })
});

//clear images in a folder due to clearing of messages
const imgUploadImgMsgClearDoctor = ((req, res) => {

    cloudinary.v2.api.delete_resources_by_tag(req.body.doctorID, {
        invalidate: true
    }).then(result => {
        console.log(result)
        res.status(200).end()
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    })
});

//patient profile image upload
const imgUploadPatient = ((req, res, next) => {
    const form = formidable({
        multiples: true,
        keepExtensions: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile[0].filepath, {
            public_id: fields.username[0],
            folder: "assets/patients/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }).then(result => {
            console.log(result)
            res.status(200).redirect('/imgUploadSuccessPatient')
        }).catch(err => {
            console.log(err)
            res.status(500).end()
        })
    });
});

//doctor signup image upload
const imgUploadDoctor = ((req, res, next) => {

    const form = formidable({
        multiples: true,
        keepExtensions: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile[0].filepath, {
            public_id: fields.alias[0],
            folder: "assets/doctors/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }).then(result => {
            console.log(result)
            res.status(200).redirect('/imgUploadSuccessDoctor')
        }).catch(err => {
            console.log(err)
            res.status(500).end()
        })
    });
});

//manager upload photo 
const imgUploadManager = ((req, res, next) => {

    const form = formidable({
        multiples: true,
        keepExtensions: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        cloudinary.v2.uploader.upload(files.imgFile[0].filepath, {
            public_id: fields.hospital[0],
            folder: "assets/managers/",
            overwrite: true,
            invalidate: true,
            format: "jpg"
        }).then(result => {
            console.log(result)
            res.status(200).redirect('/imgUploadSuccessManager')
        }).catch(err => {
            console.log(err)
            res.status(500).end()
        })
    });
});

export {
    imgUpload,
    imgUploadImgMsg,
    imgUploadVisitation,
    imgUploadImgMsgDeleteDoctor,
    imgUploadImgMsgDeletePatient,
    imgUploadImgMsgClearDoctor,
    imgUploadPatient,
    imgUploadDoctor,
    imgUploadManager,
}