const express = require('express');
const router = express.Router();
const {
    getCode,
    verifyCode,
    pushCode,
    updateCode,
    deleteCode
} = require('../../controllers/authCodeController')

router.post('/', getCode);

router.post('/', pushCode);

router.post('/verify', verifyCode);

router.put('/:id', updateCode);

router.delete('/:id', deleteCode);

module.exports = router;