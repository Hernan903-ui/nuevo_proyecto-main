import React, { useState, useEffect } from 'react';
import config from '../config';
import { useTranslation } from 'react-i18next';

function Pos() {
  const [productsInCart, setProductsInCart] = useState([]);
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/api/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        console.log(products);
        //displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error appropriately, e.g., display an error message to the user
    }
};

  const addToCart = (productId, name, price) => {
    const existingProduct = productsInCart.find(p => p.id === productId);
    if (existingProduct) {
      setProductsInCart(productsInCart.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setProductsInCart([...productsInCart, { id: productId, name, price, quantity: 1 }]);
    }
  };

  const updateCartTable = () => {
    return productsInCart.map(product => (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td>{(product.price * product.quantity).toFixed(2)}</td>
      </tr>
    ));
  };

  const finalizeSale = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/api/sales`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ products: productsInCart })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al realizar la venta');
        }

        setProductsInCart([]);
        setError(null);
        alert('Venta realizada con éxito');
    } catch (error) {
        console.error('Error finalizing sale:', error);
        setError(error.message || 'Ocurrió un error al finalizar la venta.');
    }
  };

  return (
    <div className="pos-container">
      <h2>{t('pos.title')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section>
        <div >
          <table>
            <thead>
              <tr>
                <th data-i18n="pos.product">{t('pos.product')}</th>
                <th data-i18n="pos.price">{t('pos.price')}</th>
                <th data-i18n="pos.quantity">{t('pos.quantity')}</th>
                <th data-i18n="pos.total">{t('pos.total')}</th>
              </tr>
            </thead>
            <tbody id="pos-table">
              {updateCartTable()}
            </tbody>
          </table>
          <button onClick={finalizeSale} data-i18n="pos.finish" aria-label={t('pos.finish_sale')}>{t('pos.finish')}</button>
        </div>
      </section>
    </div>
  );
}

export default Pos;