import config from './config.js';
import { showAlert } from './alerts.js';

async function fetchProducts() {
    try {
        const response = await fetch(`${config.apiUrl}/api/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        showAlert('error', 'Error al cargar los productos. Por favor, intenta de nuevo.');
    }
}

function displayProducts(products) {
    const productTable = document.getElementById('product-table');
    productTable.innerHTML = ''; 

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.cost_price}</td>
            <td>${product.sale_price}</td>
            <td>${product.stock}</td>
            <td>
              <button class="btn-edit" onclick="editProduct(${product.id})">Editar</button>
              <button class="btn-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        `;
        productTable.appendChild(row);
    });
}
window.fetchProducts = fetchProducts;
function editProduct(productId) {
  console.log(`Edit product with ID: ${productId}`);
}

function deleteProduct(productId) {
  console.log(`Delete product with ID: ${productId}`);
}

window.editProduct = editProduct;
window.deleteProduct = deleteProduct;