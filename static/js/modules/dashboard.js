// ==========================================
// DASHBOARD — API-driven
// ==========================================

async function loadDashboardStats() {
    const stats = await apiFetch('/api/dashboard/stats');
    document.getElementById('total-members').textContent  = stats.total_members;
    document.getElementById('active-members').textContent = stats.active_members;
    document.getElementById('total-trainers').textContent = stats.total_trainers;
    document.getElementById('monthly-revenue').textContent = '₹' + Number(stats.monthly_revenue).toLocaleString();
}

async function loadTodayAttendance() {
    const tbody = document.querySelector('#attendance-table tbody');
    if (!tbody) return;
    const records = await apiFetch('/api/dashboard/today-attendance');
    tbody.innerHTML = records.map(r => `
        <tr>
            <td>${r.fname} ${r.lname}</td>
            <td>${r.check_in_time}</td>
            <td><span class="badge ${r.check_out_time ? 'badge-info' : 'badge-success'}">
                ${r.check_out_time ? 'Checked Out' : 'In Gym'}
            </span></td>
        </tr>
    `).join('') || '<tr><td colspan="3" style="text-align:center;color:#64748b;">No check-ins today</td></tr>';
}

async function loadUpcomingSessions() {
    const tbody = document.querySelector('#sessions-table tbody');
    if (!tbody) return;
    const sessions = await apiFetch('/api/dashboard/upcoming-sessions');
    tbody.innerHTML = sessions.map(s => `
        <tr>
            <td>${s.start_time}</td>
            <td>${s.member_name}</td>
            <td>${s.trainer_name}</td>
            <td>${s.session_type}</td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center;color:#64748b;">No upcoming sessions</td></tr>';
}
