import express from 'express';
const router = express.Router();
import {
    verifySuperUser,
    verifyEmail,
    verifyCode,
    pushCode,
    updateCode,
    deleteCode
} from '../../controllers/authCodeController.js'

router.post('/superuser', verifySuperUser);

router.post('/email', verifyEmail)

router.post('/', pushCode);

router.post('/verify', verifyCode);

router.put('/:id', updateCode);

router.delete('/:id', deleteCode);

export default router;