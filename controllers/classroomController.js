const Classroom = require('./../models/classroomModel');

exports.getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();

        res.status(200).json({
            status: 'success',
            results: classrooms.length,
            data: {
                classrooms
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                classroom
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createClassroom = async (req, res) => {
    try {
        const newClassroom = await Classroom.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                classroom: newClassroom
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// exports.updateClassroom = async (req, res) => {
//     try {
//         const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 classroom
//             }
//         });

//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         });
//     }
// };

exports.deleteClassroom = async (req, res) => {
    try {
        await Classroom.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};