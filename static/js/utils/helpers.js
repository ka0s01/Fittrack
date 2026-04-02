// ===== SHARED UTILITIES =====

function getStatusBadge(status) {
    const badges = {
        'Active': 'badge-success', 'Expired': 'badge-danger', 'Suspended': 'badge-warning',
        'Completed': 'badge-success', 'Scheduled': 'badge-info', 'Cancelled': 'badge-danger',
        'Operational': 'badge-success', 'Under_Maintenance': 'badge-warning',
        'Out_of_Service': 'badge-danger', 'Pending': 'badge-warning', 'Failed': 'badge-danger'
    };
    return badges[status] || 'badge-info';
}

async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    return res.json();
}

function showAlert(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = `alert alert-${type}`;
    el.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;padding:12px 20px;border-radius:8px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.3);';
    el.style.background = type === 'success' ? '#16a34a' : '#dc2626';
    el.style.color = '#fff';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
}

function formatDate(d) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-IN');
}
