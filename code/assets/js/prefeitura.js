document.addEventListener('DOMContentLoaded', async function() {
    let stats = {};
    let chartData = {};
    let timelineData = {};
    let floodsChart;
    let problemsChart;
    let floodsCtx;
    let problemsCtx;
    let allHistory = [];

    // DADOS HISTÓRICOS EXTRAS (apenas para visualização na dashboard)
    const extraHistory = [
      {
        title: "Bueiros Entupidos no Funcionários",
        date: "2025-01-27",
        address: "Funcionários",
        problemTypes: ["Bueiros Entupidos"],
        observacoes: "Alagamento na Av. Getúlio Vargas (EM)",
        author: "Fonte: EM"
      },
      {
        title: "Buracos e Asfalto Danificado na Sagrada Família",
        date: "2025-01-03",
        address: "Sagrada Família",
        problemTypes: ["Buracos e Asfalto Danificado"],
        observacoes: "Cratera na Rua Costa Monteiro, nº157 (EM)",
        author: "Fonte: EM"
      },
      {
        title: "Buracos e Asfalto Danificado em São Francisco",
        date: "2025-01-04",
        address: "São Francisco",
        problemTypes: ["Buracos e Asfalto Danificado"],
        observacoes: "Buraco causado por obras na Av. Antônio Carlos ([EM])",
        author: "Fonte: EM"
      },
      {
        title: "Buracos e Asfalto Danificado na Sagrada Família",
        date: "2025-02-06",
        address: "Sagrada Família",
        problemTypes: ["Buracos e Asfalto Danificado"],
        observacoes: "Vazamento causa buracos em duas esquinas ([EM])",
        author: "Fonte: EM"
      },
      {
        title: "Buracos e Asfalto Danificado em Independência / Ibirité",
        date: "2025-06-11",
        address: "Independência / Ibirité",
        problemTypes: ["Buracos e Asfalto Danificado"],
        observacoes: "Poço de visita danificado ([EM])",
        author: "Fonte: EM"
      },
      {
        title: "Lixo ou Entulho nas Ruas no Funcionários",
        date: "2025-02-20",
        address: "Funcionários",
        problemTypes: ["Lixo ou Entulho nas Ruas"],
        observacoes: "Acúmulo de lixo em calçadas próximas à Praça João Pessoa ([EM])",
        author: "Fonte: EM"
      },
      {
        title: "Falta de Limpeza Urbana na Vila Paquetá",
        date: "2025-05-02",
        address: "Vila Paquetá",
        problemTypes: ["Falta de Limpeza Urbana"],
        observacoes: "Resíduos deixados na calçada após coleta ([EM])",
        author: "Fonte: EM"
      },
      {
        title: "Lixo ou Entulho nas Ruas no Córrego Isidoro (Venda Nova)",
        date: "2024-11-16",
        address: "Córrego Isidoro (Venda Nova)",
        problemTypes: ["Lixo ou Entulho nas Ruas"],
        observacoes: "Lixo impede escoamento da água da chuva (EM)",
        author: "Fonte: EM"
      },
      {
        title: "Drenagem Insuficiente / Ausente no Betânia",
        date: "2024-11-04",
        address: "Betânia",
        problemTypes: ["Drenagem Insuficiente / Ausente"],
        observacoes: "Pedido de vistoria técnica por alagamentos (CMBH)",
        author: "CMBH"
      },
      {
        title: "Drenagem Insuficiente / Ausente no Alto Vera Cruz",
        date: "2024-11-04",
        address: "Alto Vera Cruz",
        problemTypes: ["Drenagem Insuficiente / Ausente"],
        observacoes: "Mesma vistoria da CMBH referente a alagamentos recorrentes ([CMBH])",
        author: "CMBH"
      },
      {
        title: "Drenagem Insuficiente / Ausente no Pompeia",
        date: "2024-11-04",
        address: "Pompeia",
        problemTypes: ["Drenagem Insuficiente / Ausente"],
        observacoes: "Reclamações sobre alagamentos por drenagem precária ([CMBH])",
        author: "CMBH"
      },
      {
        title: "Buracos e Asfalto Danificado na Aparecida",
        date: "2025-01-04",
        address: "Aparecida",
        problemTypes: ["Buracos e Asfalto Danificado"],
        observacoes: "Cratera danifica veículo na rua ([EM])",
        author: "Fonte: EM"
      },
      {
        title: "Bueiros Entupidos na Av. Cristiano Machado",
        date: "2024-10-10",
        address: "Av. Cristiano Machado",
        problemTypes: ["Bueiros Entupidos"],
        observacoes: "Poças causadas por entupimento de bueiros (Reddit BH)",
        author: "Reddit BH"
      },
      {
        title: "Lixo / Buracos na Silva Lobo",
        date: "2024-10-27",
        address: "Silva Lobo",
        problemTypes: ["Lixo ou Entulho nas Ruas", "Buracos e Asfalto Danificado"],
        observacoes: "Lixo e buracos após chuvas fortes (Reddit BH)",
        author: "Reddit BH"
      },
      {
        title: "Falta de Limpeza Urbana no Centro (Rodoviária)",
        date: "2024-11-02",
        address: "Centro (Rodoviária)",
        problemTypes: ["Falta de Limpeza Urbana"],
        observacoes: "Lixo, baratas e ratos em área central (Reddit BH)",
        author: "Reddit BH"
      },
      {
        title: "Poste Queimado / Semáforo Apagado no Barreiro",
        date: "2025-03-18",
        address: "Barreiro",
        problemTypes: ["Poste Queimado / Semáforo Apagado"],
        observacoes: "Apagão de postes e sinais após chuvas (Reddit BH)",
        author: "Reddit BH"
      },
      {
        title: "Enchentes / Bueiros Entupidos em Diversos bairros",
        date: "2024-01-24",
        address: "Diversos bairros",
        problemTypes: ["Enchentes", "Bueiros Entupidos"],
        observacoes: "Rastro de caos com alagamentos e carros ilhados (Folha)",
        author: "Folha"
      }
    ];

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
                chartData = getChartData(stats.byType, data.historico || []);
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
        chartData = getChartData(stats.byType, problemHistory);
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
    function getChartData(stats, history = null) {
        // Se history for passado, calcula stats a partir dele
        let statsToUse = stats;
        if (history) {
            statsToUse = history.reduce((acc, item) => {
                (item.problemTypes || []).forEach(type => {
                    acc[type] = (acc[type] || 0) + 1;
                });
                return acc;
            }, {});
        }
        const topProblems = getTopProblems(statsToUse, 10);
        // Defina as cores padrão
        const defaultColors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
        ];
        // Troque a cor de 'Enchentes' para azul marinho escuro
        const colors = topProblems.map(item =>
            item.type === 'Enchentes' ? '#001f4d' : defaultColors[topProblems.indexOf(item) % defaultColors.length]
        );
        return {
            labels: topProblems.map(item => item.type),
            data: topProblems.map(item => item.count),
            backgroundColor: colors
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

    // Combine os dados do backend com os extras
    allHistory = [...extraHistory, ...(stats.recentProblems || [])];
    console.log('allHistory:', allHistory);

    // Recalcule as estatísticas e gráficos usando allHistory
    stats.total = allHistory.length;
    stats.recentProblems = getRecentProblems(allHistory, 10);
    stats.byType = allHistory.reduce((acc, item) => {
        (item.problemTypes || []).forEach(type => {
            acc[type] = (acc[type] || 0) + 1;
        });
        return acc;
    }, {});
    stats.topProblems = getTopProblems(stats.byType, 5);

    chartData = getChartData(stats.byType, allHistory);
    timelineData = getTimelineData(allHistory, 30);

    // Atualizar métricas com dados carregados
    updateMetrics(stats);

    // Gráfico de enchentes por mês (barras) - usando dados temporais reais
    floodsCtx = document.getElementById('floodsChart').getContext('2d');
    if (floodsChart) floodsChart.destroy();
    floodsChart = new Chart(floodsCtx, {
        type: 'bar',
        data: {
            labels: timelineData.labels ? timelineData.labels.slice(-12) : [],
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
    problemsCtx = document.getElementById('problemsChart').getContext('2d');
    if (problemsChart) problemsChart.destroy();
    problemsChart = new Chart(problemsCtx, {
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
        let filteredHistory = allHistory;
        if (neighborhood) {
            filteredHistory = allHistory.filter(record => {
                return (record.location && record.location.includes(neighborhood)) ||
                       (record.address && record.address.includes(neighborhood));
            });
        }
        const filteredTimeline = getTimelineData(filteredHistory, 12);
        if (floodsChart) floodsChart.destroy();
        floodsChart = new Chart(floodsCtx, {
            type: 'bar',
            data: {
                labels: filteredTimeline.labels,
                datasets: [{
                    label: 'Problemas Reportados',
                    data: filteredTimeline.data,
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Problemas Reportados (Últimos 12 dias)', font: { size: 16 } }
                },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Número de Problemas' } },
                    x: { title: { display: true, text: 'Data' } }
                }
            }
        });
        const filteredStats = {};
        filteredHistory.forEach(record => {
            if (Array.isArray(record.problemTypes)) {
                record.problemTypes.forEach(type => {
                    filteredStats[type] = (filteredStats[type] || 0) + 1;
                });
            }
        });
        const filteredChart = getChartData(filteredStats, filteredHistory);
        if (problemsChart) problemsChart.destroy();
        problemsChart = new Chart(problemsCtx, {
            type: 'doughnut',
            data: {
                labels: filteredChart.labels,
                datasets: [{
                    data: filteredChart.data,
                    backgroundColor: filteredChart.backgroundColor || [],
                    borderColor: (filteredChart.backgroundColor || []).map(color => color.replace('0.7', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    title: { display: true, text: 'Distribuição de Problemas', font: { size: 16 } }
                },
                cutout: '70%'
            }
        });
        // Atualiza lista de principais problemas filtrada
        const topProblems = getTopProblems(filteredStats, 5);
        updateProblemsList(topProblems);
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
    
    // Adicionar listener para BroadcastChannel
    if (window.BroadcastChannel) {
        const bc = new BroadcastChannel('posts-updates');
        bc.onmessage = async (event) => {
            if (event.data && event.data.type === 'new-post') {
                await atualizarDashboardCompleta();
            }
        };
    }

    async function atualizarDashboardCompleta() {
        let postsFromAPI = [];
        try {
            const response = await fetch('http://localhost:3000/posts');
            if (response.ok) {
                postsFromAPI = await response.json();
            }
        } catch (e) {}
        allHistory = [...extraHistory, ...postsFromAPI];
        console.log('allHistory:', allHistory);
        stats.total = allHistory.length;
        stats.recentProblems = getRecentProblems(allHistory, 10);
        stats.byType = allHistory.reduce((acc, item) => {
            (item.problemTypes || []).forEach(type => {
                acc[type] = (acc[type] || 0) + 1;
            });
            return acc;
        }, {});
        stats.topProblems = getTopProblems(stats.byType, 5);
        chartData = getChartData(stats.byType, allHistory);
        timelineData = getTimelineData(allHistory, 30);
        updateMetrics(stats);
        floodsCtx = document.getElementById('floodsChart').getContext('2d');
        if (floodsChart) floodsChart.destroy();
        floodsChart = new Chart(floodsCtx, {
            type: 'bar',
            data: {
                labels: timelineData.labels ? timelineData.labels.slice(-12) : [],
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
                    legend: { display: false },
                    title: { display: true, text: 'Problemas Reportados (Últimos 12 dias)', font: { size: 16 } }
                },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Número de Problemas' } },
                    x: { title: { display: true, text: 'Data' } }
                }
            }
        });
        problemsCtx = document.getElementById('problemsChart').getContext('2d');
        if (problemsChart) problemsChart.destroy();
        problemsChart = new Chart(problemsCtx, {
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
                    legend: { position: 'right' },
                    title: { display: true, text: 'Distribuição de Problemas', font: { size: 16 } }
                },
                cutout: '70%'
            }
        });
        updateProblemsList(stats.topProblems);
        // Sempre mostra todos os dados ao atualizar
        updateCharts('');
    }

    // No carregamento inicial, chame atualizarDashboardCompleta()
    atualizarDashboardCompleta();

    // Adicione a opção 'Todos' no select de bairros via JS (caso não exista)
    document.addEventListener('DOMContentLoaded', function() {
        const select = document.getElementById('neighborhoodSelect');
        if (select && !select.querySelector('option[value=""]')) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Todos';
            select.insertBefore(option, select.firstChild);
        }
        // Seleciona 'Todos' por padrão
        select.value = '';
    });
});
    // Elementos do DOM
    const fileUpload = document.getElementById('file-upload');
    const reportsList = document.getElementById('reports-list');
    const uploadStatus = document.getElementById('upload-status');
    
    // Carrega relatórios salvos no localStorage
    loadReports();

    // Evento para upload de arquivos
    fileUpload.addEventListener('change', function(e) {
        const files = e.target.files;
        if (files.length > 0) {
            uploadStatus.textContent = `Enviando ${files.length} arquivo(s)...`;
            
            // Simulando upload (numa aplicação real, aqui seria uma chamada AJAX)
            setTimeout(() => {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    saveReport(file.name, file.type, new Date());
                }
                uploadStatus.textContent = "Upload concluído!";
                setTimeout(() => uploadStatus.textContent = "", 3000);
            }, 1000);
        }
    });

    // Função para salvar relatório no localStorage
    function saveReport(name, type, date) {
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        const newReport = {
            id: Date.now(),
            name: name,
            type: type,
            date: date.toISOString(),
            url: URL.createObjectURL(fileUpload.files[0]) // Em produção, seria a URL do servidor
        };
        reports.unshift(newReport); // Adiciona no início do array
        localStorage.setItem('reports', JSON.stringify(reports));
        renderReport(newReport);
    }

    // Função para carregar relatórios do localStorage
    function loadReports() {
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.forEach(report => renderReport(report));
    }

    // Função para renderizar um relatório na lista
    function renderReport(report) {
        const reportItem = document.createElement('li');
        reportItem.className = 'report-item';
        
        const iconClass = getFileIcon(report.type);
        
        reportItem.innerHTML = `
            <div>
                <i class="${iconClass}"></i>
                <span>${report.name}</span>
            </div>
            <div class="report-actions">
                <a href="${report.url}" download="${report.name}" title="Download">
                    <i class="fas fa-download"></i>
                </a>
                <button onclick="deleteReport(${report.id})" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        reportsList.insertBefore(reportItem, reportsList.firstChild);
    }

    // Função para obter ícone baseado no tipo de arquivo
    function getFileIcon(type) {
        if (type.includes('pdf')) return 'fas fa-file-pdf';
        if (type.includes('word') || type.includes('document')) return 'fas fa-file-word';
        if (type.includes('excel') || type.includes('spreadsheet')) return 'fas fa-file-excel';
        return 'fas fa-file';
    }

// Função global para deletar relatórios
function deleteReport(id) {
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    const updatedReports = reports.filter(report => report.id !== id);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    
    // Recarrega a lista
    document.getElementById('reports-list').innerHTML = '';
    updatedReports.forEach(report => {
        const reportItem = document.createElement('li');
        reportItem.className = 'report-item';
        const iconClass = report.type.includes('pdf') ? 'fas fa-file-pdf' : 'fas fa-file';
        reportItem.innerHTML = `
            <div>
                <i class="${iconClass}"></i>
                <span>${report.name}</span>
            </div>
            <div class="report-actions">
                <a href="${report.url}" download="${report.name}">
                    <i class="fas fa-download"></i>
                </a>
                <button onclick="deleteReport(${report.id})">
                    <i class="fas fa-trash"></i>
                </a>
            </div>
        `;
        document.getElementById('reports-list').appendChild(reportItem);
    });
}