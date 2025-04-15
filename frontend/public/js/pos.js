// pos.js
import config from './config.js';

let productsInCart = [];

// Fetch products from the backend when the page loads
window.addEventListener('load', fetchProducts);

async function fetchProducts() {
    try {
        const response = await fetch(`${config.apiUrl}/api/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error appropriately, e.g., display an error message to the user
    }
}

// Agregar producto al carrito
function addToCart(productId, name, price) {
    const existingProduct = productsInCart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        productsInCart.push({ id: productId, name, price, quantity: 1 });
    }
    updateCartTable();
}

// Actualizar tabla del carrito
function updateCartTable() {
    const table = document.getElementById('pos-table');
    table.innerHTML = '';
    productsInCart.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Finalizar la venta
async function finalizeSale() {
    try {
        const response = await fetch(`${config.apiUrl}/api/sales`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ products: productsInCart })
        });

        if (response.ok) {
            alert('Venta realizada con éxito');
            productsInCart = [];
            updateCartTable();
            generateReceipt(); // Generar comprobante imprimible
        } else {
            alert('Error al realizar la venta');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Generar comprobante imprimible
function generateReceipt() {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write('<h1>Comprobante de Venta</h1>');
    receiptWindow.document.write('<table>');
    receiptWindow.document.write('<tr><th>Producto</th><th>Cantidad</th><th>Total</th></tr>');
    productsInCart.forEach(product => {
        receiptWindow.document.write(`
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
        `);
    });
    receiptWindow.document.write('</table>');
    receiptWindow.print();
}