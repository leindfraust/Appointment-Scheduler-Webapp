import express from 'express';
const router = express.Router();

import { getRecSpecialist } from '../../controllers/openAIController.js'

router.post('/query-recommended-specialist', getRecSpecialist)

export default router;

