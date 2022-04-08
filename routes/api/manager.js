const express = require('express');
const router = express.Router();
const {
    getManagers,
    pushManager,
    updateManager,
    deleteManager
} = require('../../controllers/managerController')

router.get('/', getManagers);

router.post('/', pushManager);

router.put('/:id', updateManager);

router.delete('/:id', deleteManager);

module.exports = router;