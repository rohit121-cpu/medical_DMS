const express = require('express');
const router = express.Router();

let appointments = []; // In-memory storage for appointments
let idCounter = 1;

// Get all appointments
router.get('/', (req, res) => {
    res.json(appointments);
});

// Add a new appointment
router.post('/', (req, res) => {
    const { name, age, appointmentDate, reason } = req.body;

    if (!name || !age || !appointmentDate || !reason) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newAppointment = { id: idCounter++, name, age, appointmentDate, reason };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

// Delete an appointment
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    appointments = appointments.filter(appointment => appointment.id !== id);
    res.status(204).send();
});

module.exports = router;
