const express = require('express');

function diagnosticReportRoutes(upload) {
    const router = express.Router();

    let diagnosticReports = [];

    router.post('/', upload.single('document'), (req, res) => {
        const { patientId, reportDate, diagnosis, doctorName } = req.body;
        if (!patientId || !reportDate || !diagnosis || !doctorName || !req.file) {
            return res.status(400).json({ message: 'All fields and document are required' });
        }

        const newReport = {
            id: Date.now(),
            patientId,
            reportDate,
            diagnosis,
            doctorName,
            document: req.file.filename,
        };

        diagnosticReports.push(newReport);
        res.status(201).json(newReport);
    });

    router.get('/', (req, res) => {
        res.status(200).json(diagnosticReports);
    });

    router.delete('/:id', (req, res) => {
        const index = diagnosticReports.findIndex(report => report.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: 'Report not found' });
        }
        diagnosticReports.splice(index, 1);
        res.status(204).send();
    });

    return router;
}

module.exports = diagnosticReportRoutes;
