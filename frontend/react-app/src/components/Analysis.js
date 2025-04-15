import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config';

const Analysis = () => {
  const { t } = useTranslation();
  const [mostSoldData, setMostSoldData] = useState([]);
  const [mostProfitableData, setMostProfitableData] = useState([]);
  const [error, setError] = useState(null);

  const fetchMostSold = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/reports/most-sold`);
      if (!response.ok) {
        throw new Error('Failed to fetch most sold products');
      }
      const data = await response.json();
      setMostSoldData(data);
    } catch (error) {
      console.error('Error fetching most sold products:', error);
      setError('Error fetching most sold products. Please try again.');
    }
  };

  const fetchMostProfitable = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/reports/most-profitable`);
      if (!response.ok) {
        throw new Error('Failed to fetch most profitable products');
      }
      const data = await response.json();
      setMostProfitableData(data);
    } catch (error) {
      console.error('Error fetching most profitable products:', error);
      setError('Error fetching most profitable products. Please try again.');
    }
  };

  useEffect(() => {
    fetchMostSold();
    fetchMostProfitable();
  }, []);

  return (
    <div className="analysis-container">
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
      <h1 data-i18n="analysis.title" aria-label={t('analysis.title')}>{t('analysis.title')}</h1>
      <section>
        <h2 data-i18n="analysis.chart1">{t('analysis.chart1')}</h2>
        <div> {/* Replace with actual chart component */}
          {mostSoldData.length > 0 ? (
            <ul>
              {mostSoldData.map((item, index) => (
                <li key={index}>{`${item.product_name}: ${item.total_sold}`}</li>
              ))}
            </ul>
          ) : (
            <div aria-label={t('analysis.loading')}>
              <p>Loading data...</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <h2 data-i18n="analysis.chart2">{t('analysis.chart2')}</h2>
        <div> {/* Replace with actual chart component */}
          {mostProfitableData.length > 0 ? (
            <ul>
              {mostProfitableData.map((item, index) => (
                <li key={index}>{`${item.product_name}: ${item.total_profit}`}</li>
              ))}
            </ul>
          ) : (
            <div aria-label={t('analysis.loading')}>
              <p>Loading data...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Analysis;