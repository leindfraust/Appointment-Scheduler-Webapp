const express = require('express');
const router = express.Router();
const {
    getSuperusers,
    pushSuperuser,
    updateSuperuser,
    deleteSuperuser,
    submitTicket,
    updateTicket,
    deleteTicket
} = require('../../controllers/superuserController')

router.get('/', getSuperusers);

router.post('/', pushSuperuser);

router.put('/:id', updateSuperuser);

router.delete('/:id', deleteSuperuser);

router.post('/submitTicket', submitTicket);

router.post('/deleteTicket', deleteTicket);

router.post('/updateTicket', updateTicket);

module.exports = router;