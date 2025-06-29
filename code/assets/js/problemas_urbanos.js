// Sistema de Estatísticas de Problemas para a Prefeitura
class ProblemStatistics {
    constructor() {
        this.stats = {};
        this.history = [];
        this.loadFromServer();
    }

    // Carregar dados do servidor
    async loadFromServer() {
        try {
            const response = await fetch('http://localhost:3000/problemas_urbanos');
            if (response.ok) {
                const data = await response.json();
                this.stats = data.estatisticas || {};
                this.history = data.historico || [];
            } else {
                // Fallback para localStorage se servidor não estiver disponível
                this.loadFromLocalStorage();
            }
        } catch (error) {
            console.warn('Servidor não disponível, usando localStorage:', error);
            this.loadFromLocalStorage();
        }
    }

    // Carregar do localStorage (fallback)
    loadFromLocalStorage() {
        this.stats = JSON.parse(localStorage.getItem('problemStatistics')) || {};
        this.history = JSON.parse(localStorage.getItem('problemHistory')) || [];
    }

    // Salvar no servidor
    async saveToServer() {
        try {
            const data = {
                estatisticas: this.stats,
                historico: this.history
            };
            
            await fetch('http://localhost:3000/problemas_urbanos', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.warn('Erro ao salvar no servidor, salvando no localStorage:', error);
            this.saveToLocalStorage();
        }
    }

    // Salvar no localStorage (fallback)
    saveToLocalStorage() {
        localStorage.setItem('problemStatistics', JSON.stringify(this.stats));
        localStorage.setItem('problemHistory', JSON.stringify(this.history));
    }

    // Adicionar novos problemas às estatísticas
    async addProblems(problemTypes, author = 'Usuário', location = null) {
        const record = {
            id: Date.now(),
            date: new Date().toISOString(),
            problemTypes: problemTypes,
            author: author,
            location: location
        };

        // Atualizar contadores
        problemTypes.forEach(problemType => {
            if (this.stats[problemType]) {
                this.stats[problemType]++;
            } else {
                this.stats[problemType] = 1;
            }
        });

        // Adicionar ao histórico
        this.history.push(record);

        // Salvar dados (tenta servidor primeiro, depois localStorage)
        await this.saveToServer();

        return record;
    }

    // Obter estatísticas gerais
    getStatistics() {
        return {
            total: this.history.length,
            byType: this.stats,
            topProblems: this.getTopProblems(5),
            recentProblems: this.getRecentProblems(10)
        };
    }

    // Obter problemas mais frequentes
    getTopProblems(limit = 5) {
        return Object.entries(this.stats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([type, count]) => ({ type, count }));
    }

    // Obter problemas recentes
    getRecentProblems(limit = 10) {
        return this.history
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // Obter problemas por período
    getProblemsByPeriod(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return this.history.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate >= start && recordDate <= end;
        });
    }

    // Obter estatísticas por período
    getStatisticsByPeriod(startDate, endDate) {
        const problems = this.getProblemsByPeriod(startDate, endDate);
        const periodStats = {};
        
        problems.forEach(record => {
            record.problemTypes.forEach(type => {
                periodStats[type] = (periodStats[type] || 0) + 1;
            });
        });

        return {
            total: problems.length,
            byType: periodStats,
            problems: problems
        };
    }

    // Obter problemas por localização
    getProblemsByLocation() {
        const locationStats = {};
        
        this.history.forEach(record => {
            if (record.location) {
                if (!locationStats[record.location]) {
                    locationStats[record.location] = [];
                }
                locationStats[record.location].push(record);
            }
        });

        return locationStats;
    }

    // Exportar dados para JSON
    exportData() {
        return {
            statistics: this.stats,
            history: this.history,
            exportDate: new Date().toISOString()
        };
    }

    // Limpar dados (cuidado!)
    async clearData() {
        this.stats = {};
        this.history = [];
        await this.saveToServer();
    }

    // Obter dados para gráficos
    getChartData() {
        const topProblems = this.getTopProblems(10);
        return {
            labels: topProblems.map(item => item.type),
            data: topProblems.map(item => item.count),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
            ]
        };
    }

    // Obter dados para gráfico de linha temporal
    getTimelineData(days = 30) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const problems = this.getProblemsByPeriod(startDate, endDate);
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
}

// Instância global para uso em outras páginas
window.problemStatistics = new ProblemStatistics();

// Função para inicializar estatísticas na página da prefeitura
function initializePrefectureDashboard() {
    if (typeof window.problemStatistics !== 'undefined') {
        console.log('Sistema de estatísticas carregado');
        console.log('Estatísticas atuais:', window.problemStatistics.getStatistics());
    }
}

// Auto-inicialização se estiver na página da prefeitura
if (document.title.includes('Prefeitura') || window.location.pathname.includes('prefeitura')) {
    document.addEventListener('DOMContentLoaded', initializePrefectureDashboard);
} 