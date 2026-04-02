// ==========================================
// WORKOUTS — correct IDs matching workouts.html
// ==========================================
let allWorkouts    = [];
let workoutTrainers = [];
let workoutMembers  = [];

async function initWorkouts() {
    await loadWorkouts();
    document.getElementById('workout-form')?.addEventListener('submit', saveWorkout);
    document.getElementById('assign-form')?.addEventListener('submit', assignWorkout);
    document.getElementById('search-workout')?.addEventListener('input', renderWorkoutsTable);
}

async function loadWorkouts() {
    allWorkouts = await apiFetch('/api/workouts');
    renderWorkoutsTable();
}

function renderWorkoutsTable() {
    const tbody = document.querySelector('#workouts-table tbody');
    if (!tbody) return;
    const search = (document.getElementById('search-workout')?.value || '').toLowerCase();
    const filtered = allWorkouts.filter(w => !search || w.plan_name.toLowerCase().includes(search));

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#64748b;padding:24px;">No workout plans found</td></tr>';
        return;
    }
    tbody.innerHTML = filtered.map(w => `
        <tr>
            <td>${w.workout_plan_id}</td>
            <td>${w.plan_name}</td>
            <td>${w.duration_weeks} weeks</td>
            <td>${w.created_by || '-'}</td>
            <td>${formatDate(w.created_date)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="openEditWorkoutModal(${w.workout_plan_id})">Edit</button>
                <button class="btn btn-info btn-sm"    onclick="openAssignModal(${w.workout_plan_id})">Assign</button>
                <button class="btn btn-danger btn-sm"  onclick="deleteWorkout(${w.workout_plan_id})">Delete</button>
            </td>
        </tr>`).join('');
}

async function openAddWorkoutModal() {
    document.getElementById('workoutModal').classList.add('show');
    document.getElementById('workout-modal-title').textContent = 'Create New Workout Plan';
    document.getElementById('workout-form').reset();
    document.getElementById('workout-id').value = '';
    await populateTrainerDropdown(null);
}

async function openEditWorkoutModal(wid) {
    const w = allWorkouts.find(x => x.workout_plan_id === wid);
    if (!w) return;
    document.getElementById('workoutModal').classList.add('show');
    document.getElementById('workout-modal-title').textContent = 'Edit Workout Plan';
    document.getElementById('workout-id').value     = w.workout_plan_id;
    document.getElementById('plan-name').value      = w.plan_name;
    document.getElementById('duration-weeks').value = w.duration_weeks;
    await populateTrainerDropdown(w.created_by_trainer_id);
}

async function populateTrainerDropdown(selectedId) {
    if (workoutTrainers.length === 0) workoutTrainers = await apiFetch('/api/trainers');
    const sel = document.getElementById('workout-trainer-id');
    if (!sel) return;
    sel.innerHTML = '<option value="">Select Trainer</option>' +
        workoutTrainers.map(t =>
            `<option value="${t.trainer_id}" ${t.trainer_id == selectedId ? 'selected' : ''}>${t.fname} ${t.lname}</option>`
        ).join('');
}

async function saveWorkout(e) {
    e.preventDefault();
    const id = document.getElementById('workout-id').value;
    const data = {
        plan_name:      document.getElementById('plan-name').value,
        duration_weeks: document.getElementById('duration-weeks').value,
        trainer_id:     document.getElementById('workout-trainer-id').value || null
    };
    if (!data.plan_name || !data.duration_weeks) {
        showAlert('Plan name and duration are required', 'error'); return;
    }
    let res;
    if (id) {
        res = await apiFetch(`/api/workouts/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        if (res.success) showAlert('Workout plan updated!');
    } else {
        res = await apiFetch('/api/workouts', { method: 'POST', body: JSON.stringify(data) });
        if (res.success) showAlert('Workout plan created!');
    }
    closeWorkoutModal();
    loadWorkouts();
}

async function deleteWorkout(wid) {
    if (!confirm('Delete this workout plan?')) return;
    const res = await apiFetch(`/api/workouts/${wid}`, { method: 'DELETE' });
    if (res.success) { showAlert('Workout plan deleted.'); loadWorkouts(); }
}

async function openAssignModal(wid) {
    document.getElementById('assignModal').classList.add('show');
    document.getElementById('assign-plan-id').value = wid;
    const plan = allWorkouts.find(w => w.workout_plan_id === wid);
    document.getElementById('assign-plan-name').value = plan ? plan.plan_name : '';

    if (workoutMembers.length === 0) workoutMembers = await apiFetch('/api/members');
    document.getElementById('assign-member-id').innerHTML =
        '<option value="">Select Member</option>' +
        workoutMembers.map(m => `<option value="${m.member_id}">${m.fname} ${m.lname}</option>`).join('');
}

async function assignWorkout(e) {
    e.preventDefault();
    const data = {
        member_id:       document.getElementById('assign-member-id').value,
        workout_plan_id: document.getElementById('assign-plan-id').value
    };
    if (!data.member_id) { showAlert('Please select a member', 'error'); return; }
    const res = await apiFetch('/api/workouts/assign', { method: 'POST', body: JSON.stringify(data) });
    if (res.success) {
        showAlert('Workout plan assigned to member!');
        closeAssignModal();
    } else {
        showAlert(res.message || 'Assignment failed', 'error');
    }
}

function closeWorkoutModal() { document.getElementById('workoutModal').classList.remove('show'); }
function closeAssignModal()  { document.getElementById('assignModal').classList.remove('show'); }
