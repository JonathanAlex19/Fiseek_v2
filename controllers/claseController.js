const Clase = require('./../models/claseModel');

exports.getAllClases = async (req, res) => {
    try {
        const weekDay = new Date().getDay();
        const clases = await Clase.find()
            .populate({path: 'teacher', select: '-__v -_id'})
            .populate({path: 'subject', select: '-__v -_id'})
            .populate({path: 'classroom', select: '-__v -_id'})
            .populate({path: 'period', select: '-__v -_id'});
            

        res.status(200).json({
            status: 'success',
            results: clases.length,
            data: {
                clases
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// exports.getTodayClases = async (req, res) => {
//     try {
//         clases = await Clase.find()
//             .populate({path: 'teacher', select: '-__v -_id'})
//             .populate({path: 'subject', select: '-__v -_id'})
//             .populate({path: 'classroom', select: '-__v -_id'})
//             .populate({path: 'period', select: '-__v -_id'});

//     } catch (err)
//     {

//     }
// };

exports.getClase = async (req, res) => {
    try {
        const clase = await Clase.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                clase
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createClase = async (req, res) => {
    try {
        const newClase = await Clase.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                clase: newClase
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateClase = async (req, res) => {
    try {
        const clase = await Clase.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                clase
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteClase = async (req, res) => {
    try {
        await Clase.findByIdAndDelete(req.params.id);

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