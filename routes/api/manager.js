const express = require('express');
const router = express.Router();
const {
    getManagers,
    pushManager,
    updateManager,
    deleteManager,
    verify_username,
    check_username
} = require('../../controllers/managerController')

router.post('/check_username', check_username)

router.post('/verify_username', verify_username)

router.get('/', getManagers);

router.post('/', pushManager);

router.put('/:id', updateManager);

router.delete('/:id', deleteManager);

module.exports = router;