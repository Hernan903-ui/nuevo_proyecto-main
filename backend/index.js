const express = require('express');
const path = require('path');
const app = express();
const registerRoute = require('./routes/register'); // Verifica la ruta aquí

app.use(express.json());
app.use('/api', registerRoute);

// Servir archivos estáticos desde 'frontend/public'
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Ruta para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Puerto donde se ejecuta el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});