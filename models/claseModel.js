const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Una clase debe tener una materia que se imparta']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Una clase debe tener un maestro que la imparta']
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: [true, 'Una clase debe tener un salon en el que es impartida']
  },
  group: { // 001, 002, etc.
    type: String,
    required: [true, 'Una clase debe pertenecer a un grupo especifico'],
    trim: true,
    unique: [true, 'Un grupo no debe repetirse']
  },
  period: { // M1, M2, M3, M4
    type: String,
    required: [true, 'Una clase debe impartirse durante un periodo de tiempo'],
    trim: true
  },
  day: { // 1 -> Lunes, Miércoles y Viernes, 2->Martes, 3-> Jueves, 4-> Sábado
    type: Number,
    required: [true]
  }
});
  
const Clase = mongoose.model('Clase', claseSchema);

module.exports = Clase;