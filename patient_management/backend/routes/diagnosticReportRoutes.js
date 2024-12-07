const express = require('express');
const { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient } = require('../controllers/diagnosticReportController');

const router = express.Router();

// Routes
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
