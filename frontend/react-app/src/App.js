import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Products from './pages/Products';
import Stock from './pages/Stock';
import Analysis from './pages/Analysis';
import Reports from './pages/Reports';
import Pos from './pages/Pos';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import config from './config';

import './App.css'; // You can add global styles here

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations }
    },
    lng: localStorage.getItem('language') || navigator.language.split('-')[0] || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

const App = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // You can add any app-level initialization logic here
    console.log(`API URL: ${config.apiUrl}`);
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />

        <Routes role="main">
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Add a default route to redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <footer role="contentinfo">
          <p aria-label={t('footer.text')}>&copy; 2025 {t('footer.text')}</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
