const express = require('express');
const claseController = require('./../controllers/claseController');

const router = express.Router();

router
    .route('/')
    .get(claseController.getAllClases)
    .post(claseController.createClase);

router
    .route('/:id')
    .get(claseController.getClase)
    .patch(claseController.updateClase)
    .delete(claseController.deleteClase);

module.exports = router;