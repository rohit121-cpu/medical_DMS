const patients = [
    { id: 1, name: 'John Doe', age: 35, diagnosisReasons: 'Chest pain', medicalHistory: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 29, diagnosisReasons: 'Fever and cough', medicalHistory: 'Asthma' },
];

// Fetch all patients
exports.getAllPatients = (req, res) => {
    res.json(patients);
};

// Fetch a single patient by ID
exports.getPatientById = (req, res) => {
    const id = parseInt(req.params.id);
    const patient = patients.find(p => p.id === id);

    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    res.json(patient);
};

// Add a new patient
exports.addPatient = (req, res) => {
    const { name, age, diagnosisReasons, medicalHistory } = req.body;

    if (!name || !age || !diagnosisReasons || !medicalHistory) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newPatient = {
        id: patients.length + 1,
        name,
        age,
        diagnosisReasons,
        medicalHistory,
    };

    patients.push(newPatient);
    res.status(201).json(newPatient);
};

// Update a patient's details
exports.updatePatient = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, diagnosisReasons, medicalHistory } = req.body;

    const patient = patients.find(p => p.id === id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.diagnosisReasons = diagnosisReasons || patient.diagnosisReasons;
    patient.medicalHistory = medicalHistory || patient.medicalHistory;

    res.json(patient);
};

// Delete a patient
exports.deletePatient = (req, res) => {
    const id = parseInt(req.params.id);
    const index = patients.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ error: 'Patient not found' });

    patients.splice(index, 1);
    res.status(204).send();
};

