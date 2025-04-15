import config from './config.js';

async function fetchLowStock() {
    try {
        const response = await fetch(`${config.apiUrl}/api/low-stock`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayLowStock(data);
    } catch (error) {
        console.error('Error fetching low stock products:', error);
    }
}

function displayLowStock(lowStockProducts) {
    const lowStockTable = document.getElementById('low-stock-table');
    lowStockTable.innerHTML = '';

    lowStockProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.stock}</td>
        `;
        lowStockTable.appendChild(row);
    });
}

window.fetchLowStock = fetchLowStock;

window.addEventListener('load', fetchLowStock);