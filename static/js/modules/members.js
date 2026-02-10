
function loadMembers() {
    const tbody = document.querySelector('#members-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    dummyMembers.forEach(member => {
        const row = `
            <tr>
                <td>${member.member_id}</td>
                <td>${member.fname} ${member.lname}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.plan_name}</td>
                <td><span class="badge ${getStatusBadge(member.membership_status)}">${member.membership_status}</span></td>
                <td>${member.membership_end_date}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditMemberModal(${member.member_id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMember(${member.member_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openAddMemberModal() {
    document.getElementById('memberModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Add New Member';
    document.getElementById('member-form').reset();
    document.getElementById('member-id').value = '';
}

function openEditMemberModal(memberId) {
    const member = dummyMembers.find(m => m.member_id === memberId);
    if (!member) return;
    
    document.getElementById('memberModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Edit Member';
    
    document.getElementById('member-id').value = member.member_id;
    document.getElementById('fname').value = member.fname;
    document.getElementById('lname').value = member.lname;
    document.getElementById('email').value = member.email;
    document.getElementById('phone').value = member.phone;
    document.getElementById('dob').value = member.dob;
    document.getElementById('gender').value = member.gender;
    document.getElementById('address').value = member.address;
    document.getElementById('start-date').value = member.membership_start_date;
}

function closeModal() {
    document.getElementById('memberModal').classList.remove('show');
}

function deleteMember(memberId) {
    if (confirm('Are you sure you want to delete this member?')) {
        const index = dummyMembers.findIndex(m => m.member_id === memberId);
        if (index > -1) {
            dummyMembers.splice(index, 1);
            loadMembers();
            alert('Member deleted successfully!');
        }
    }
}

function searchMembers() {
    const searchTerm = document.getElementById('search-member').value.toLowerCase();
    const rows = document.querySelectorAll('#members-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterMembersByStatus() {
    const status = document.getElementById('filter-status').value;
    const rows = document.querySelectorAll('#members-table tbody tr');
    
    rows.forEach(row => {
        if (!status) {
            row.style.display = '';
        } else {
            const statusCell = row.querySelector('.badge').textContent;
            row.style.display = statusCell === status ? '' : 'none';
        }
    });
}

export function initDashboard(){
    loadMembers();
}
