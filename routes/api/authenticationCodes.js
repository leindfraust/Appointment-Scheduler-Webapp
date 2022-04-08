const express = require('express');
const router = express.Router();
const {
    getCode,
    pushCode,
    updateCode,
    deleteCode
} = require('../../controllers/authCodeController')

router.get('/', getCode);

router.post('/', pushCode);

router.put('/:id', updateCode);

router.delete('/:id', deleteCode);

module.exports = router;