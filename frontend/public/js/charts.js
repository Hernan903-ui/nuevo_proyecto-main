import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Función para renderizar un gráfico de barras
function renderBarChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ventas',
                data: data,
                backgroundColor: ['rgba(54, 162, 235, 0.8)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para renderizar un gráfico de pastel
function renderPieChart(canvasId, chartData) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartData.map(item => item.name),
            datasets: [{
                data: chartData.map(item => item.y),
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)']
            }]
        },
        options: {
            responsive: true,
        }
    });
}