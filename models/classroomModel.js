const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: [true, 'Un salon tiene que tener un número que lo identifique'],
    unique: true
  }
});
  
const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;