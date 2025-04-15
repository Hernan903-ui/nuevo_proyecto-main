import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const logout = () => {
    // Simulate logout behavior
    console.log('Logout clicked');
    // Redirect to login page or clear session
  };

  const { t } = useTranslation();

  return (
    <div className="nav-container">
      <nav role="navigation">
        <Link to="/" aria-label={t('nav.home')} data-i18n="nav.home">Home</Link>
        <Link to="/products" aria-label={t('nav.products')} data-i18n="nav.products">Products</Link>
        <Link to="/stock" aria-label={t('nav.stock')} data-i18n="nav.stock">Stock</Link>
        <Link to="/analysis" aria-label={t('nav.analysis')} data-i18n="nav.analysis">Analysis</Link>
        <Link to="/reports" aria-label={t('nav.reports')} data-i18n="nav.reports">Reports</Link>
        <Link to="/pos" aria-label={t('nav.pos')} data-i18n="nav.pos">POS</Link>
        <button onClick={logout} aria-label={t('nav.logout')} data-i18n="nav.logout">Logout</button>
      </nav>
      <footer>
        <p data-i18n="footer.text">&copy; 2025</p>
      </footer>
    </div>
  );
};

export default Navigation;