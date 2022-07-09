const express = require('express');
const router = express.Router();
const {
    imgUpload,
    imgUploadDoctor,
    imgUploadManager,
    imgUploadImgMsg,
    imgUploadImgMsgDeleteDoctor,
    imgUploadImgMsgDeletePatient,
    imgUploadImgMsgClearDoctor
} = require('../../controllers/imgController')
//doctor image change profile picture upload
router.post('/imgUpload', imgUpload);

//upload a patient's prescription
router.post('/imgUploadImgMsg', imgUploadImgMsg);

//delete img from a doctor
router.post('/imgUploadImgMsgDeleteDoctor', imgUploadImgMsgDeleteDoctor);

//delete img from a patient
router.post('/imgUploadImgMsgDeletePatient', imgUploadImgMsgDeletePatient);

//delete img clear doctor side
router.post('/imgUploadImgMsgClearDoctor', imgUploadImgMsgClearDoctor);

//doctor signup image upload
router.post('/imgUploadDoctor', imgUploadDoctor);

//manager upload photo 
router.post('/imgUploadManager', imgUploadManager);

module.exports = router;