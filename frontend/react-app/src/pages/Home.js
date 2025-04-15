import React from 'react';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <section>
      <h1 data-i18n="index.title">{t('index.title')}</h1>
      <p data-i18n="index.welcome">{t('index.welcome')}</p>
    </section>
  );
}

export default Home;