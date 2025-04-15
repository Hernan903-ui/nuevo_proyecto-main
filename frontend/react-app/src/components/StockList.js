import React, { useState, useEffect } from 'react';
import config from '../config';
import { useTranslation } from 'react-i18next';

function StockList() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const fetchLowStock = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/low-stock`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLowStockProducts(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      setError(t('error.fetch_low_stock')); // You might want to add this to your translation files
    }
  };

  const handleUpdateClick = async () => {
    try {
      await fetchLowStock();
      setError(null);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div className='stock-container'>
      <h2>{t('stock.low_stock_products')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div >
          <table aria-label={t('stock.low_stock_table')}>
            <thead>
              <tr>
                <th data-i18n="stock.name">{t('stock.name')}</th>
                <th data-i18n="stock.stock">{t('stock.stock')}</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleUpdateClick} aria-label={t('stock.update_list')} data-i18n="stock.update">{t('stock.update')}</button>
        </div>
    </div>
  );
}



export default StockList;