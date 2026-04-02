// ==========================================
// PAGE INITIALIZATION — API-driven
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    if (path === '/' || path.includes('dashboard')) {
        if (typeof loadDashboardStats === 'function') loadDashboardStats();
        if (typeof loadTodayAttendance === 'function') loadTodayAttendance();
        if (typeof loadUpcomingSessions === 'function') loadUpcomingSessions();
    }

    if (path.includes('members'))    { if (typeof initMembers    === 'function') initMembers(); }
    if (path.includes('trainers'))   { if (typeof initTrainers   === 'function') initTrainers(); }
    if (path.includes('sessions'))   { if (typeof initSessions   === 'function') initSessions(); }
    if (path.includes('attendance')) { if (typeof initAttendance === 'function') initAttendance(); }
    if (path.includes('workouts'))   { if (typeof initWorkouts   === 'function') initWorkouts(); }
    if (path.includes('equipment'))  { if (typeof initEquipment  === 'function') initEquipment(); }
    if (path.includes('payments'))   { if (typeof initPayments   === 'function') initPayments(); }
});
