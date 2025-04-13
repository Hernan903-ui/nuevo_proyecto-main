document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const businessName = document.getElementById('business_name').value;

    const express = require('express');
    const router = express.Router();

// Ruta para manejar el registro de usuarios
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Lógica para registrar al usuario
    // Por ejemplo: Guardar el usuario en la base de datos
    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    res.status(200).json({ message: 'Usuario registrado con éxito' });
});

module.exports = router;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, business_name: businessName })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Usuario registrado con éxito');
            window.location.href = '/login.html'; // Redirigir al login
        } else {
            alert(data.error || 'Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});