const Subject = require('./../models/subjectModel');

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();

        res.status(200).json({
            status: 'success',
            results: subjects.length,
            data: {
                subjects
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getSubject = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                subject
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createSubject = async (req, res) => {
    try {
        const newSubject = await Subject.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                subject: newSubject
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                subject
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);

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