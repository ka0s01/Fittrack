
function loadSessions() {
    const tbody = document.querySelector('#sessions-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    dummySessions.forEach(session => {
        const row = `
            <tr>
                <td>${session.session_id}</td>
                <td>${session.session_date}</td>
                <td>${session.start_time} - ${session.end_time}</td>
                <td>${session.member_name}</td>
                <td>${session.trainer_name}</td>
                <td>${session.session_type}</td>
                <td><span class="badge ${getStatusBadge(session.status)}">${session.status}</span></td>
                <td>
                    ${session.status === 'Scheduled' ? 
                        `<button class="btn btn-success btn-sm" onclick="updateSessionStatus(${session.session_id}, 'Completed')">Complete</button>
                         <button class="btn btn-danger btn-sm" onclick="updateSessionStatus(${session.session_id}, 'Cancelled')">Cancel</button>`
                        : '-'}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openBookSessionModal() {
    document.getElementById('sessionModal').classList.add('show');
    
    // Populate member dropdown
    const memberSelect = document.getElementById('member-id');
    memberSelect.innerHTML = '<option value="">Choose a member...</option>';
    dummyMembers.forEach(m => {
        memberSelect.innerHTML += `<option value="${m.member_id}">${m.fname} ${m.lname}</option>`;
    });
    
    // Populate trainer dropdown
    const trainerSelect = document.getElementById('trainer-id');
    trainerSelect.innerHTML = '<option value="">Choose a trainer...</option>';
    dummyTrainers.forEach(t => {
        trainerSelect.innerHTML += `<option value="${t.trainer_id}">${t.fname} ${t.lname} (${t.specialization})</option>`;
    });
}

function closeSessionModal() {
    document.getElementById('sessionModal').classList.remove('show');
}

function checkTrainerAvailability() {
    const message = document.getElementById('availability-message');
    const available = Math.random() > 0.3; // 70% chance available
    
    message.style.display = 'block';
    if (available) {
        message.className = 'alert alert-success';
        message.textContent = '✅ Trainer is available at this time';
    } else {
        message.className = 'alert alert-error';
        message.textContent = '❌ Trainer is busy at this time. Please choose another slot.';
    }
}

function updateSessionStatus(sessionId, newStatus) {
    const session = dummySessions.find(s => s.session_id === sessionId);
    if (session) {
        session.status = newStatus;
        loadSessions();
        alert(`Session marked as ${newStatus}!`);
    }
}

export function initDashboard(){
    loadSessions();
}