// ===== DUMMY DATA ARRAYS =====

const dummyMembers = [
    {
        member_id: 1,
        fname: "Arjun",
        lname: "Reddy",
        email: "arjun@email.com",
        phone: "9123456780",
        dob: "1995-05-15",
        gender: "Male",
        address: "Chennai",
        plan_name: "Premium",
        membership_status: "Active",
        membership_start_date: "2026-01-01",
        membership_end_date: "2026-04-01"
    },
    {
        member_id: 2,
        fname: "Sneha",
        lname: "Iyer",
        email: "sneha@email.com",
        phone: "9123456781",
        dob: "1998-08-22",
        gender: "Female",
        address: "Bangalore",
        plan_name: "Basic",
        membership_status: "Active",
        membership_start_date: "2026-01-05",
        membership_end_date: "2026-02-05"
    },
    {
        member_id: 3,
        fname: "Vikram",
        lname: "Singh",
        email: "vikram@email.com",
        phone: "9123456782",
        dob: "1992-11-30",
        gender: "Male",
        address: "Delhi",
        plan_name: "Platinum",
        membership_status: "Expired",
        membership_start_date: "2025-12-10",
        membership_end_date: "2026-01-10"
    },
    {
        member_id: 4,
        fname: "Priya",
        lname: "Nair",
        email: "priya@email.com",
        phone: "9123456783",
        dob: "1997-03-18",
        gender: "Female",
        address: "Mumbai",
        plan_name: "Annual",
        membership_status: "Active",
        membership_start_date: "2026-01-15",
        membership_end_date: "2027-01-15"
    },
    {
        member_id: 5,
        fname: "Rahul",
        lname: "Sharma",
        email: "rahul@email.com",
        phone: "9123456784",
        dob: "1994-07-25",
        gender: "Male",
        address: "Pune",
        plan_name: "Premium",
        membership_status: "Active",
        membership_start_date: "2026-02-01",
        membership_end_date: "2026-05-01"
    }
];

const dummyTrainers = [
    {
        trainer_id: 1,
        fname: "Rajesh",
        lname: "Kumar",
        email: "rajesh@fittrack.com",
        phone: "9876543210",
        specialization: "Strength",
        certification: "ACE Certified",
        experience: 5,
        hourly_rate: 500,
        hire_date: "2023-01-15"
    },
    {
        trainer_id: 2,
        fname: "Priya",
        lname: "Sharma",
        email: "priya@fittrack.com",
        phone: "9876543211",
        specialization: "Yoga",
        certification: "RYT 500",
        experience: 3,
        hourly_rate: 400,
        hire_date: "2023-03-20"
    },
    {
        trainer_id: 3,
        fname: "Amit",
        lname: "Patel",
        email: "amit@fittrack.com",
        phone: "9876543212",
        specialization: "CrossFit",
        certification: "CrossFit L2",
        experience: 7,
        hourly_rate: 600,
        hire_date: "2022-08-10"
    }
];

const dummySessions = [
    {
        session_id: 1,
        session_date: "2026-02-10",
        start_time: "07:00",
        end_time: "08:00",
        member_name: "Arjun Reddy",
        trainer_name: "Rajesh Kumar",
        session_type: "Personal Training",
        status: "Scheduled"
    },
    {
        session_id: 2,
        session_date: "2026-02-10",
        start_time: "09:00",
        end_time: "10:00",
        member_name: "Sneha Iyer",
        trainer_name: "Priya Sharma",
        session_type: "Yoga",
        status: "Scheduled"
    },
    {
        session_id: 3,
        session_date: "2026-02-08",
        start_time: "06:00",
        end_time: "07:00",
        member_name: "Vikram Singh",
        trainer_name: "Amit Patel",
        session_type: "CrossFit",
        status: "Completed"
    }
];

let dummyAttendance = [
    {
        attendance_id: 1,
        member_id: 1,
        member_name: "Arjun Reddy",
        check_in_date: "2026-02-08",
        check_in_time: "06:30",
        check_out_time: "08:00",
        duration: 1.5
    },
    {
        attendance_id: 2,
        member_id: 2,
        member_name: "Sneha Iyer",
        check_in_date: "2026-02-08",
        check_in_time: "07:00",
        check_out_time: null,
        duration: null
    }
];

const dummyWorkouts = [
    {
        workout_plan_id: 1,
        plan_name: "Beginner Full Body",
        difficulty: "Beginner",
        duration: 4,
        created_by: "Rajesh Kumar",
        created_date: "2026-01-15"
    },
    {
        workout_plan_id: 2,
        plan_name: "Advanced Strength",
        difficulty: "Advanced",
        duration: 8,
        created_by: "Amit Patel",
        created_date: "2026-01-20"
    }
];

const dummyEquipment = [
    {
        equipment_id: 1,
        equipment_name: "Treadmill",
        equipment_type: "Cardio",
        purchase_date: "2023-01-01",
        purchase_cost: 50000,
        status: "Operational",
        last_maintenance: "2026-01-01"
    },
    {
        equipment_id: 2,
        equipment_name: "Dumbbells Set",
        equipment_type: "Strength",
        purchase_date: "2023-01-01",
        purchase_cost: 15000,
        status: "Operational",
        last_maintenance: "2025-12-15"
    },
    {
        equipment_id: 3,
        equipment_name: "Rowing Machine",
        equipment_type: "Cardio",
        purchase_date: "2023-06-15",
        purchase_cost: 35000,
        status: "Under_Maintenance",
        last_maintenance: "2026-02-01"
    }
];

const dummyPayments = [
    {
        payment_id: 1,
        payment_date: "2026-01-01",
        member_name: "Arjun Reddy",
        amount: 2500,
        payment_type: "Membership_Fee",
        payment_method: "UPI",
        status: "Completed"
    },
    {
        payment_id: 2,
        payment_date: "2026-01-05",
        member_name: "Sneha Iyer",
        amount: 1000,
        payment_type: "Membership_Fee",
        payment_method: "Card",
        status: "Completed"
    },
    {
        payment_id: 3,
        payment_date: "2026-02-01",
        member_name: "Rahul Sharma",
        amount: 2500,
        payment_type: "Membership_Fee",
        payment_method: "Cash",
        status: "Pending"
    }
];

const membershipPlans = [
    { plan_id: 1, plan_name: "Basic - ₹1000/month" },
    { plan_id: 2, plan_name: "Premium - ₹2500/3months" },
    { plan_id: 3, plan_name: "Platinum - ₹4500/6months" },
    { plan_id: 4, plan_name: "Annual - ₹8000/year" }
];

// ===== UTILITY FUNCTIONS =====

function getStatusBadge(status) {
    const badges = {
        'Active': 'badge-success',
        'Expired': 'badge-danger',
        'Suspended': 'badge-warning',
        'Completed': 'badge-success',
        'Scheduled': 'badge-info',
        'Cancelled': 'badge-danger',
        'Operational': 'badge-success',
        'Under_Maintenance': 'badge-warning',
        'Out_of_Service': 'badge-danger',
        'Pending': 'badge-warning'
    };
    return badges[status] || 'badge-info';
}

// ==========================================
// DASHBOARD PAGE FUNCTIONS
// ==========================================

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

// ==========================================
// MEMBERS PAGE FUNCTIONS
// ==========================================

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

// ==========================================
// TRAINERS PAGE FUNCTIONS
// ==========================================

function loadTrainers() {
    const tbody = document.querySelector('#trainers-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    dummyTrainers.forEach(trainer => {
        const row = `
            <tr>
                <td>${trainer.trainer_id}</td>
                <td>${trainer.fname} ${trainer.lname}</td>
                <td>${trainer.email}</td>
                <td>${trainer.phone}</td>
                <td><span class="badge badge-info">${trainer.specialization}</span></td>
                <td>${trainer.experience} years</td>
                <td>₹${trainer.hourly_rate}/hr</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditTrainerModal(${trainer.trainer_id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTrainer(${trainer.trainer_id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openAddTrainerModal() {
    document.getElementById('trainerModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Add New Trainer';
    document.getElementById('trainer-form').reset();
}

function openEditTrainerModal(trainerId) {
    const trainer = dummyTrainers.find(t => t.trainer_id === trainerId);
    if (!trainer) return;
    
    document.getElementById('trainerModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Edit Trainer';
    
    document.getElementById('trainer-id').value = trainer.trainer_id;
    document.getElementById('fname').value = trainer.fname;
    document.getElementById('lname').value = trainer.lname;
    document.getElementById('email').value = trainer.email;
    document.getElementById('phone').value = trainer.phone;
    document.getElementById('specialization').value = trainer.specialization;
    document.getElementById('certification').value = trainer.certification;
    document.getElementById('experience').value = trainer.experience;
    document.getElementById('hourly-rate').value = trainer.hourly_rate;
}

function closeTrainerModal() {
    document.getElementById('trainerModal').classList.remove('show');
}

function deleteTrainer(trainerId) {
    if (confirm('Are you sure you want to delete this trainer?')) {
        const index = dummyTrainers.findIndex(t => t.trainer_id === trainerId);
        if (index > -1) {
            dummyTrainers.splice(index, 1);
            loadTrainers();
            alert('Trainer deleted successfully!');
        }
    }
}

// ==========================================
// ATTENDANCE PAGE FUNCTIONS
// ==========================================

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

// ==========================================
// SESSIONS PAGE FUNCTIONS
// ==========================================   

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

function filterSessions() {
    // Get filter values
    const dateFilter = document.getElementById('filter-date').value;
    const statusFilter = document.getElementById('filter-status').value;
    
    // Get all session rows
    const rows = document.querySelectorAll('#sessions-table tbody tr');
    
    rows.forEach(row => {
        // Get session data from row
        const sessionDate = row.cells[1].textContent; // Date is in 2nd column
        const sessionStatus = row.querySelector('.badge').textContent; // Status badge
        
        // Check if row matches filters
        let showRow = true;
        
        // Date filter check
        if (dateFilter && sessionDate !== dateFilter) {
            showRow = false;
        }
        
        // Status filter check
        if (statusFilter && sessionStatus !== statusFilter) {
            showRow = false;
        }
        
        // Show or hide row
        row.style.display = showRow ? '' : 'none';
    });
}

// Attach event listeners to filter controls
const sessionDateFilter = document.getElementById('filter-date');
const sessionStatusFilter = document.getElementById('filter-status');

if (sessionDateFilter) {
    sessionDateFilter.addEventListener('change', filterSessions);
}

if (sessionStatusFilter) {
    sessionStatusFilter.addEventListener('change', filterSessions);
}

// ==========================================
// WORKOUTS PAGE FUNCTIONS
// ==========================================

function loadWorkouts() {
    const tbody = document.querySelector('#workouts-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    dummyWorkouts.forEach(workout => {
        const row = `
            <tr>
                <td>${workout.workout_plan_id}</td>
                <td>${workout.plan_name}</td>
                <td><span class="badge badge-info">${workout.difficulty}</span></td>
                <td>${workout.duration} weeks</td>
                <td>${workout.created_by}</td>
                <td>${workout.created_date}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="alert('Edit feature coming soon!')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="alert('Delete feature coming soon!')">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openAddWorkoutModal() {
    document.getElementById('workoutModal').classList.add('show');
    
    // Populate trainer dropdown
    const trainerSelect = document.getElementById('trainer-id');
    trainerSelect.innerHTML = '<option value="">Select Trainer</option>';
    dummyTrainers.forEach(t => {
        trainerSelect.innerHTML += `<option value="${t.trainer_id}">${t.fname} ${t.lname}</option>`;
    });
}

function closeWorkoutModal() {
    document.getElementById('workoutModal').classList.remove('show');
}

// ==========================================
// WORKOUT PLANS - SEARCH
// ==========================================

function searchWorkouts() {
    // Get search term
    const searchTerm = document.getElementById('search-workout').value.toLowerCase();
    
    // Get all workout plan rows
    const rows = document.querySelectorAll('#workouts-table tbody tr');
    
    rows.forEach(row => {
        // Get all text content from the row
        const text = row.textContent.toLowerCase();
        
        // Check if row contains search term
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Attach to search input
const workoutSearch = document.getElementById('search-workout');
if (workoutSearch) {
    workoutSearch.addEventListener('input', searchWorkouts);
}

// ==========================================
// WORKOUT PLANS - FILTER BY DIFFICULTY
// ==========================================

function filterWorkoutsByDifficulty() {
    // Get selected difficulty
    const difficulty = document.getElementById('filter-difficulty').value;
    
    // Get all workout rows
    const rows = document.querySelectorAll('#workouts-table tbody tr');
    
    rows.forEach(row => {
        if (!difficulty) {
            // If "All Difficulty Levels" selected, show everything
            row.style.display = '';
        } else {
            // Get the difficulty badge text from row
            const rowDifficulty = row.querySelector('.badge').textContent;
            
            // Show row only if difficulty matches
            row.style.display = rowDifficulty === difficulty ? '' : 'none';
        }
    });
}

// Attach to difficulty dropdown
const difficultyFilter = document.getElementById('filter-difficulty');
if (difficultyFilter) {
    difficultyFilter.addEventListener('change', filterWorkoutsByDifficulty);
}


// ==========================================
// WORKOUT PLANS - SORTING
// ==========================================

let workoutSortDirection = {}; // Track sort direction for each column

function sortWorkoutTable(columnIndex) {
    const table = document.querySelector('#workouts-table tbody');
    const rows = Array.from(table.querySelectorAll('tr'));
    
    // Initialize sort direction for this column if not set
    if (!workoutSortDirection[columnIndex]) {
        workoutSortDirection[columnIndex] = 1; // 1 = ascending
    }
    
    // Sort rows based on column content
    rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent.trim();
        let bValue = b.cells[columnIndex].textContent.trim();
        
        // Handle numeric values (for columns like duration)
        if (columnIndex === 3) { // Duration column
            aValue = parseInt(aValue);
            bValue = parseInt(bValue);
        }
        
        // Compare values
        if (aValue < bValue) return -1 * workoutSortDirection[columnIndex];
        if (aValue > bValue) return 1 * workoutSortDirection[columnIndex];
        return 0;
    });
    
    // Toggle direction for next click
    workoutSortDirection[columnIndex] *= -1;
    
    // Remove all rows and re-append in sorted order
    rows.forEach(row => table.appendChild(row));
    
    // Update header to show sort direction
    updateSortIndicators(columnIndex);
}

function updateSortIndicators(activeColumn) {
    // Remove all existing sort indicators
    const headers = document.querySelectorAll('#workouts-table th');
    headers.forEach((header, index) => {
        // Remove any existing arrows
        header.textContent = header.textContent.replace(' ↑', '').replace(' ↓', '');
        
        // Add arrow to active column
        if (index === activeColumn) {
            const arrow = workoutSortDirection[activeColumn] === 1 ? ' ↓' : ' ↑';
            header.textContent += arrow;
        }
    });
}
// ==========================================
// EQUIPMENT PAGE FUNCTIONS
// ==========================================

function loadEquipment() {
    const tbody = document.querySelector('#equipment-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    dummyEquipment.forEach(equip => {
        const row = `
            <tr>
                <td>${equip.equipment_id}</td>
                <td>${equip.equipment_name}</td>
                <td>${equip.equipment_type}</td>
                <td>${equip.purchase_date}</td>
                <td>₹${equip.purchase_cost.toLocaleString()}</td>
                <td><span class="badge ${getStatusBadge(equip.status)}">${equip.status.replace('_', ' ')}</span></td>
                <td>${equip.last_maintenance}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="alert('Edit feature coming soon!')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="alert('Delete feature coming soon!')">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openAddEquipmentModal() {
    document.getElementById('equipmentModal').classList.add('show');
}

function closeEquipmentModal() {
    document.getElementById('equipmentModal').classList.remove('show');
}

// ==========================================
// EQUIPMENT - ADD NEW EQUIPMENT
// ==========================================

function saveEquipment(event) {
    event.preventDefault(); // Prevent form reload
    
    // Get form values
    const newEquipment = {
        equipment_id: dummyEquipment.length + 1,
        equipment_name: document.getElementById('equipment-name').value,
        equipment_type: document.getElementById('equipment-type').value,
        purchase_date: document.getElementById('purchase-date').value,
        purchase_cost: parseFloat(document.getElementById('purchase-cost').value),
        status: document.getElementById('status').value,
        last_maintenance: document.getElementById('last-maintenance').value || 'N/A'
    };
    
    // Validate required fields
    if (!newEquipment.equipment_name || !newEquipment.equipment_type || 
        !newEquipment.purchase_date || !newEquipment.purchase_cost || 
        !newEquipment.status) {
        alert('Please fill all required fields!');
        return;
    }
    
    // Add to dummy array
    dummyEquipment.push(newEquipment);
    
    // Close modal
    closeEquipmentModal();
    
    // Refresh table
    loadEquipment();
    
    // Show success message
    alert('Equipment added successfully!');
    // document.getElementById('equipment-name').reset();
    // document.getElementById('equipment-type').
    // document.getElementById('purchase-date').value,
    // document.getElementById('purchase-cost')
    // document.getElementById('status').value,
    // document.getElementById('last-maintenance').value

    document.getElementById("equipment-form").reset();

}

// Update the equipment form handler
const equipmentFormEl = document.getElementById('equipment-form');
if (equipmentFormEl) {
    equipmentFormEl.addEventListener('submit', saveEquipment);
}

// ==========================================
// PAYMENTS PAGE FUNCTIONS
// ==========================================

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
// ==========================================
// PAYMENTS - FILTERING
// ==========================================

function filterPayments() {
    // Get filter values
    const searchTerm = document.getElementById('search-payment').value.toLowerCase();
    const typeFilter = document.getElementById('filter-type').value;
    const statusFilter = document.getElementById('filter-status').value;
    
    // Get all payment rows
    const rows = document.querySelectorAll('#payments-table tbody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Search filter (member name)
        if (searchTerm) {
            const memberName = row.cells[2].textContent.toLowerCase(); // Member name in 3rd column
            if (!memberName.includes(searchTerm)) {
                showRow = false;
            }
        }
        
        // Payment type filter
        if (typeFilter) {
            const paymentType = row.cells[4].textContent; // Payment type in 5th column
            if (!paymentType.includes(typeFilter.replace('_', ' '))) {
                showRow = false;
            }
        }
        
        // Status filter
        if (statusFilter) {
            const paymentStatus = row.querySelector('.badge').textContent; // Status badge
            if (paymentStatus !== statusFilter) {
                showRow = false;
            }
        }
        
        // Show or hide row
        row.style.display = showRow ? '' : 'none';
    });
    
    // Update visible count
    updatePaymentStats();
}

function updatePaymentStats() {
    // Count visible rows
    const visibleRows = document.querySelectorAll('#payments-table tbody tr:not([style*="display: none"])');
    const visiblePayments = Array.from(visibleRows);
    
    // Calculate totals for visible payments only
    let visibleTotal = 0;
    let visiblePending = 0;
    
    visiblePayments.forEach(row => {
        const amount = parseFloat(row.cells[3].textContent.replace('₹', '').replace(',', ''));
        const status = row.querySelector('.badge').textContent;
        
        if (status === 'Completed') {
            visibleTotal += amount;
        } else if (status === 'Pending') {
            visiblePending += amount;
        }
    });
    
    // Update stats if on payments page
    if (document.getElementById('total-revenue')) {
        document.getElementById('total-revenue').textContent = '₹' + visibleTotal.toLocaleString();
        document.getElementById('pending-payments').textContent = '₹' + visiblePending.toLocaleString();
    }
}

// Attach event listeners to all payment filters
const paymentSearch = document.getElementById('search-payment');
const paymentTypeFilter = document.getElementById('filter-type');
const paymentStatusFilter = document.getElementById('filter-status');

if (paymentSearch) {
    paymentSearch.addEventListener('input', filterPayments);
}

if (paymentTypeFilter) {
    paymentTypeFilter.addEventListener('change', filterPayments);
}

if (paymentStatusFilter) {
    paymentStatusFilter.addEventListener('change', filterPayments);
}


// ==========================================
// FORM SUBMISSION HANDLERS
// ==========================================

// Member Form
const memberForm = document.getElementById('member-form');
if (memberForm) {
    memberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const memberId = document.getElementById('member-id').value;
        
        if (memberId) {
            // Update existing member
            alert('Member updated successfully!');
        } else {
            // Add new member
            const newMember = {
                member_id: dummyMembers.length + 1,
                fname: document.getElementById('fname').value,
                lname: document.getElementById('lname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                address: document.getElementById('address').value,
                plan_name: 'Basic',
                membership_status: 'Active',
                membership_start_date: document.getElementById('start-date').value,
                membership_end_date: '2026-12-31'
            };
            
            dummyMembers.push(newMember);
            alert('Member added successfully!');
        }
        
        closeModal();
        loadMembers();
    });
}

// Trainer Form
const trainerForm = document.getElementById('trainer-form');
if (trainerForm) {
    trainerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Trainer saved successfully!');
        closeTrainerModal();
    });
}

// Session Form
const sessionForm = document.getElementById('session-form');
if (sessionForm) {
    sessionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Session booked successfully!');
        closeSessionModal();
    });
}

// Workout Form
const workoutForm = document.getElementById('workout-form');
if (workoutForm) {
    workoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Workout plan saved successfully!');
        closeWorkoutModal();
    });
}

// Equipment Form
const equipmentForm = document.getElementById('equipment-form');
if (equipmentForm) {
    equipmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Equipment saved successfully!');
        closeEquipmentModal();
    });
}

// Payment Form
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Payment recorded successfully!');
        closePaymentModal();
    });
}

// ==========================================
// EVENT LISTENERS FOR SEARCH/FILTER
// ==========================================

// Members search
const memberSearch = document.getElementById('search-member');
if (memberSearch) {
    memberSearch.addEventListener('input', searchMembers);
}

// Members filter
const memberFilter = document.getElementById('filter-status');
if (memberFilter) {
    memberFilter.addEventListener('change', filterMembersByStatus);
}


//============================
//Page intialisation functions
//=============================



document.addEventListener('DOMContentLoaded', function() {
const currentPath = window.location.pathname;
    // Dashboard
    if (currentPath.includes('dashboard') || currentPath === '/') {
        loadDashboardStats();
        loadTodayAttendance();
        loadUpcomingSessions();
    }

    // Members
    if (currentPath.includes('members')) {
        loadMembers();
    }

    // Trainers
    if (currentPath.includes('trainers')) {
        loadTrainers();
    }

    // Sessions
    if (currentPath.includes('sessions')) {
        loadSessions();
    }

    // Attendance
    if (currentPath.includes('attendance')) {
        loadActiveMembersDropdown();
        loadTodayAttendanceTable();
    }

    // Workouts
    if (currentPath.includes('workouts')) {
        loadWorkouts();
    }

    // Equipment
    if (currentPath.includes('equipment')) {
        loadEquipment();
    }

    // Payments
    if (currentPath.includes('payments')) {
        loadPayments();
    }
});