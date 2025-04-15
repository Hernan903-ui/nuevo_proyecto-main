import React from 'react';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
  };

  return (
    <header role="banner">
      <div className="header-container">
        <h1 data-i18n="header.title">{t('header.title')}</h1>
        <select id="language-selector" onChange={changeLanguage} value={i18n.language} aria-label={t('header.languageSelector')}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </header>
  );
}

export default Header;