import express from 'express';
const router = express.Router();
import {
    imgUpload,
    imgUploadDoctor,
    imgUploadManager,
    imgUploadImgMsg,
    imgUploadImgMsgDeleteDoctor,
    imgUploadImgMsgDeletePatient,
    imgUploadImgMsgClearDoctor,
    imgUploadPatient,
    imgUploadVisitation
} from '../../controllers/imgController.js'
//doctor image change profile picture upload
router.post('/imgUpload', imgUpload);

//upload a patient's prescription
router.post('/imgUploadImgMsg', imgUploadImgMsg);

//upload a digital prescription upon confirming from the doctor
router.post('/imgUploadVisitation', imgUploadVisitation)

//delete img from a doctor
router.post('/imgUploadImgMsgDeleteDoctor', imgUploadImgMsgDeleteDoctor);

//delete img from a patient
router.post('/imgUploadImgMsgDeletePatient', imgUploadImgMsgDeletePatient);

//delete img clear doctor side
router.post('/imgUploadImgMsgClearDoctor', imgUploadImgMsgClearDoctor);

//patient profile image upload
router.post('/imgUploadPatient', imgUploadPatient)

//doctor signup image upload
router.post('/imgUploadDoctor', imgUploadDoctor);

//manager upload photo 
router.post('/imgUploadManager', imgUploadManager);

export default router;