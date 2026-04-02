// ==========================================
// PAYMENTS — add + delete + update status
// ==========================================
let allPayments = [];

async function initPayments() {
    await loadPayments();
    document.getElementById('payment-form')?.addEventListener('submit', savePayment);
    document.getElementById('search-payment')?.addEventListener('input', renderPaymentsTable);
    document.getElementById('filter-type')?.addEventListener('change', renderPaymentsTable);
    document.getElementById('filter-status')?.addEventListener('change', renderPaymentsTable);
}

async function loadPayments() {
    const [payments, stats] = await Promise.all([
        apiFetch('/api/payments'),
        apiFetch('/api/payments/stats')
    ]);
    allPayments = payments;
    renderPaymentsTable();
    updatePaymentStats(stats);
}

function renderPaymentsTable() {
    const tbody = document.querySelector('#payments-table tbody');
    if (!tbody) return;

    const search = (document.getElementById('search-payment')?.value || '').toLowerCase();
    const type   = document.getElementById('filter-type')?.value   || '';
    const status = document.getElementById('filter-status')?.value || '';

    const filtered = allPayments.filter(p => {
        const matchSearch = !search || p.member_name.toLowerCase().includes(search);
        const matchType   = !type   || p.payment_for === type;
        const matchStatus = !status || p.status === status;
        return matchSearch && matchType && matchStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#64748b;padding:24px;">No payments found</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(p => `
        <tr>
            <td>${formatDate(p.payment_date)}</td>
            <td>${p.member_name}</td>
            <td>₹${Number(p.amount).toLocaleString()}</td>
            <td>${p.payment_for.replace(/_/g, ' ')}</td>
            <td>${p.payment_method}</td>
            <td><span class="badge ${getStatusBadge(p.status)}">${p.status}</span></td>
            <td>
                ${p.status === 'Pending' ?
                    `<button class="btn btn-success btn-sm" onclick="markPaymentCompleted(${p.payment_id})">Mark Paid</button>` : ''}
                <button class="btn btn-danger btn-sm" onclick="deletePayment(${p.payment_id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function updatePaymentStats(stats) {
    const total   = document.getElementById('total-revenue');
    const pending = document.getElementById('pending-payments');
    const monthly = document.getElementById('monthly-revenue');
    if (total)   total.textContent   = '₹' + Number(stats.total).toLocaleString();
    if (pending) pending.textContent = '₹' + Number(stats.pending).toLocaleString();
    if (monthly) monthly.textContent = '₹' + Number(stats.monthly).toLocaleString();
}

async function openAddPaymentModal() {
    document.getElementById('paymentModal').classList.add('show');
    const members = await apiFetch('/api/members');
    const sel = document.getElementById('member-id');
    sel.innerHTML = '<option value="">Choose a member...</option>' +
        members.map(m => `<option value="${m.member_id}">${m.fname} ${m.lname}</option>`).join('');
    document.getElementById('payment-date').valueAsDate = new Date();
}

async function savePayment(e) {
    e.preventDefault();
    const data = {
        member_id:      document.getElementById('member-id').value,
        amount:         document.getElementById('amount').value,
        payment_date:   document.getElementById('payment-date').value,
        payment_method: document.getElementById('payment-method').value,
        payment_for:    document.getElementById('payment-type').value,
        status:         document.getElementById('status').value || 'Completed',
        notes:          document.getElementById('notes')?.value || ''
    };
    if (!data.member_id || !data.amount || !data.payment_method || !data.payment_for) {
        showAlert('Please fill all required fields', 'error');
        return;
    }
    const res = await apiFetch('/api/payments', { method: 'POST', body: JSON.stringify(data) });
    if (res.success) {
        showAlert('Payment recorded successfully!');
        closePaymentModal();
        loadPayments();
    } else {
        showAlert(res.message || 'Failed to record payment', 'error');
    }
}

async function markPaymentCompleted(pid) {
    const res = await apiFetch(`/api/payments/${pid}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'Completed' })
    });
    if (res.success) {
        showAlert('Payment marked as completed!');
        loadPayments();
    }
}

async function deletePayment(pid) {
    if (!confirm('Delete this payment record?')) return;
    const res = await apiFetch(`/api/payments/${pid}`, { method: 'DELETE' });
    if (res.success) {
        showAlert('Payment deleted.');
        loadPayments();
    }
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('show');
}
