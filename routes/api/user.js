const express = require('express');
const router = express.Router();
const {
    check_username,
    verify_username,
    getUsers,
    pushUser,
    updateUser,
    deleteUser,
    check_email
} = require('../../controllers/userController')

router.post('/check_username', check_username);

router.post('/check_email', check_email)

router.post('/verify_username', verify_username)

router.get('/', getUsers);

router.post('/', pushUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;