const Period = require('./../models/periodModel');

exports.getAllPeriods = async (req, res) => {
    try {
        const periods = await Period.find().select('-__v');
            
        res.status(200).json({
            status: 'success',
            results: periods.length,
            data: {
                periods
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getPeriod = async (req, res) => {
    try {
        const period = await Period.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                period
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
