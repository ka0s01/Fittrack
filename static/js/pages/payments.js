function loadPayments() {
    const tbody = document.querySelector('#payments-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    dummyPayments.forEach(payment => {
        const row = `
            <tr>
                <td>${payment.payment_id}</td>
                <td>${payment.payment_date}</td>
                <td>${payment.member_name}</td>
                <td>₹${payment.amount.toLocaleString()}</td>
                <td>${payment.payment_type.replace('_', ' ')}</td>
                <td>${payment.payment_method.replace('_', ' ')}</td>
                <td><span class="badge ${getStatusBadge(payment.status)}">${payment.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="alert('View receipt feature coming soon!')">Receipt</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Update revenue stats
    const totalRevenue = dummyPayments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
    const pendingRevenue = dummyPayments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
    
    if (document.getElementById('total-revenue')) {
        document.getElementById('total-revenue').textContent = '₹' + totalRevenue.toLocaleString();
        document.getElementById('pending-payments').textContent = '₹' + pendingRevenue.toLocaleString();
        document.getElementById('monthly-revenue').textContent = '₹' + totalRevenue.toLocaleString();
    }
}

function openAddPaymentModal() {
    document.getElementById('paymentModal').classList.add('show');
    
    // Populate member dropdown
    const memberSelect = document.getElementById('member-id');
    memberSelect.innerHTML = '<option value="">Choose a member...</option>';
    dummyMembers.forEach(m => {
        memberSelect.innerHTML += `<option value="${m.member_id}">${m.fname} ${m.lname}</option>`;
    });
    
    // Set today's date
    document.getElementById('payment-date').valueAsDate = new Date();
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('show');
}

export function initDashboard(){
    loadPayments();
}