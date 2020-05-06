const Room = require('./../models/roomModel');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort('num');

        res.status(200).json({
            status: 'success',
            results: rooms.length,
            data: {
                rooms
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                room
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createRoom = async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                room: newRoom
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);

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