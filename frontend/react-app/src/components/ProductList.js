import React, { useState, useEffect } from 'react';
import config from '../config';
import { useTranslation } from 'react-i18next';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await fetch(`${config.apiUrl}/api/products`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      {error && <div className="error-message">{error}</div>}
      {!error && (
        <>
          <h2 data-i18n="products.list">Product List</h2>
          {products.length > 0 ? (
            <table aria-label={useTranslation().t('products.list')}>


              <thead>
                <tr>
                  <th data-i18n="products.id">ID</th>
                  <th data-i18n="products.name">Name</th>
                  <th data-i18n="products.cost_price">Cost Price</th>
                  <th data-i18n="products.sale_price">Sale Price</th>
                  <th data-i18n="products.stock">Stock</th>
                  <th data-i18n="products.actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.cost_price}</td>
                    <td>{product.sale_price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        aria-label={useTranslation().t('products.edit_product', { productName: product.name })}
                        data-i18n="products.edit"
                      >
                        Edit
                      </button>
                      <button
                        aria-label={useTranslation().t('products.delete_product', { productName: product.name })}
                        data-i18n="products.delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
          ) : <p data-i18n="products.no_products">No products found</p>}
          <button onClick={fetchProducts} data-i18n="products.update">Update List</button>
        </>
      )}
    </div>
  );
};

export default ProductList;