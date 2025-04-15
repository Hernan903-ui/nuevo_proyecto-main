import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config';


function LoginForm() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Assuming your backend returns a token upon successful login
        localStorage.setItem('token', data.token);
        // Redirect to a protected route (e.g., dashboard)
        window.location.href = '/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };
  const { t } = useTranslation();

  return (
    <div className='login-form-container'>
      <form onSubmit={handleLogin} aria-label={t('login.form.label')}>
        <div>
          <label htmlFor="email" data-i18n="login.email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label={t('login.email.label')}
          />
        </div>
        <div>
          <label htmlFor="password" data-i18n="login.password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label={t('login.password.label')}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" data-i18n="login.button" aria-label={t('login.button.label')}>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;