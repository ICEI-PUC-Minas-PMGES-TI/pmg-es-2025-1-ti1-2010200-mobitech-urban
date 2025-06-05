document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de enchentes por mês
    const floodsCtx = document.getElementById('floodsChart').getContext('2d');
    const floodsChart = new Chart(floodsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Número de Enchentes',
                data: [3, 5, 7, 9, 12, 15, 18, 14, 10, 7, 4, 2],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(231, 76, 60, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Enchentes por Mês em 2025'
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

    // Gráfico de distribuição de problemas
    const problemsCtx = document.getElementById('problemsChart').getContext('2d');
    const problemsChart = new Chart(problemsCtx, {
        type: 'pie',
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
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Distribuição de Problemas Reportados'
                }
            }
        }
    });

    // Interatividade com os bairros
    const neighborhoodButtons = document.querySelectorAll('.neighborhood');
    neighborhoodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            neighborhoodButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active apenas ao botão clicado
            this.classList.add('active');
            
            // Aqui você pode adicionar lógica para atualizar os gráficos
            // conforme o bairro selecionado
            const neighborhood = this.getAttribute('data-neighborhood');
            updateCharts(neighborhood);
        });
    });

    function updateCharts(neighborhood) {
        // Simulação de dados diferentes para cada bairro
        const floodsData = {
            'A': [2, 4, 6, 8, 10, 12, 15, 12, 8, 5, 3, 1],
            'B': [1, 3, 5, 7, 9, 11, 14, 11, 7, 4, 2, 1],
            'C': [4, 6, 8, 10, 13, 16, 19, 15, 11, 8, 5, 3],
            'D': [3, 5, 7, 9, 11, 14, 17, 13, 9, 6, 3, 2],
            'E': [5, 7, 9, 11, 14, 17, 20, 16, 12, 9, 6, 4]
        };

        const problemsData = {
            'A': [40, 30, 15, 10, 5],
            'B': [50, 20, 10, 15, 5],
            'C': [35, 35, 20, 5, 5],
            'D': [45, 25, 10, 15, 5],
            'E': [30, 40, 15, 10, 5]
        };

        // Atualiza o gráfico de enchentes
        floodsChart.data.datasets[0].data = floodsData[neighborhood];
        floodsChart.update();

        // Atualiza o gráfico de problemas
        problemsChart.data.datasets[0].data = problemsData[neighborhood];
        problemsChart.update();
    }
});