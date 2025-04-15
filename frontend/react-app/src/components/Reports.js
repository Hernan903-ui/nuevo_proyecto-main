import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config';

function Reports() {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  // This useEffect now only calls fetchMostSold as fetchMostProfitable isn't used
  // You can add fetchMostProfitable back into this useEffect if you need it
  useEffect(() => {
    fetchMostSold();
    fetchMostProfitable(); // You might not need this if the charts are not functional
  }, []);

  const fetchMostSold = async () => {
    // Implement fetch logic here, but since charts are not functional, you might just log the data
    console.log("Fetching most sold products from:", `${config.apiUrl}/reports/most-sold`);
    try {
        const response = await fetch(`${config.apiUrl}/reports/most-sold`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Most sold products:", data);
        setError(null);
    } catch (error) {
        console.error("Error fetching most sold products:", error);
        setError(t('error.fetch')); // Use translation for error message
    }
  };

  const fetchMostProfitable = async () => {
    // Implement fetch logic here, but since charts are not functional, you might just log the data
    console.log("Fetching most profitable products from:", `${config.apiUrl}/reports/most-profitable`);
    try {
        // Placeholder for fetching data
        setError(null);
    } catch (error) {
        console.error("Error fetching most profitable products:", error);
        setError(t('error.fetch'));
    }};

  const downloadPDF = async () => {
    console.log("Downloading PDF from:", `${config.apiUrl}/reports/generate-pdf`);
  };

  return (
    <div className='reports-container'>
      <h1>{t('reports.title')}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section>
          <h2 aria-label={t('reports.most_sold_products')} data-i18n="reports.most_sold_products">{t('reports.most_sold_products')}</h2>
          {/* <canvas id="mostSoldChart"></canvas> */}
          <p>Chart not implemented</p>
      </section>
      <section>
          <h2 aria-label={t('reports.most_profitable_products')} data-i18n="reports.most_profitable_products">{t('reports.most_profitable_products')}</h2>
          {/* <canvas id="mostProfitableChart"></canvas> */}
          <p>Chart not implemented</p>
          <button onClick={downloadPDF}>{t('reports.download')}</button>
      </section>

    </div>
  );
}

export default Reports;