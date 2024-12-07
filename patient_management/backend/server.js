console.log('Starting the server setup...');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

console.log('Middleware setup started...');
app.use(cors());
app.use(bodyParser.json());
console.log('Middleware setup completed.');

// In-memory storage for patients
let patients = [];

// Test Route
app.get('/', (req, res) => {
    console.log('GET request received at /');
    res.send('Server is running!');
});

// POST: Add a new patient
app.post('/api/patients', (req, res) => {
    const { name, age, medicalHistory, diagnosisReason } = req.body;
    if (!name || !age || !medicalHistory || !diagnosisReason) {
        return res.status(400).send('All fields are required.');
    }
    const newPatient = {
        id: patients.length + 1,
        name,
        age,
        medicalHistory,
        diagnosisReason,
    };
    patients.push(newPatient);
    res.status(201).json(newPatient);
});

// GET: Get all patients
app.get('/api/patients', (req, res) => {
    res.status(200).json(patients);
});

// GET: Get a specific patient by ID
app.get('/api/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    if (!patient) {
        return res.status(404).send('Patient not found');
    }
    res.status(200).json(patient);
});

// PUT: Update a patient's details
app.put('/api/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    if (!patient) {
        return res.status(404).send('Patient not found');
    }
    const { name, age, medicalHistory, diagnosisReason } = req.body;
    Object.assign(patient, { name, age, medicalHistory, diagnosisReason });
    res.status(200).json(patient);
});


// DELETE: Delete a patient
app.delete('/api/patients/:id', (req, res) => {
    const index = patients.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Patient not found');
    }
    patients.splice(index, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
