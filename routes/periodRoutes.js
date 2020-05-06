const express = require('express');
const periodController = require('./../controllers/periodController');

const router = express.Router();

router
    .route('/')
    .get(periodController.getAllPeriods)
    
module.exports = router;