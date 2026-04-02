// ==========================================
// SESSIONS — role-aware, full CRUD
// ==========================================
let allSessions = [];

async function initSessions() {
    await loadSessions();
    document.getElementById('session-form')?.addEventListener('submit', saveSession);
    document.getElementById('filter-date')?.addEventListener('change', renderSessionsTable);
    document.getElementById('filter-status')?.addEventListener('change', renderSessionsTable);
}

async function loadSessions() {
    allSessions = await apiFetch('/api/sessions');
    renderSessionsTable();
}

function renderSessionsTable() {
    const tbody = document.querySelector('#sessions-table tbody');
    if (!tbody) return;

    const dateFilter   = document.getElementById('filter-date')?.value   || '';
    const statusFilter = document.getElementById('filter-status')?.value || '';

    const filtered = allSessions.filter(s => {
        const sDate = s.session_date ? s.session_date.split('T')[0] : s.session_date;
        const matchDate   = !dateFilter   || sDate === dateFilter;
        const matchStatus = !statusFilter || s.status === statusFilter;
        return matchDate && matchStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#64748b;padding:24px;">No sessions found</td></tr>';
        return;
    }

    // Determine role — USER_ROLE is injected by the template
    const role = (typeof USER_ROLE !== 'undefined') ? USER_ROLE : 'admin';

    tbody.innerHTML = filtered.map(s => {
        // Action buttons depend on role
        let actions = '';
        if (s.status === 'Scheduled') {
            // Both admin and trainer can complete/cancel their sessions
            actions += `<button class="btn btn-success btn-sm" onclick="updateSessionStatus(${s.session_id},'Completed')">Complete</button> `;
            actions += `<button class="btn btn-danger btn-sm"  onclick="updateSessionStatus(${s.session_id},'Cancelled')">Cancel</button> `;
        }
        // Only admin can delete
        if (role === 'admin') {
            actions += `<button class="btn btn-danger btn-sm" onclick="deleteSession(${s.session_id})">Delete</button>`;
        }
        if (!actions) actions = '-';

        return `
        <tr>
            <td>${s.session_id}</td>
            <td>${formatDate(s.session_date)}</td>
            <td>${s.start_time} - ${s.end_time}</td>
            <td>${s.member_name}</td>
            <td>${s.trainer_name}</td>
            <td>${s.session_type}</td>
            <td><span class="badge ${getStatusBadge(s.status)}">${s.status}</span></td>
            <td>${actions}</td>
        </tr>`;
    }).join('');
}

async function openBookSessionModal() {
    document.getElementById('sessionModal').classList.add('show');
    document.getElementById('session-form').reset();

    const [members, trainers] = await Promise.all([
        apiFetch('/api/members'),
        apiFetch('/api/trainers')
    ]);

    document.getElementById('member-id').innerHTML =
        '<option value="">Choose a member...</option>' +
        members.map(m => `<option value="${m.member_id}">${m.fname} ${m.lname}</option>`).join('');

    document.getElementById('trainer-id').innerHTML =
        '<option value="">Choose a trainer...</option>' +
        trainers.map(t => `<option value="${t.trainer_id}">${t.fname} ${t.lname} (${t.specialization || ''})</option>`).join('');
}

async function saveSession(e) {
    e.preventDefault();
    const data = {
        member_id:    document.getElementById('member-id').value,
        trainer_id:   document.getElementById('trainer-id').value,
        session_date: document.getElementById('session-date').value,
        start_time:   document.getElementById('start-time').value,
        end_time:     document.getElementById('end-time').value,
        session_type: document.getElementById('session-type').value
    };
    if (!data.member_id || !data.trainer_id || !data.session_date || !data.start_time || !data.end_time) {
        showAlert('Please fill all required fields', 'error'); return;
    }
    const res = await apiFetch('/api/sessions', { method: 'POST', body: JSON.stringify(data) });
    if (res.success) {
        showAlert('Session booked successfully!');
        closeSessionModal();
        loadSessions();
    } else {
        showAlert(res.message || 'Failed to book session', 'error');
    }
}

async function updateSessionStatus(sessionId, status) {
    const res = await apiFetch(`/api/sessions/${sessionId}/status`, {
        method: 'PUT', body: JSON.stringify({ status })
    });
    if (res.success) { showAlert(`Session marked as ${status}!`); loadSessions(); }
}

async function deleteSession(sessionId) {
    if (!confirm('Delete this session?')) return;
    const res = await apiFetch(`/api/sessions/${sessionId}`, { method: 'DELETE' });
    if (res.success) { showAlert('Session deleted.'); loadSessions(); }
}

function closeSessionModal() {
    document.getElementById('sessionModal').classList.remove('show');
}
