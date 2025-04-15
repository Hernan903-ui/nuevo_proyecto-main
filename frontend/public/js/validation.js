// validation.js
import './utils.js';
import './auth.js';

// Validar el formulario
function validateForm(form) {
    const emailField = form.querySelector("input[type='email']");
    const passwordField = form.querySelector("input[type='password']");

    const errors = [];

    if (emailField) {
        const email = emailField.value.trim();
        if (!email) {
            errors.push("El correo electrónico es obligatorio.");
        } else if (!isValidEmail(email)) {
            errors.push("El correo electrónico no tiene un formato válido.");
        }
    }    

    if (passwordField) {
        const password = passwordField.value.trim();
        if (!password) {
            errors.push("La contraseña es obligatoria.");
        } else if (password.length < 6) {
            errors.push("La contraseña debe tener al menos 6 caracteres.");
        }
    }    

    return errors;
}

// Manejar la validación al enviar el formulario
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const errors = validateForm(form);

    if (errors.length > 0) {
        showAlert(errors.join("<br>"), 'error');
    } 
});