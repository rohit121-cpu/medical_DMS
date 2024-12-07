const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  appointmentDate: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
