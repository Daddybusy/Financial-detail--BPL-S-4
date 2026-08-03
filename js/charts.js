document.addEventListener('DOMContentLoaded', () => {
    fetch('data/finance.json')
        .then(response => response.json())
        .then(data => {
            renderIncomeVsExpenseChart(data);
            renderFinancialGrowthChart(data);
        })
        .catch(err => console.error("Error loading finance JSON for charts:", err));

    fetch('data/expenses.json')
        .then(response => response.json())
        .then(data => {
            renderExpenseDistributionChart(data);
        })
        .catch(err => console.error("Error loading expenses JSON for charts:", err));
});

function renderIncomeVsExpenseChart(data) {
    const ctx = document.getElementById('incomeVsExpenseChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Financial Overview'],
            datasets: [
                {
                    label: 'Total Income (NPR)',
                    data: [data.summary.totalIncome],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    borderRadius: 8
                },
                {
                    label: 'Total Expenses (NPR)',
                    data: [data.summary.totalExpense],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: '#ef4444',
                    borderWidth: 1,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

function renderExpenseDistributionChart(expenses) {
    const ctx = document.getElementById('expenseDistributionChart');
    if (!ctx) return;

    const categories = {};
    expenses.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + item.amount;
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    '#7000ff', '#0066ff', '#ffb703', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#f8fafc' } }
            }
        }
    });
}

function renderFinancialGrowthChart(data) {
    const ctx = document.getElementById('financialGrowthChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5 (Finals)'],
            datasets: [
                {
                    label: 'Cumulative Income',
                    data: [5000, 12000, 18000, 21000, 23370],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Cumulative Expenditure',
                    data: [3000, 8500, 14000, 19500, 23370],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}
