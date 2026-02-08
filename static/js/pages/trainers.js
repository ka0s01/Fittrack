
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


export function initDashboard(){
    loadTrainers();
}