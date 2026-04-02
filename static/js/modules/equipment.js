// ==========================================
// EQUIPMENT — full CRUD + delete
// ==========================================
let allEquipment = [];

async function initEquipment() {
    await loadEquipment();
    document.getElementById('equipment-form')?.addEventListener('submit', saveEquipment);
}

async function loadEquipment() {
    allEquipment = await apiFetch('/api/equipment');
    renderEquipmentTable();
}

function renderEquipmentTable() {
    const tbody = document.querySelector('#equipment-table tbody');
    if (!tbody) return;

    if (allEquipment.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#64748b;padding:24px;">No equipment found</td></tr>';
        return;
    }

    tbody.innerHTML = allEquipment.map(eq => `
        <tr>
            <td>${eq.equipment_id}</td>
            <td>${eq.equipment_name}</td>
            <td>${eq.equipment_type || '-'}</td>
            <td>${eq.purchase_date ? formatDate(eq.purchase_date) : '-'}</td>
            <td>${eq.purchase_cost ? '₹' + Number(eq.purchase_cost).toLocaleString() : '-'}</td>
            <td><span class="badge ${getStatusBadge(eq.status)}">${eq.status.replace(/_/g, ' ')}</span></td>
            <td>${eq.last_maintenance_date ? formatDate(eq.last_maintenance_date) : '-'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="openEditEquipmentModal(${eq.equipment_id})">Edit</button>
                <button class="btn btn-danger btn-sm"  onclick="deleteEquipment(${eq.equipment_id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function openAddEquipmentModal() {
    document.getElementById('equipmentModal').classList.add('show');
    document.getElementById('equipment-modal-title').textContent = 'Add Equipment';
    document.getElementById('equipment-form').reset();
    document.getElementById('equipment-id').value = '';
}

function openEditEquipmentModal(id) {
    const eq = allEquipment.find(e => e.equipment_id === id);
    if (!eq) return;
    document.getElementById('equipmentModal').classList.add('show');
    document.getElementById('equipment-modal-title').textContent = 'Edit Equipment';
    document.getElementById('equipment-id').value        = eq.equipment_id;
    document.getElementById('equipment-name').value      = eq.equipment_name;
    document.getElementById('equipment-type').value      = eq.equipment_type || '';
    document.getElementById('purchase-date').value       = eq.purchase_date ? eq.purchase_date.split('T')[0] : '';
    document.getElementById('purchase-cost').value       = eq.purchase_cost || '';
    document.getElementById('status').value              = eq.status;
    document.getElementById('last-maintenance').value    = eq.last_maintenance_date ? eq.last_maintenance_date.split('T')[0] : '';
    // next_maintenance optional
    const nextEl = document.getElementById('next-maintenance');
    if (nextEl) nextEl.value = eq.next_maintenance_date ? eq.next_maintenance_date.split('T')[0] : '';
}

async function saveEquipment(e) {
    e.preventDefault();
    const id = document.getElementById('equipment-id').value;
    const data = {
        equipment_name:   document.getElementById('equipment-name').value,
        equipment_type:   document.getElementById('equipment-type').value,
        purchase_date:    document.getElementById('purchase-date').value    || null,
        purchase_cost:    document.getElementById('purchase-cost').value    || null,
        status:           document.getElementById('status').value,
        last_maintenance: document.getElementById('last-maintenance').value || null,
        next_maintenance: document.getElementById('next-maintenance')?.value || null
    };
    if (!data.equipment_name) { showAlert('Equipment name is required', 'error'); return; }

    let res;
    if (id) {
        res = await apiFetch(`/api/equipment/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        if (res.success) showAlert('Equipment updated!');
    } else {
        res = await apiFetch('/api/equipment', { method: 'POST', body: JSON.stringify(data) });
        if (res.success) showAlert('Equipment added!');
    }
    closeEquipmentModal();
    loadEquipment();
}

async function deleteEquipment(id) {
    if (!confirm('Delete this equipment record?')) return;
    const res = await apiFetch(`/api/equipment/${id}`, { method: 'DELETE' });
    if (res.success) {
        showAlert('Equipment deleted.');
        loadEquipment();
    }
}

function closeEquipmentModal() {
    document.getElementById('equipmentModal').classList.remove('show');
}
