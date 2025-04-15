import React, { useState } from 'react';
import config from '../config';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState(null);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!token) {
      alert('Token is missing');
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/auth/reset-password?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Password reset successfully');
      } else {
        const result = await response.json();
        setError(result.error || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while resetting password');
    } finally {
      setEmail('');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="reset-password-form-container">
      <h1 data-i18n="reset_password.title">{t('reset_password.title')}</h1>
      <form onSubmit={handleResetPassword} aria-label={t('reset_password.form_label')}>
        <label htmlFor="email" data-i18n="reset_password.email">
          {t('reset_password.email')}
        </label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} required aria-label={t('reset_password.email_input_label')} />
        <button type="submit" data-i18n="reset_password.button" aria-label={t('reset_password.button_label')}>
          {t('reset_password.button')}
      </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ResetPassword;