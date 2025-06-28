document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o sistema de estatísticas está disponível
    if (typeof window.problemStatistics === 'undefined') {
        console.error('Sistema de estatísticas não encontrado');
        return;
    }

    // Obter dados reais das estatísticas
    const stats = window.problemStatistics.getStatistics();
    const chartData = window.problemStatistics.getChartData();
    const timelineData = window.problemStatistics.getTimelineData(30);

    // Atualizar métricas com dados reais
    updateMetrics(stats);

    // Gráfico de enchentes por mês (barras) - usando dados temporais reais
    const floodsCtx = document.getElementById('floodsChart').getContext('2d');
    const floodsChart = new Chart(floodsCtx, {
        type: 'bar',
        data: {
            labels: timelineData.labels.slice(-12), // Últimos 12 dias
            datasets: [{
                label: 'Problemas Reportados',
                data: timelineData.data.slice(-12),
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
                    text: 'Problemas Reportados (Últimos 12 dias)',
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
                        text: 'Número de Problemas'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                }
            }
        }
    });

    // Gráfico de distribuição de problemas (rosquinha) - usando dados reais
    const problemsCtx = document.getElementById('problemsChart').getContext('2d');
    const problemsChart = new Chart(problemsCtx, {
        type: 'doughnut',
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.data,
                backgroundColor: chartData.backgroundColor,
                borderColor: chartData.backgroundColor.map(color => color.replace('0.7', '1')),
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

    // Atualizar lista de principais problemas
    updateProblemsList(stats.topProblems);

    const neighborhoodSelect = document.getElementById('neighborhoodSelect');

    neighborhoodSelect.addEventListener('change', function() {
        const selectedNeighborhood = this.value;
        updateCharts(selectedNeighborhood);
    });

    function updateCharts(neighborhood) {
        // Para demonstração, vamos usar dados simulados por bairro
        // Em um sistema real, você teria dados geográficos específicos
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

    // Função para atualizar métricas
    function updateMetrics(stats) {
        const metricCards = document.querySelectorAll('.metric-card');
        
        if (metricCards.length >= 4) {
            // Ocorrências Totais
            metricCards[0].querySelector('.metric-value').textContent = stats.total;
            
            // Bairros Afetados (simulado)
            metricCards[1].querySelector('.metric-value').textContent = '5';
            
            // Problemas Reportados
            metricCards[2].querySelector('.metric-value').textContent = Object.values(stats.byType).reduce((a, b) => a + b, 0);
            
            // Tempo Médio de Resposta (simulado)
            metricCards[3].querySelector('.metric-value').textContent = '48h';
        }
    }

    // Função para atualizar lista de problemas
    function updateProblemsList(topProblems) {
        const problemsList = document.querySelector('.problems-list');
        if (problemsList) {
            problemsList.innerHTML = '';
            
            topProblems.forEach((problem, index) => {
                const problemItem = document.createElement('div');
                problemItem.className = 'problem-item';
                problemItem.innerHTML = `
                    <span class="problem-number">${index + 1}</span>
                    <span class="problem-text">${problem.type}</span>
                    <span class="problem-count">(${problem.count})</span>
                `;
                problemsList.appendChild(problemItem);
            });
        }
    }

    updateCharts(neighborhoodSelect.value);
    
    // Atualizar dados a cada 30 segundos
    setInterval(() => {
        const updatedStats = window.problemStatistics.getStatistics();
        updateMetrics(updatedStats);
        updateProblemsList(updatedStats.topProblems);
    }, 30000);
});