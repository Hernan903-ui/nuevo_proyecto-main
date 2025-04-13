document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const businessName = document.getElementById('business_name').value;

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