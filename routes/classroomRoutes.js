const express = require('express');
const classroomController = require('./../controllers/classroomController');

const router = express.Router();

router
    .route('/')
    .get(classroomController.getAllClassrooms)
    .post(classroomController.createClassroom);

router
    .route('/:id')
    .get(classroomController.getClassroom)
    .delete(classroomController.deleteClassroom);

module.exports = router;