const express = require('express');
const router = express.Router();
const {
    verifySuperUser,
    verifyCode,
    pushCode,
    updateCode,
    deleteCode
} = require('../../controllers/authCodeController')

router.post('/superuser', verifySuperUser);

router.post('/', pushCode);

router.post('/verify', verifyCode);

router.put('/:id', updateCode);

router.delete('/:id', deleteCode);

module.exports = router;