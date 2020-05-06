const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    hour: {
        type: String,
        required: true,
        unique: true
    }
});

  
const Period = mongoose.model('Period', periodSchema);

module.exports = Period;