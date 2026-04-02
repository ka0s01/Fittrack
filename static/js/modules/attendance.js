// ==========================================
// ATTENDANCE — check-in, check-out, history, delete, filter
// ==========================================

let allHistory = [];   // full history cache for client-side filtering

async function initAttendance() {
    await loadActiveMembersDropdown();
    await loadTodayAttendanceTable();
    await loadAttendanceHistory();
}

// ── Dropdown ──────────────────────────────
async function loadActiveMembersDropdown() {
    const select = document.getElementById('member-select');
    if (!select) return;
    const members = await apiFetch('/api/attendance/active-members');
    if (!members || members.length === 0) {
        select.innerHTML = '<option value="">No active members found</option>';
        return;
    }
    select.innerHTML = '<option value="">Select a member...</option>' +
        members.map(m => `<option value="${m.member_id}">${m.fname} ${m.lname}</option>`).join('');
}

// ── Check-In ──────────────────────────────
async function checkInMember() {
    const memberId = document.getElementById('member-select').value;
    if (!memberId) { showAlert('Please select a member', 'error'); return; }

    const res = await apiFetch('/api/attendance/checkin', {
        method: 'POST',
        body: JSON.stringify({ member_id: memberId })
    });

    if (res.success) {
        showAlert('Member checked in successfully!');
        document.getElementById('member-select').value = '';
        await loadTodayAttendanceTable();
        await loadAttendanceHistory();
    } else {
        showAlert(res.message || 'Check-in failed', 'error');
    }
}

// ── Check-Out ─────────────────────────────
async function checkOutMember(attendanceId) {
    const res = await apiFetch(`/api/attendance/checkout/${attendanceId}`, { method: 'PUT' });
    if (res.success) {
        showAlert('Member checked out!');
        await loadTodayAttendanceTable();
        await loadAttendanceHistory();
    } else {
        showAlert('Checkout failed', 'error');
    }
}

// ── Delete ────────────────────────────────
async function deleteAttendance(attendanceId) {
    if (!confirm('Delete this attendance record?')) return;
    const res = await apiFetch(`/api/attendance/${attendanceId}`, { method: 'DELETE' });
    if (res.success) {
        showAlert('Record deleted.');
        await loadTodayAttendanceTable();
        await loadAttendanceHistory();
    }
}

// ── Today's Table ─────────────────────────
async function loadTodayAttendanceTable() {
    const tbody = document.querySelector('#today-attendance-table tbody');
    if (!tbody) return;

    const records = await apiFetch('/api/attendance/today');

    // Update count badge
    const countEl = document.getElementById('today-total');
    if (countEl) countEl.textContent = `${records.length} Members Checked In`;

    if (!records || records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#64748b;padding:24px;">No check-ins today</td></tr>';
        return;
    }

    tbody.innerHTML = records.map(r => {
        // MySQL returns TIME as "HH:MM:SS" — show just HH:MM
        const inTime  = r.check_in_time  ? r.check_in_time.slice(0,5)  : '-';
        const outTime = r.check_out_time ? r.check_out_time.slice(0,5) : null;
        const checkedOut = outTime !== null;

        return `
        <tr>
            <td>${r.member_id}</td>
            <td>${r.member_name}</td>
            <td>${inTime}</td>
            <td>${outTime || '-'}</td>
            <td>${r.duration != null ? r.duration + ' hrs' : '-'}</td>
            <td><span class="badge ${checkedOut ? 'badge-info' : 'badge-success'}">
                ${checkedOut ? 'Checked Out' : 'In Gym'}
            </span></td>
            <td>
                ${!checkedOut
                    ? `<button class="btn btn-warning btn-sm" onclick="checkOutMember(${r.attendance_id})">Check Out</button> `
                    : ''}
                <button class="btn btn-danger btn-sm" onclick="deleteAttendance(${r.attendance_id})">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

// ── History Table ─────────────────────────
async function loadAttendanceHistory() {
    const tbody = document.querySelector('#attendance-history-table tbody');
    if (!tbody) return;

    allHistory = await apiFetch('/api/attendance/all');
    renderHistoryTable(allHistory);
}

function renderHistoryTable(records) {
    const tbody = document.querySelector('#attendance-history-table tbody');
    if (!tbody) return;

    if (!records || records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#64748b;padding:24px;">No attendance records found</td></tr>';
        return;
    }

    tbody.innerHTML = records.map(r => {
        const inTime  = r.check_in_time  ? r.check_in_time.slice(0,5)  : '-';
        const outTime = r.check_out_time ? r.check_out_time.slice(0,5) : '-';
        return `
        <tr>
            <td>${formatDate(r.check_in_date)}</td>
            <td>${r.member_name}</td>
            <td>${inTime}</td>
            <td>${outTime}</td>
            <td>${r.duration != null ? r.duration + ' hrs' : '-'}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteAttendance(${r.attendance_id})">Delete</button></td>
        </tr>`;
    }).join('');
}

// ── Filter history client-side ────────────
function filterAttendanceHistory() {
    const dateFilter   = document.getElementById('filter-date')?.value || '';
    const searchTerm   = (document.getElementById('search-attendance')?.value || '').toLowerCase();

    const filtered = allHistory.filter(r => {
        const rDate = r.check_in_date ? r.check_in_date.split('T')[0] : '';
        const matchDate   = !dateFilter || rDate === dateFilter;
        const matchSearch = !searchTerm || r.member_name.toLowerCase().includes(searchTerm);
        return matchDate && matchSearch;
    });

    renderHistoryTable(filtered);
}
