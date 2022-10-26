const express = require('express');
const router = express.Router();
const {
    getManagers,
    getManager,
    pushManager,
    updateManager,
    deleteManager,
    verify_username,
    check_username,
    check_provider
} = require('../../controllers/managerController')

router.post('/check_username', check_username)

router.post('/check_provider', check_provider)

router.post('/verify_username', verify_username)

router.get('/', getManagers);

router.post('/:id', getManager);

router.post('/', pushManager);

router.put('/:id', updateManager);

router.delete('/:id', deleteManager);

module.exports = router;