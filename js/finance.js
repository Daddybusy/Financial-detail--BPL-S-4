document.addEventListener('DOMContentLoaded', () => {
    // Determine Page context
    if (document.getElementById('sponsors-grid')) {
        loadSponsors();
    }
    if (document.getElementById('income-table-body')) {
        loadFinanceTables();
    }
    if (document.getElementById('detailed-expense-tbody')) {
        loadDetailedExpenses();
    }
});

function loadSponsors() {
    fetch('data/sponsors.json')
        .then(res => res.json())
        .then(data => {
            const grid = document.getElementById('sponsors-grid');
            renderSponsors(data, grid);

            // Filter Handler
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const category = btn.getAttribute('data-filter');
                    if (category === 'all') {
                        renderSponsors(data, grid);
                    } else {
                        const filtered = data.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
                        renderSponsors(filtered, grid);
                    }
                });
            });
        });
}

function renderSponsors(sponsors, container) {
    container.innerHTML = sponsors.map(s => {
        let badgeClass = s.status === 'Paid' || s.status === 'Sponsored' ? 'badge-success' : 'badge-warning';
        return `
            <div class="glass-card sponsor-card glow-hover">
                <div class="sponsor-header">
                    <div class="sponsor-avatar">
                        <i class="fa-solid fa-handshake"></i>
                    </div>
                    <span class="badge ${badgeClass}">${s.status}</span>
                </div>
                <div>
                    <h3 class="sponsor-name">${s.name}</h3>
                    <span class="badge badge-purple">${s.category}</span>
                    <p class="sponsor-contrib"><strong>Contribution:</strong> ${s.contribution}</p>
                </div>
            </div>
        `;
    }).join('');
}

function loadFinanceTables() {
    fetch('data/finance.json')
        .then(res => res.json())
        .then(data => {
            const incomeBody = document.getElementById('income-table-body');
            incomeBody.innerHTML = data.income.map(item => `
                <tr>
                    <td>${item.source}</td>
                    <td class="text-right">Rs. ${item.amount.toLocaleString()}</td>
                </tr>
            `).join('');

            const summaryBody = document.getElementById('expense-summary-body');
            summaryBody.innerHTML = data.expenseSummary.map(item => `
                <tr>
                    <td>${item.category}</td>
                    <td class="text-right">Rs. ${item.amount.toLocaleString()}</td>
                </tr>
            `).join('');
        });
}

function loadDetailedExpenses() {
    fetch('data/expenses.json')
        .then(res => res.json())
        .then(data => {
            let currentData = [...data];
            const tbody = document.getElementById('detailed-expense-tbody');
            const searchInput = document.getElementById('expense-search');
            const categorySelect = document.getElementById('expense-category-filter');
            const sortSelect = document.getElementById('expense-sort');

            const render = (items) => {
                tbody.innerHTML = items.map(exp => `
                    <tr>
                        <td>${exp.date}</td>
                        <td><strong>${exp.title}</strong></td>
                        <td><span class="badge badge-purple">${exp.category}</span></td>
                        <td>Rs. ${exp.amount.toLocaleString()}</td>
                        <td>${exp.paidBy}</td>
                        <td><span class="badge badge-success">${exp.status}</span></td>
                    </tr>
                `).join('');
            };

            const filterAndSort = () => {
                let result = [...data];
                const searchVal = searchInput.value.toLowerCase();
                const catVal = categorySelect.value;
                const sortVal = sortSelect.value;

                if (searchVal) {
                    result = result.filter(e => e.title.toLowerCase().includes(searchVal) || e.paidBy.toLowerCase().includes(searchVal));
                }

                if (catVal !== 'ALL') {
                    result = result.filter(e => e.category === catVal);
                }

                if (sortVal === 'amount-high') {
                    result.sort((a, b) => b.amount - a.amount);
                } else if (sortVal === 'amount-low') {
                    result.sort((a, b) => a.amount - b.amount);
                }

                render(result);
            };

            searchInput.addEventListener('input', filterAndSort);
            categorySelect.addEventListener('change', filterAndSort);
            sortSelect.addEventListener('change', filterAndSort);

            render(currentData);
        });
}
