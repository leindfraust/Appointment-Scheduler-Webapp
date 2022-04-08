const express = require('express');
const router = express.Router();
const {
    imgUpload,
    imgUploadDoctor,
    imgUploadManager
} = require('../../controllers/imgController')
//doctor image change profile picture upload
router.post('/imgUpload', imgUpload);

//doctor signup image upload
router.post('/imgUploadDoctor', imgUploadDoctor);

//manager upload photo 
router.post('/imgUploadManager', imgUploadManager);

module.exports = router;