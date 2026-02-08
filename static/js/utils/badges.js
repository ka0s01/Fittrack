
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