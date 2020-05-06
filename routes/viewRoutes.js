const express = require('express');
const router = express.Router();
const Clase = require('./../models/claseModel');
const Teacher = require('./../models/teacherModel');
const Room = require('./../models/roomModel');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/schedule', async (req, res) => {
    try  {
        let searchOptions = {};
        console.log(req.query);
        if(req.query.search != null && req.query.search != '') 
        {
            searchOptions.teacher = new RegExp(req.query.search, 'i')
            const teacher = await Teacher.find({name: searchOptions.teacher});
            searchOptions.teacher = teacher
            console.log(searchOptions);
        }
        
        const clases = await Clase.find(searchOptions)
            .populate({path: 'teacher', select: '-__v -_id'})
            .populate({path: 'subject', select: '-__v -_id'})
            .populate({path: 'classroom', select: '-__v -_id'})
            .populate({path: 'period', select: '-__v -_id'})
            .sort('subject day period');

    
        res.status(200).render('schedule', {
            title: 'All classes',
            clases: clases,
            searchOptions: req.query
        });
    } catch ( err ) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});


router.get('/teachers-schedule', async (req, res) => {
    try  {
        let searchOptions = {};
        console.log(req.query);
        if(req.query.search != null && req.query.search != '') 
        {
            searchOptions.teacher = new RegExp(req.query.search, 'i')
            const teacher = await Teacher.find({name: searchOptions.teacher});
            searchOptions.teacher = teacher
            console.log(searchOptions);
        }
        
        const clases = await Clase.find(searchOptions)
            .populate({path: 'teacher', select: '-__v -_id'})
            .populate({path: 'subject', select: '-__v -_id'})
            .populate({path: 'classroom', select: '-__v -_id'})
            .populate({path: 'period', select: '-__v -_id'})
            .sort('subject day period');

    
        res.status(200).render('teachers-schedule', {
            title: 'All classes',
            clases: clases,
            searchOptions: req.query
        });
    } catch ( err ) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

router.get('/classrooms-schedule', async (req, res) => {
    try  {
        let searchOptions = {};

        if(req.query.search != null && req.query.search != '') 
        {
            searchOptions.classroom = req.query.search * 1;
            const classroom = await Room.find({num: searchOptions.classroom});
            console.log(classroom);
            searchOptions.classroom = classroom;
        }
        
        const clases = await Clase.find(searchOptions)
            .populate({path: 'teacher', select: '-__v -_id'})
            .populate({path: 'subject', select: '-__v -_id'})
            .populate({path: 'classroom', select: '-__v -_id'})
            .populate({path: 'period', select: '-__v -_id'})
            .sort('subject day period');

    
        res.status(200).render('classrooms-schedule', {
            title: 'All classes',
            clases: clases,
            searchOptions: req.query
        });
    } catch ( err ) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

router.get('/advises', (req, res) => {
    res.render('advises');
});

module.exports = router;