
function loadActiveMembersDropdown() {
    const select = document.getElementById('member-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select a member...</option>';
    
    dummyMembers
        .filter(m => m.membership_status === 'Active')
        .forEach(member => {
            const option = `<option value="${member.member_id}">${member.fname} ${member.lname}</option>`;
            select.innerHTML += option;
        });
}

function checkInMember() {
    const memberId = parseInt(document.getElementById('member-select').value);
    if (!memberId) {
        alert('Please select a member');
        return;
    }
    
    const member = dummyMembers.find(m => m.member_id === memberId);
    const now = new Date();
    
    const newAttendance = {
        attendance_id: dummyAttendance.length + 1,
        member_id: memberId,
        member_name: `${member.fname} ${member.lname}`,
        check_in_date: '2026-02-08',
        check_in_time: now.toTimeString().slice(0, 5),
        check_out_time: null,
        duration: null
    };
    
    dummyAttendance.push(newAttendance);
    
    document.getElementById('member-select').value = '';
    loadTodayAttendanceTable();
    alert('Member checked in successfully!');
}

function checkOutMember(attendanceId) {
    const record = dummyAttendance.find(a => a.attendance_id === attendanceId);
    if (record) {
        const now = new Date();
        record.check_out_time = now.toTimeString().slice(0, 5);
        
        const checkIn = new Date(`2026-02-08 ${record.check_in_time}`);
        const checkOut = new Date(`2026-02-08 ${record.check_out_time}`);
        record.duration = ((checkOut - checkIn) / (1000 * 60 * 60)).toFixed(1);
        
        loadTodayAttendanceTable();
    }
}

function loadTodayAttendanceTable() {
    const tbody = document.querySelector('#today-attendance-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const today = dummyAttendance.filter(a => a.check_in_date === '2026-02-08');
    
    document.getElementById('today-total').textContent = `${today.length} Members Checked In`;
    
    today.forEach(record => {
        const status = record.check_out_time ? 'Checked Out' : 'In Gym';
        const badgeClass = record.check_out_time ? 'badge-info' : 'badge-success';
        
        const row = `
            <tr>
                <td>${record.member_id}</td>
                <td>${record.member_name}</td>
                <td>${record.check_in_time}</td>
                <td>${record.check_out_time || '-'}</td>
                <td>${record.duration ? record.duration + ' hrs' : '-'}</td>
                <td><span class="badge ${badgeClass}">${status}</span></td>
                <td>
                    ${!record.check_out_time ? 
                        `<button class="btn btn-warning btn-sm" onclick="checkOutMember(${record.attendance_id})">Check Out</button>` 
                        : '-'}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

export function initDashboard(){
    loadActiveMembersDropdown();
    loadTodayAttendanceTable();
}