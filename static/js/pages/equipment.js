
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


export function initDashboard(){
    loadEquipment();
}

