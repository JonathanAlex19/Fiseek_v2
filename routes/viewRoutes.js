const express = require('express');
const router = express.Router();
const Clase = require('./../models/claseModel');
const Teacher = require('./../models/teacherModel');
const Room = require('./../models/roomModel');
const Subject = require('./../models/subjectModel');
const Period = require('./../models/periodModel');

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

//----------------------------PANEL DE ADMIN--------------------------------

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
        res.status(404).render('#');
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

// router.get('/admin-subjects', (req, res) => {
//     res.send('Aqui irá el panel de subjects')
// });

// ------------------------------MATERIAS----------------------------------

// Ver y buscar materias
router.get('/admin-subjects', async (req, res) => {
    try  {
        let searchOptions = {};
        if(req.query.search != null && req.query.search != '') 
        {
            searchOptions.name = new RegExp(req.query.search, 'i')
        }
        
        const subjects = await Subject.find(searchOptions).sort('name');
    
        res.status(200).render('panel-subjects', {
            title: 'All Subjects',
            subjects,
            searchOptions: req.query
        });
    } catch ( err ) {
        res.status(404).render('#');
    }
});

// Crear materias
router.post('/admin-subjects', async (req, res) => {
    let searchOptions = {};
    try {
        
        await Subject.create(req.body);

        const subjects = await Subject.find();

        res.redirect('/admin-subjects');

    } catch (err) {
        if(err.code == 11000)
        {
            console.log('Ya está registrado una materia con ese nombre');
        }
        res.status(400).redirect('#');
    }
});

// Borrar materias
router.post('/admin-subjects/delete/:id', async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
    
        res.redirect('/admin-subjects');
    } catch (err) {
        res.status(404).redirect('#');
    }
});

// Actualizar materias
router.post('/admin-subjects/update/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.redirect('/admin-subjects')

    } catch (err) {
        res.status(404).redirect('#');
    }
});


// --------------------------------CLASES-------------------------------------

// Ver y buscar clases
router.get('/admin-clases', async (req, res) => {
    try  {
        let searchOptions = {};
        if(req.query.search != null && req.query.search != '') 
        {
            searchOptions.name = new RegExp(req.query.search, 'i')
        }

        const subjects = await Subject.find().sort('name');
        const teachers = await Teacher.find().sort('name');
        const classrooms = await Room.find().sort('num');
        const periods = await Period.find().sort('id');
        
        const clases = await Clase.find(searchOptions)
            .populate({path: 'teacher', select: '-__v -_id'})
            .populate({path: 'subject', select: '-__v -_id'})
            .populate({path: 'classroom', select: '-__v -_id'})
            .populate({path: 'period', select: '-__v -_id'})
            .sort('subject teacher day period');
    
        res.status(200).render('panel-clases', {
            clases,
            searchOptions: req.query,
            subjects,
            teachers,
            classrooms,
            periods
        });
    } catch ( err ) {
        res.status(404).render('#');
    }
});

// Crear clases
router.post('/admin-clases', async (req, res) => {
    try {

        await Clase.create(req.body);

        res.redirect('/admin-clases');

    } catch (err) {
        console.log('ERROR')
        res.status(400).redirect('#');
    }
});

// Borrar clases
router.post('/admin-clases/delete/:id', async (req, res) => {
    try {
        await Clase.findByIdAndDelete(req.params.id);
    
        res.redirect('/admin-clases');
    } catch (err) {
        res.status(404).redirect('#');
    }
});

// Actualizar clases
router.post('/admin-clases/update/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.redirect('/admin-subjects')

    } catch (err) {
        res.status(404).redirect('#');
    }
});

module.exports = router;