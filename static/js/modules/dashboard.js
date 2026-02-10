
function loadDashboardStats() {
    const totalMembers = dummyMembers.length;
    const activeMembers = dummyMembers.filter(m => m.membership_status === 'Active').length;
    const totalTrainers = dummyTrainers.length;
    const monthlyRevenue = dummyPayments
        .filter(p => p.status === 'Completed')
        .reduce((sum, p) => sum + p.amount, 0);
    
    document.getElementById('total-members').textContent = totalMembers;
    document.getElementById('active-members').textContent = activeMembers;
    document.getElementById('total-trainers').textContent = totalTrainers;
    document.getElementById('monthly-revenue').textContent = '₹' + monthlyRevenue.toLocaleString();
}

function loadTodayAttendance() {
    const tbody = document.querySelector('#attendance-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const today = dummyAttendance.filter(a => a.check_in_date === '2026-02-08');
    
    today.forEach(record => {
        const status = record.check_out_time ? 'Checked Out' : 'In Gym';
        const badgeClass = record.check_out_time ? 'badge-info' : 'badge-success';
        
        const row = `
            <tr>
                <td>${record.member_name}</td>
                <td>${record.check_in_time}</td>
                <td><span class="badge ${badgeClass}">${status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function loadUpcomingSessions() {
    const tbody = document.querySelector('#sessions-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const upcoming = dummySessions.filter(s => s.status === 'Scheduled');
    
    upcoming.forEach(session => {
        const row = `
            <tr>
                <td>${session.start_time}</td>
                <td>${session.member_name}</td>
                <td>${session.trainer_name}</td>
                <td>${session.session_type}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


export function initDashboard(){
    loadDashboardStats();
    loadTodayAttendance();
    loadUpcomingSessions();
}