// ==========================================
// TRAINERS — API-driven
// ==========================================

let allTrainers = [];

async function initTrainers() {
    await loadTrainers();
    document.getElementById('trainer-form').addEventListener('submit', saveTrainer);
}

async function loadTrainers() {
    allTrainers = await apiFetch('/api/trainers');
    renderTrainersTable();
}

function renderTrainersTable() {
    const tbody = document.querySelector('#trainers-table tbody');
    if (!tbody) return;

    tbody.innerHTML = allTrainers.map(t => `
        <tr>
            <td>${t.fname} ${t.lname}</td>
            <td>${t.email}</td>
            <td>${t.phone}</td>
            <td><span class="badge badge-info">${t.specialization || '-'}</span></td>
            <td>${t.experience || 0} yrs</td>
            <td>₹${t.hourly_rate || 0}/hr</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="openEditTrainerModal(${t.trainer_id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTrainer(${t.trainer_id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function openAddTrainerModal() {
    document.getElementById('trainerModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Add New Trainer';
    document.getElementById('trainer-form').reset();
    document.getElementById('trainer-id').value = '';
}

function openEditTrainerModal(trainerId) {
    const t = allTrainers.find(x => x.trainer_id === trainerId);
    if (!t) return;
    document.getElementById('trainerModal').classList.add('show');
    document.getElementById('modal-title').textContent = 'Edit Trainer';
    document.getElementById('trainer-id').value = t.trainer_id;
    document.getElementById('fname').value = t.fname;
    document.getElementById('lname').value = t.lname;
    document.getElementById('email').value = t.email;
    document.getElementById('phone').value = t.phone;
    document.getElementById('specialization').value = t.specialization || '';
    document.getElementById('certification').value = t.certification || '';
    document.getElementById('experience').value = t.experience || '';
    document.getElementById('hourly-rate').value = t.hourly_rate || '';
}

async function saveTrainer(e) {
    e.preventDefault();
    const id = document.getElementById('trainer-id').value;
    const data = {
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        specialization: document.getElementById('specialization').value,
        certification: document.getElementById('certification').value,
        experience: document.getElementById('experience').value,
        hourly_rate: document.getElementById('hourly-rate').value,
        hire_date: new Date().toISOString().split('T')[0]
    };

    if (id) {
        await apiFetch(`/api/trainers/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        showAlert('Trainer updated successfully!');
    } else {
        await apiFetch('/api/trainers', { method: 'POST', body: JSON.stringify(data) });
        showAlert('Trainer added successfully!');
    }
    closeTrainerModal();
    loadTrainers();
}

async function deleteTrainer(trainerId) {
    if (!confirm('Delete this trainer?')) return;
    await apiFetch(`/api/trainers/${trainerId}`, { method: 'DELETE' });
    showAlert('Trainer deleted.');
    loadTrainers();
}

function closeTrainerModal() {
    document.getElementById('trainerModal').classList.remove('show');
}
