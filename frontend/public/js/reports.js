import config from './config.js';

// Generar gráfico de productos más vendidos
async function generateMostSoldReport() {
    try {
        const response = await fetch(`${config.apiUrl}/reports/most-sold`);
        const data = await response.json();

        const labels = data.map(item => item.product_name);
        const values = data.map(item => item.total_sold);

        renderBarChart('mostSoldChart', labels, values);
    } catch (error) {
        console.error('Error al generar el reporte de productos más vendidos:', error);
    }
}

// Generar gráfico de productos más rentables
async function generateMostProfitableReport() {
    try {
        const response = await fetch(`${config.apiUrl}/reports/most-profitable`);
        const data = await response.json();

        const labels = data.map(item => item.product_name);
        const values = data.map(item => item.total_profit);

        renderBarChart('mostProfitableChart', labels, values);
    } catch (error) {
        console.error('Error al generar el reporte de productos más rentables:', error);
    }
}

// Llamar a las funciones al cargar la página
window.onload = () => {
    generateMostSoldReport();
    generateMostProfitableReport();
};

// Descargar reporte PDF
async function downloadPDF() {
    try {
        const response = await fetch(`${config.apiUrl}/reports/generate-pdf`);
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'reporte_inventario.pdf';
        link.click();
    } catch (error) {
        console.error('Error:', error);
    }
}