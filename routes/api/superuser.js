import express from 'express';
const router = express.Router();
import {
    getSuperusers,
    pushSuperuser,
    updateSuperuser,
    deleteSuperuser,
    submitTicket,
    updateTicket,
    deleteTicket
} from '../../controllers/superuserController.js'

router.get('/', getSuperusers);

router.post('/', pushSuperuser);

router.put('/:id', updateSuperuser);

router.delete('/:id', deleteSuperuser);

router.post('/submitTicket', submitTicket);

router.post('/deleteTicket', deleteTicket);

router.post('/updateTicket', updateTicket);

export default router;