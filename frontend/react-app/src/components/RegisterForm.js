import React, { useState } from 'react';
import config from '../config';
import { useTranslation } from 'react-i18next';

function RegisterForm() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(`${config.apiUrl}/auth/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, password, business_name: businessName }),
          });
          const data = await response.json();
          if (response.ok) {
              // alert(t('register.success')); // Use translation key for success message
              window.location.href = '/login';
              setErrorMessage(null);
          } else {
              // alert(data.error || t('register.error')); // Use translation key for error message
              setErrorMessage(data.error || t('register.error'));
          }
      } catch (error) {
          console.error('Error:', error);
          // alert(t('register.error')); // Use translation key for generic error message
          setErrorMessage(t('register.error'));
      }
  };

  return (
      <div className="register-form-container">
          <form onSubmit={handleRegister} aria-label={t('register.form_label')}>
              <div>
                  <label htmlFor="name" data-i18n="register.name">
                      {t('register.name')}
                  </label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required aria-label={t('register.name_input_label')} />
              </div>
              <div>
                  <label htmlFor="email" data-i18n="register.email">
                      {t('register.email')}
                  </label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label={t('register.email_input_label')} />
              </div>
              <div>
                  <label htmlFor="password" data-i18n="register.password">
                      {t('register.password')}
                  </label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required aria-label={t('register.password_input_label')} />
              </div>
              <div>
                  <label htmlFor="businessName" data-i18n="register.business_name">
                      {t('register.business_name')}
                  </label>
                  <input type="text" id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
              </div>
              <button type="submit" data-i18n="register.button">{t('register.button')}</button>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
      </div>
  );
}

export default RegisterForm;