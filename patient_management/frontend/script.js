document.getElementById('checkServer').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000');
        const message = await response.text();
        document.getElementById('responseMessage').innerText = message;
    } catch (error) {
        document.getElementById('responseMessage').innerText = 'Unable to connect to the server.';
    }
});
