document.addEventListener('DOMContentLoaded', async function() {
    let stats = {};
    let chartData = {};
    let timelineData = {};

    // Função para carregar dados do servidor
    async function loadDataFromServer() {
        try {
            const response = await fetch('http://localhost:3000/problemas_urbanos');
            if (response.ok) {
                const data = await response.json();
                stats = {
                    total: data.historico ? data.historico.length : 0,
                    byType: data.estatisticas || {},
                    topProblems: getTopProblems(data.estatisticas || {}, 5),
                    recentProblems: getRecentProblems(data.historico || [], 10)
                };
                chartData = getChartData(stats.byType);
                timelineData = getTimelineData(data.historico || [], 30);
                return true;
            } else {
                throw new Error('Servidor não disponível');
            }
        } catch (error) {
            console.warn('Erro ao carregar do servidor, usando localStorage:', error);
            return false;
        }
    }

    // Função para carregar dados do localStorage (fallback)
    function loadDataFromLocalStorage() {
        const problemStats = JSON.parse(localStorage.getItem('problemStatistics')) || {};
        const problemHistory = JSON.parse(localStorage.getItem('problemHistory')) || [];
        
        stats = {
            total: problemHistory.length,
            byType: problemStats,
            topProblems: getTopProblems(problemStats, 5),
            recentProblems: getRecentProblems(problemHistory, 10)
        };
        chartData = getChartData(stats.byType);
        timelineData = getTimelineData(problemHistory, 30);
    }

    // Função para obter problemas mais frequentes
    function getTopProblems(stats, limit = 5) {
        return Object.entries(stats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([type, count]) => ({ type, count }));
    }

    // Função para obter problemas recentes
    function getRecentProblems(history, limit = 10) {
        return history
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // Função para obter dados para gráficos
    function getChartData(stats) {
        const topProblems = getTopProblems(stats, 10);
        return {
            labels: topProblems.map(item => item.type),
            data: topProblems.map(item => item.count),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
            ]
        };
    }

    // Função para obter dados para gráfico de linha temporal
    function getTimelineData(history, days = 30) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const problems = history.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate >= startDate && recordDate <= endDate;
        });
        
        const dailyStats = {};

        // Inicializar todos os dias com 0
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            dailyStats[d.toISOString().split('T')[0]] = 0;
        }

        // Contar problemas por dia
        problems.forEach(record => {
            const date = record.date.split('T')[0];
            dailyStats[date]++;
        });

        return {
            labels: Object.keys(dailyStats),
            data: Object.values(dailyStats)
        };
    }

    // Carregar dados (tenta servidor primeiro, depois localStorage)
    const serverLoaded = await loadDataFromServer();
    if (!serverLoaded) {
        loadDataFromLocalStorage();
    }

    // Verificar se o sistema de estatísticas está disponível (para compatibilidade)
    if (typeof window.problemStatistics !== 'undefined') {
        console.log('Sistema de estatísticas local também disponível');
    }

    // Atualizar métricas com dados carregados
    updateMetrics(stats);

    // Gráfico de enchentes por mês (barras) - usando dados temporais reais
    const floodsCtx = document.getElementById('floodsChart').getContext('2d');
    const floodsChart = new Chart(floodsCtx, {
        type: 'bar',
        data: {
            labels: timelineData.labels ? timelineData.labels.slice(-12) : [], // Últimos 12 dias
            datasets: [{
                label: 'Problemas Reportados',
                data: timelineData.data ? timelineData.data.slice(-12) : [],
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
            labels: chartData.labels || [],
            datasets: [{
                data: chartData.data || [],
                backgroundColor: chartData.backgroundColor || [],
                borderColor: (chartData.backgroundColor || []).map(color => color.replace('0.7', '1')),
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
    setInterval(async () => {
        const serverLoaded = await loadDataFromServer();
        if (!serverLoaded) {
            loadDataFromLocalStorage();
        }
        updateMetrics(stats);
        updateProblemsList(stats.topProblems);
    }, 30000);
});