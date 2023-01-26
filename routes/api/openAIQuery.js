const express = require('express');
const router = express.Router();

const { getRecSpecialist } = require('../../controllers/openAIController')

router.post('/query-recommended-specialist', getRecSpecialist)

module.exports = router;

