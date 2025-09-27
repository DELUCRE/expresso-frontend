document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('gestao.html')) {
        loadDashboardData();
    }
});

async function loadDashboardData() {
    const entregas = await API.getEntregas();

    if (entregas) {
        document.getElementById('total-entregas').textContent = entregas.length;
        document.getElementById('entregas-pendentes').textContent = entregas.filter(e => e.status === 'pendente').length;
        document.getElementById('entregas-entregues').textContent = entregas.filter(e => e.status === 'entregue').length;

        renderEntregas(entregas);
    }
}

function renderEntregas(entregas) {
    const list = document.getElementById('entregas-list');
    list.innerHTML = '';

    entregas.forEach(entrega => {
        const item = document.createElement('div');
        item.className = 'entrega-item';
        item.innerHTML = `
            <strong>${entrega.codigo}</strong>
            <span>${entrega.origem} -> ${entrega.destino}</span>
            <span class="status status-${entrega.status}">${entrega.status}</span>
        `;
        list.appendChild(item);
    });
}
