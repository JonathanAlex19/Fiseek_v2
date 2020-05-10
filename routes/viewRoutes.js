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
        res.status(404).render('#');
    }
});

router.get('/advises', (req, res) => {
    res.render('advises');
});

// Panel de administración

router.get('/panel', (req, res) => {
    res.render('panel');
});

// ------------------------------MAESTROS----------------------------------

// Ver y buscar maestros
router.get('/admin-teachers', async (req, res) => {
    try  {
        let searchOptions = {};
        if(req.query.search != null && req.query.search != '') 
        {
            searchOptions.name = new RegExp(req.query.search, 'i')
        }
        
        const teachers = await Teacher.find(searchOptions).sort('name');
    
        res.status(200).render('panel-teachers', {
            title: 'All Teachers',
            teachers: teachers,
            searchOptions: req.query
        });
    } catch ( err ) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// Crear maestros
router.post('/admin-teachers', async (req, res) => {
    let searchOptions = {};
    try {
        
        await Teacher.create(req.body);

        const teachers = await Teacher.find();

        res.redirect('/admin-teachers');

    } catch (err) {
        if(err.code == 11000)
        {
            console.log('Ya está registrado un maestro con ese nombre');
        }
        res.status(400).redirect('#');
    }
});

// Borrar maestros
router.post('/admin-teachers/delete/:id', async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
    
        res.redirect('/admin-teachers');
    } catch (err) {
        res.status(404).redirect('#');
    }
});

// Actualizar maestros
router.post('/admin-teachers/update/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.redirect('/admin-teachers')

    } catch (err) {
        res.status(404).redirect('#');
    }
});

// ------------------------------SALONES----------------------------------

// Ver y buscar salones
router.get('/admin-classrooms', async (req, res) => {
    try  {
        let searchOptions = {};
        if(req.query.search != null && req.query.search != '') 
        {
            searchOptions.num = req.query.search * 1;
        }
        
        const rooms = await Room.find(searchOptions).sort('num');
    
        res.status(200).render('panel-rooms', {
            rooms,
            searchOptions: req.query
        });
    } catch ( err ) {
        res.status(404).render('#');
    }
});

// Crear salones
router.post('/admin-classrooms', async (req, res) => {
    let searchOptions = {};
    try {
        
        await Room.create(req.body);

        const rooms = await Room.find();

        res.redirect('/admin-classrooms');

    } catch (err) {
        if(err.code == 11000)
        {
            console.log('Ya está registrado un salón con ese número');
        }
        res.status(400).redirect('#');
    }
});

// Borrar salones
router.post('/admin-classrooms/delete/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
    
        res.redirect('/admin-classrooms');
    } catch (err) {
        res.status(404).redirect('#');
    }
});

router.get('/admin-classrooms', (req, res) => {
    res.send('Aqui irá el panel de classrooms')
});

router.get('/admin-subjects', (req, res) => {
    res.send('Aqui irá el panel de subjects')
});

router.get('/admin-clases', (req, res) => {
    res.send('Aqui irá el panel de clases')
})

module.exports = router;