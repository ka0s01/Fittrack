
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

export function initDashboard(){
    loadWorkouts();
}