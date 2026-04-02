// ==========================================
// MEMBERS — role-aware (trainers = read only)
// ==========================================
let allMembers = [];

// Duration in months for each plan option
const PLAN_DURATIONS = { '1': 1, '3': 3, '6': 6, '12': 12 };

async function initMembers() {
    await loadMembers();
    document.getElementById('member-form')?.addEventListener('submit', saveMember);
    document.getElementById('search-member')?.addEventListener('input', renderMembersTable);
    document.getElementById('filter-status')?.addEventListener('change', renderMembersTable);
}

async function loadMembers() {
    allMembers = await apiFetch('/api/members');
    renderMembersTable();
}

function renderMembersTable() {
    const tbody = document.querySelector('#members-table tbody');
    if (!tbody) return;

    const search = (document.getElementById('search-member')?.value || '').toLowerCase();
    const status = document.getElementById('filter-status')?.value || '';
    const role   = (typeof USER_ROLE !== 'undefined') ? USER_ROLE : 'admin';

    const filtered = allMembers.filter(m => {
        const text = `${m.fname} ${m.lname} ${m.email} ${m.phone}`.toLowerCase();
        return (!search || text.includes(search)) && (!status || m.membership_status === status);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#64748b;padding:24px;">No members found</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(m => `
        <tr>
            <td>${m.fname} ${m.lname}</td>
            <td>${m.email}</td>
            <td>${m.phone}</td>
            <td><span class="badge ${getStatusBadge(m.membership_status)}">${m.membership_status}</span></td>
            <td>${m.membership_end_date ? formatDate(m.membership_end_date) : '-'}</td>
            <td>
                ${role === 'admin' ? `
                    <button class="btn btn-warning btn-sm" onclick="openEditMemberModal(${m.member_id})">Edit</button>
                    <button class="btn btn-danger btn-sm"  onclick="deleteMember(${m.member_id})">Delete</button>
                ` : '<span style="color:#64748b;font-size:0.85rem;">View only</span>'}
            </td>
        </tr>`).join('');
}

function openAddMemberModal() {
    document.getElementById('memberModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Add New Member';
    document.getElementById('member-form').reset();
    document.getElementById('member-id').value = '';
}

function openEditMemberModal(memberId) {
    const m = allMembers.find(x => x.member_id === memberId);
    if (!m) return;
    document.getElementById('memberModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Edit Member';
    document.getElementById('member-id').value  = m.member_id;
    document.getElementById('fname').value      = m.fname;
    document.getElementById('lname').value      = m.lname;
    document.getElementById('email').value      = m.email;
    document.getElementById('phone').value      = m.phone;
    document.getElementById('dob').value        = m.dob ? m.dob.split('T')[0] : '';
    document.getElementById('gender').value     = m.gender || '';
    document.getElementById('address').value    = m.address || '';
    document.getElementById('start-date').value = m.membership_start_date ? m.membership_start_date.split('T')[0] : '';

    // Try to infer duration from start/end dates
    if (m.membership_start_date && m.membership_end_date) {
        const start = new Date(m.membership_start_date);
        const end   = new Date(m.membership_end_date);
        const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30.44));
        const planSel = document.getElementById('membership-plan');
        const match = ['1','3','6','12'].find(v => parseInt(v) === months);
        if (planSel) planSel.value = match || '';
    }
}

async function saveMember(e) {
    e.preventDefault();
    const id        = document.getElementById('member-id').value;
    const months    = parseInt(document.getElementById('membership-plan').value);
    const startDate = document.getElementById('start-date').value;

    let endDate = '';
    if (months && startDate) {
        const end = new Date(startDate);
        end.setMonth(end.getMonth() + months);
        endDate = end.toISOString().split('T')[0];
    }

    const data = {
        fname:      document.getElementById('fname').value,
        lname:      document.getElementById('lname').value,
        email:      document.getElementById('email').value,
        phone:      document.getElementById('phone').value,
        dob:        document.getElementById('dob').value,
        gender:     document.getElementById('gender').value,
        address:    document.getElementById('address').value,
        plan_id:    null,   // no longer using membership_plan table
        start_date: startDate,
        end_date:   endDate
    };

    const res = id
        ? await apiFetch(`/api/members/${id}`, { method: 'PUT',  body: JSON.stringify(data) })
        : await apiFetch('/api/members',        { method: 'POST', body: JSON.stringify(data) });

    if (res.success) {
        showAlert(id ? 'Member updated!' : 'Member added!');
        closeModal();
        loadMembers();
    } else {
        showAlert(res.message || 'Failed to save member', 'error');
    }
}

async function deleteMember(memberId) {
    if (!confirm('Delete this member? This cannot be undone.')) return;
    const res = await apiFetch(`/api/members/${memberId}`, { method: 'DELETE' });
    if (res.success) { showAlert('Member deleted.'); loadMembers(); }
}

function closeModal() {
    document.getElementById('memberModal').classList.remove('show');
}
