const express = require('express');
const router = express.Router();

// Ruta para servir un recurso o manejar lógica del registro
router.get('/register', (req, res) => {
    res.send('Ruta de registro funcionando correctamente.');
});

module.exports = router;