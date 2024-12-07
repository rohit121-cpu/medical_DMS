document.addEventListener('DOMContentLoaded', () => {
    const addPatientForm = document.getElementById('addPatientForm');
    const patientsList = document.getElementById('patientsList');

    // Fetch patients from the server
    function fetchPatients() {
        fetch('http://localhost:5000/api/patients')
            .then(response => response.json())
            .then(patients => {
                patientsList.innerHTML = '';
                patients.forEach(patient => {
                    const patientItem = document.createElement('div');
                    patientItem.innerHTML = `
                        <div>
                            <strong>${patient.name}</strong> (Age: ${patient.age})
                            <p>Medical History: ${patient.medicalHistory}</p>
                           
                            <button onclick="deletePatient(${patient.id})">Delete</button>
                        </div>
                    `;
                    patientsList.appendChild(patientItem);
                });
            });
    }

    // Add new patient
    addPatientForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const medicalHistory = document.getElementById('medicalHistory').value;

        fetch('http://localhost:5000/api/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, medicalHistory }),
        })
            .then(response => response.json())
            .then(() => {
                fetchPatients(); // Refresh the list
                addPatientForm.reset(); // Clear form
            });
    });

    // Delete patient
    window.deletePatient = function(id) {
        fetch(`http://localhost:5000/api/patients/${id}`, { method: 'DELETE' })
            .then(() => fetchPatients()); // Refresh the list
    }

    // Initial fetch of patients
    fetchPatients();
});
