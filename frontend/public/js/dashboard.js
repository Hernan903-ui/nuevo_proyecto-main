import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login if no token is found
        window.location.href = 'login.html';
        return;
    }

    // Check if the user is an admin
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken.role === 'admin') {
        const adminSection = document.getElementById('admin-section');
        if (adminSection) {
            adminSection.style.display = 'block';
        }
    }

    // Fetch dashboard data
    fetch(`${config.apiUrl}/api/dashboard-data`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Gráfico de Ventas Totales
            Highcharts.chart('total-sales-chart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Ventas Totales'
                },
                xAxis: {
                    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo']
                },
                yAxis: {
                    title: {
                        text: 'Monto ($)'
                    }
                },
                series: [{
                    name: 'Ventas',
                    data: data.totalSales
                }]
            });

            // Gráfico de Productos Más Vendidos
            Highcharts.chart('best-sellers-chart', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Productos Más Vendidos'
                },
                series: [{
                    name: 'Ventas',
                    data: data.bestSellers
                }]
            });
        })
        .catch(error => console.error('Error fetching dashboard data:', error));
});