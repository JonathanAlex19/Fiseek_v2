const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: [true, 'Un salon tiene que tener un numero de salon'],
    unique: [true, 'Los salones no deben repetirse']
  }
});
  
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;