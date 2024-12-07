const express = require('express');
const cors = require('cors');
const diagnosticReportRoutes = require('./routes/diagnosticReportRoutes'); // Import diagnostic report routes

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use the diagnostic report routes
app.use('/api/diagnostic-reports', diagnosticReportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
