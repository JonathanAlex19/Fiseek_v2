const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Un maestro tiene que tener un nombre'],
    unique: true
  }
});
  
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;