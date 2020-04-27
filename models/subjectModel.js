const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Una materia tiene que tener un nombre'],
    unique: true
  }
});
  
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;