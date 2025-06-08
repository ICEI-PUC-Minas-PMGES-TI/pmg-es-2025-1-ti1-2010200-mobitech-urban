document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de enchentes por mês (barras)
    const floodsCtx = document.getElementById('floodsChart').getContext('2d');
    const floodsChart = new Chart(floodsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Enchentes',
                data: [3, 5, 7, 9, 12, 15, 18, 14, 10, 7, 4, 2],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Enchentes por Mês',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Ocorrências'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mês'
                    }
                }
            }
        }
    });

    // Gráfico de distribuição de problemas (rosquinha)
    const problemsCtx = document.getElementById('problemsChart').getContext('2d');
    const problemsChart = new Chart(problemsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Bueiros Entupidos', 'Lixo nas Ruas', 'Drenagem Insuficiente', 'Desmatamento', 'Outros'],
            datasets: [{
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Distribuição de Problemas',
                    font: {
                        size: 16
                    }
                }
            },
            cutout: '70%'
        }
    });

const neighborhoodSelect = document.getElementById('neighborhoodSelect');

neighborhoodSelect.addEventListener('change', function() {
    const selectedNeighborhood = this.value;
    updateCharts(selectedNeighborhood);
});

function updateCharts(neighborhood) {
    const floodsData = {
        'Centro': [2, 4, 6, 8, 10, 12, 15, 12, 8, 5, 3, 1],
        'Lagoinha': [1, 3, 5, 7, 9, 11, 14, 11, 7, 4, 2, 1],
        'Caiçara': [4, 6, 8, 10, 13, 16, 19, 15, 11, 8, 5, 3],
        'Barreiro': [3, 5, 7, 9, 11, 14, 17, 13, 9, 6, 3, 2],
        'Venda Nova': [5, 7, 9, 11, 14, 17, 20, 16, 12, 9, 6, 4],
        'Santa Efigênia': [2, 4, 6, 8, 10, 12, 15, 12, 8, 5, 3, 1],
        'São Cristóvão': [1, 3, 5, 7, 9, 11, 14, 11, 7, 4, 2, 1],
        'Padre Eustáquio': [4, 6, 8, 10, 13, 16, 19, 15, 11, 8, 5, 3],
        'Carlos Prates': [3, 5, 7, 9, 11, 14, 17, 13, 9, 6, 3, 2],
        'Gutierrez': [5, 7, 9, 11, 14, 17, 20, 16, 12, 9, 6, 4]
    };

    const problemsData = {
        'Centro': [40, 30, 15, 10, 5],
        'Lagoinha': [50, 20, 10, 15, 5],
        'Caiçara': [35, 35, 20, 5, 5],
        'Barreiro': [45, 25, 10, 15, 5],
        'Venda Nova': [30, 40, 15, 10, 5],
        'Santa Efigênia': [40, 30, 15, 10, 5],
        'São Cristóvão': [50, 20, 10, 15, 5],
        'Padre Eustáquio': [35, 35, 20, 5, 5],
        'Carlos Prates': [45, 25, 10, 15, 5],
        'Gutierrez': [30, 40, 15, 10, 5]
    };

    floodsChart.data.datasets[0].data = floodsData[neighborhood];
    floodsChart.update();

    problemsChart.data.datasets[0].data = problemsData[neighborhood];
    problemsChart.update();
}
updateCharts(neighborhoodSelect.value);
});