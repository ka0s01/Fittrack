from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from functools import wraps
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, date, time
import json

app = Flask(__name__)
app.secret_key = 'fittrack_secret_key_change_in_production'

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'tiger123',        # ← your MySQL password
    'database': 'fittrack'
}

def get_db():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        print(f"DB Error: {e}")
        return None


def query(sql, params=(), one=False, commit=False):
    conn = get_db()
    if not conn:
        return None
    cursor = None
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(sql, params)
        if commit:
            conn.commit()
            return cursor.lastrowid
        result = cursor.fetchone() if one else cursor.fetchall()
        # Convert non-serializable types to strings
        def fix(row):
            return {k: (str(v) if isinstance(v, (timedelta, date, time)) else v)
                    for k, v in row.items()}
        if result is None:
            return None
        if one:
            return fix(result)
        return [fix(r) for r in result]
    except Error as e:
        print(f"Query Error: {e}")
        if commit:
            conn.rollback()
        return None
    finally:
        if cursor:
            cursor.close()
        conn.close()

# ─────────────────────────────────────────
# AUTH
# ─────────────────────────────────────────
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('login'))
        if session['user']['role'] != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated

# ─────────────────────────────────────────
# LOGIN / LOGOUT
# ─────────────────────────────────────────
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email    = data.get('email', '').strip()
        password = data.get('password', '').strip()
        role     = data.get('role', '').strip()

        if role == 'admin':
            user = query("SELECT * FROM Admin WHERE email=%s", (email,), one=True)
            if user and check_password_hash(user['password_hash'], password):
                session['user'] = {'id': user['admin_id'], 'name': user['name'], 'role': 'admin', 'email': email}
                return jsonify({'success': True, 'redirect': '/dashboard'})

        elif role == 'trainer':
            user = query("SELECT * FROM Trainer WHERE email=%s", (email,), one=True)
            if user and check_password_hash(user['password_hash'], password):
                session['user'] = {'id': user['trainer_id'], 'name': f"{user['fname']} {user['lname']}", 'role': 'trainer', 'email': email}
                return jsonify({'success': True, 'redirect': '/trainer-dashboard'})

        elif role == 'member':
            user = query("SELECT * FROM Member WHERE email=%s", (email,), one=True)
            if user and check_password_hash(user['password_hash'], password):
                session['user'] = {'id': user['member_id'], 'name': f"{user['fname']} {user['lname']}", 'role': 'member', 'email': email}
                return jsonify({'success': True, 'redirect': '/member-dashboard'})

        return jsonify({'success': False, 'message': 'Invalid email or password'})

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# ─────────────────────────────────────────
# PAGE ROUTES
# ─────────────────────────────────────────
@app.route('/')
@app.route('/dashboard')
@login_required
def dashboard():
    role = session['user']['role']
    if role == 'trainer':
        return redirect(url_for('trainer_dashboard'))
    if role == 'member':
        return redirect(url_for('member_dashboard'))
    return render_template('dashboard.html', user=session['user'])

@app.route('/trainer-dashboard')
@login_required
def trainer_dashboard():
    return render_template('trainer_dashboard.html', user=session['user'])

@app.route('/member-dashboard')
@login_required
def member_dashboard():
    return render_template('member_dashboard.html', user=session['user'])

@app.route('/members')
@login_required
def members():
    return render_template('members.html', user=session['user'])

@app.route('/trainers')
@login_required
def trainers():
    return render_template('trainers.html', user=session['user'])

@app.route('/sessions')
@login_required
def sessions():
    return render_template('sessions.html', user=session['user'])

@app.route('/workouts')
@login_required
def workouts():
    return render_template('workouts.html', user=session['user'])

@app.route('/equipment')
@login_required
def equipment():
    return render_template('equipment.html', user=session['user'])

@app.route('/payments')
@login_required
def payments():
    return render_template('payments.html', user=session['user'])

@app.route('/attendance')
@login_required
def attendance():
    return render_template('attendance.html', user=session['user'])

# ─────────────────────────────────────────
# API — DASHBOARD
# ─────────────────────────────────────────
@app.route('/api/dashboard/stats')
@login_required
def api_dashboard_stats():
    total_members   = query("SELECT COUNT(*) AS c FROM Member", one=True)['c']
    active_members  = query("SELECT COUNT(*) AS c FROM Member WHERE membership_end_date >= CURDATE()", one=True)['c']
    total_trainers  = query("SELECT COUNT(*) AS c FROM Trainer", one=True)['c']
    monthly_revenue = query("""
        SELECT COALESCE(SUM(amount),0) AS c FROM Payment
        WHERE status='Completed'
        AND MONTH(payment_date)=MONTH(CURDATE())
        AND YEAR(payment_date)=YEAR(CURDATE())
    """, one=True)['c']
    return jsonify({
        'total_members':   total_members,
        'active_members':  active_members,
        'total_trainers':  total_trainers,
        'monthly_revenue': float(monthly_revenue)
    })

@app.route('/api/dashboard/today-attendance')
@login_required
def api_today_attendance():
    rows = query("""
        SELECT a.attendance_id, m.fname, m.lname, a.check_in_time, a.check_out_time
        FROM Attendance a JOIN Member m ON a.member_id=m.member_id
        WHERE a.check_in_date=CURDATE()
        ORDER BY a.check_in_time DESC
    """)
    return jsonify(rows or [])

@app.route('/api/dashboard/upcoming-sessions')
@login_required
def api_upcoming_sessions():
    rows = query("""
        SELECT ts.session_id, ts.session_date, ts.start_time, ts.end_time,
               ts.session_type,
               CONCAT(m.fname,' ',m.lname) AS member_name,
               CONCAT(t.fname,' ',t.lname) AS trainer_name
        FROM Training_Session ts
        JOIN Member m ON ts.member_id=m.member_id
        JOIN Trainer t ON ts.trainer_id=t.trainer_id
        WHERE ts.status='Scheduled' AND ts.session_date >= CURDATE()
        ORDER BY ts.session_date, ts.start_time
        LIMIT 10
    """)
    return jsonify(rows or [])

# ─────────────────────────────────────────
# API — MEMBERS
# ─────────────────────────────────────────
@app.route('/api/members', methods=['GET'])
@login_required
def api_get_members():
    rows = query("""
        SELECT m.member_id, m.fname, m.lname, m.email, m.phone,
               m.dob, m.gender, m.address, m.join_date,
               m.membership_plan_id,
               mp.plan_name,
               m.membership_start_date, m.membership_end_date,
               CASE
                   WHEN m.membership_end_date IS NULL THEN 'No Plan'
                   WHEN m.membership_end_date >= CURDATE() THEN 'Active'
                   ELSE 'Expired'
               END AS membership_status
        FROM Member m
        LEFT JOIN Membership_Plan mp ON m.membership_plan_id=mp.plan_id
        ORDER BY m.member_id DESC
    """)
    return jsonify(rows or [])

@app.route('/api/members', methods=['POST'])
@login_required
def api_add_member():
    d = request.get_json()
    # Default login password is their phone number
    pw_hash = generate_password_hash(d.get('phone', '12345678'))
    lid = query("""
        INSERT INTO Member (fname, lname, email, phone, dob, gender, address,
                            membership_plan_id, membership_start_date, membership_end_date,
                            join_date, password_hash)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,CURDATE(),%s)
    """, (d['fname'], d['lname'], d['email'], d['phone'],
          d.get('dob') or None, d.get('gender'), d.get('address'),
          d.get('plan_id') or None,
          d.get('start_date') or None, d.get('end_date') or None,
          pw_hash), commit=True)
    return jsonify({'success': True, 'member_id': lid})

@app.route('/api/members/<int:mid>', methods=['PUT'])
@login_required
def api_update_member(mid):
    d = request.get_json()
    query("""
        UPDATE Member SET fname=%s, lname=%s, email=%s, phone=%s, dob=%s,
               gender=%s, address=%s, membership_plan_id=%s,
               membership_start_date=%s, membership_end_date=%s
        WHERE member_id=%s
    """, (d['fname'], d['lname'], d['email'], d['phone'],
          d.get('dob') or None, d.get('gender'), d.get('address'),
          d.get('plan_id') or None,
          d.get('start_date') or None, d.get('end_date') or None,
          mid), commit=True)
    return jsonify({'success': True})

@app.route('/api/members/<int:mid>', methods=['DELETE'])
@login_required
def api_delete_member(mid):
    query("DELETE FROM Member WHERE member_id=%s", (mid,), commit=True)
    return jsonify({'success': True})

@app.route('/api/membership-plans')
@login_required
def api_membership_plans():
    rows = query("SELECT plan_id, plan_name, duration_months, price FROM Membership_Plan ORDER BY plan_id")
    return jsonify(rows or [])

# ─────────────────────────────────────────
# API — TRAINERS
# ─────────────────────────────────────────
@app.route('/api/trainers', methods=['GET'])
@login_required
def api_get_trainers():
    rows = query("""
        SELECT trainer_id, fname, lname, email, phone,
               specialization, certification, experience, hourly_rate, hire_date
        FROM Trainer ORDER BY trainer_id DESC
    """)
    return jsonify(rows or [])

@app.route('/api/trainers', methods=['POST'])
@login_required
def api_add_trainer():
    d = request.get_json()
    pw_hash = generate_password_hash(d.get('phone', '12345678'))
    lid = query("""
        INSERT INTO Trainer (fname, lname, email, phone, specialization,
                             certification, experience, hourly_rate, hire_date, password_hash)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, (d['fname'], d['lname'], d['email'], d['phone'],
          d.get('specialization'), d.get('certification'),
          d.get('experience') or None, d.get('hourly_rate') or None,
          d.get('hire_date') or None, pw_hash), commit=True)
    return jsonify({'success': True, 'trainer_id': lid})

@app.route('/api/trainers/<int:tid>', methods=['PUT'])
@login_required
def api_update_trainer(tid):
    d = request.get_json()
    query("""
        UPDATE Trainer SET fname=%s, lname=%s, email=%s, phone=%s,
               specialization=%s, certification=%s,
               experience=%s, hourly_rate=%s
        WHERE trainer_id=%s
    """, (d['fname'], d['lname'], d['email'], d['phone'],
          d.get('specialization'), d.get('certification'),
          d.get('experience') or None, d.get('hourly_rate') or None,
          tid), commit=True)
    return jsonify({'success': True})

@app.route('/api/trainers/<int:tid>', methods=['DELETE'])
@login_required
def api_delete_trainer(tid):
    query("DELETE FROM Trainer WHERE trainer_id=%s", (tid,), commit=True)
    return jsonify({'success': True})

# ─────────────────────────────────────────
# API — SESSIONS
# ─────────────────────────────────────────
@app.route('/api/sessions', methods=['GET'])
@login_required
def api_get_sessions():
    role = session['user']['role']
    uid  = session['user']['id']

    base_sql = """
        SELECT ts.session_id, ts.session_date, ts.start_time, ts.end_time,
               ts.session_type, ts.status,
               ts.member_id, ts.trainer_id,
               CONCAT(m.fname,' ',m.lname) AS member_name,
               CONCAT(t.fname,' ',t.lname) AS trainer_name
        FROM Training_Session ts
        JOIN Member m ON ts.member_id=m.member_id
        JOIN Trainer t ON ts.trainer_id=t.trainer_id
    """
    if role == 'trainer':
        rows = query(base_sql + " WHERE ts.trainer_id=%s ORDER BY ts.session_date DESC, ts.start_time DESC", (uid,))
    elif role == 'member':
        rows = query(base_sql + " WHERE ts.member_id=%s ORDER BY ts.session_date DESC, ts.start_time DESC", (uid,))
    else:
        rows = query(base_sql + " ORDER BY ts.session_date DESC, ts.start_time DESC")

    return jsonify(rows or [])

@app.route('/api/sessions', methods=['POST'])
@login_required
def api_add_session():
    d = request.get_json()
    # Validate required fields
    if not all([d.get('member_id'), d.get('trainer_id'), d.get('session_date'), d.get('start_time'), d.get('end_time')]):
        return jsonify({'success': False, 'message': 'All fields are required'}), 400
    lid = query("""
        INSERT INTO Training_Session
               (member_id, trainer_id, session_date, start_time, end_time, session_type, status)
        VALUES (%s,%s,%s,%s,%s,%s,'Scheduled')
    """, (d['member_id'], d['trainer_id'], d['session_date'],
          d['start_time'], d['end_time'],
          d.get('session_type', 'Personal Training')), commit=True)
    return jsonify({'success': True, 'session_id': lid})

@app.route('/api/sessions/<int:sid>', methods=['DELETE'])
@login_required
def api_delete_session(sid):
    query("DELETE FROM Training_Session WHERE session_id=%s", (sid,), commit=True)
    return jsonify({'success': True})

@app.route('/api/sessions/<int:sid>/status', methods=['PUT'])
@login_required
def api_update_session_status(sid):
    d = request.get_json()
    query("UPDATE Training_Session SET status=%s WHERE session_id=%s",
          (d['status'], sid), commit=True)
    return jsonify({'success': True})

# ─────────────────────────────────────────
# API — ATTENDANCE
# ─────────────────────────────────────────
@app.route('/api/attendance/today', methods=['GET'])
@login_required
def api_today_att():
    rows = query("""
        SELECT a.attendance_id, a.member_id,
               CONCAT(m.fname,' ',m.lname) AS member_name,
               a.check_in_time, a.check_out_time,
               CASE
                   WHEN a.check_out_time IS NOT NULL
                   THEN ROUND(TIMESTAMPDIFF(MINUTE, a.check_in_time, a.check_out_time)/60.0, 2)
                   ELSE NULL
               END AS duration
        FROM Attendance a JOIN Member m ON a.member_id=m.member_id
        WHERE a.check_in_date=CURDATE()
        ORDER BY a.check_in_time DESC
    """)
    return jsonify(rows or [])

@app.route('/api/attendance/all', methods=['GET'])
@login_required
def api_all_attendance():
    """Full attendance history for the attendance page."""
    rows = query("""
        SELECT a.attendance_id, a.member_id,
               CONCAT(m.fname,' ',m.lname) AS member_name,
               a.check_in_date, a.check_in_time, a.check_out_time,
               CASE
                   WHEN a.check_out_time IS NOT NULL
                   THEN ROUND(TIMESTAMPDIFF(MINUTE, a.check_in_time, a.check_out_time)/60.0, 2)
                   ELSE NULL
               END AS duration
        FROM Attendance a JOIN Member m ON a.member_id=m.member_id
        ORDER BY a.check_in_date DESC, a.check_in_time DESC
        LIMIT 100
    """)
    return jsonify(rows or [])

@app.route('/api/attendance/checkin', methods=['POST'])
@login_required
def api_checkin():
    d   = request.get_json()
    mid = d.get('member_id')
    if not mid:
        return jsonify({'success': False, 'message': 'No member selected'}), 400
    # Prevent double check-in (already checked in and not yet checked out)
    existing = query(
        "SELECT attendance_id FROM Attendance WHERE member_id=%s AND check_in_date=CURDATE() AND check_out_time IS NULL",
        (mid,), one=True)
    if existing:
        return jsonify({'success': False, 'message': 'Member is already checked in'})
    lid = query(
        "INSERT INTO Attendance (member_id, check_in_date, check_in_time) VALUES (%s, CURDATE(), CURTIME())",
        (mid,), commit=True)
    return jsonify({'success': True, 'attendance_id': lid})

@app.route('/api/attendance/checkout/<int:aid>', methods=['PUT'])
@login_required
def api_checkout(aid):
    query("UPDATE Attendance SET check_out_time=CURTIME() WHERE attendance_id=%s AND check_out_time IS NULL",
          (aid,), commit=True)
    return jsonify({'success': True})

@app.route('/api/attendance/<int:aid>', methods=['DELETE'])
@login_required
def api_delete_attendance(aid):
    query("DELETE FROM Attendance WHERE attendance_id=%s", (aid,), commit=True)
    return jsonify({'success': True})

@app.route('/api/attendance/active-members')
@login_required
def api_active_members():
    rows = query("""
        SELECT m.member_id, m.fname, m.lname
        FROM Member m
        WHERE m.membership_end_date >= CURDATE()
        ORDER BY m.fname
    """)
    return jsonify(rows or [])

# ─────────────────────────────────────────
# API — WORKOUTS
# ─────────────────────────────────────────
@app.route('/api/workouts', methods=['GET'])
@login_required
def api_get_workouts():
    rows = query("""
        SELECT wp.workout_plan_id, wp.plan_name, wp.duration_weeks, wp.created_date,
               wp.created_by_trainer_id,
               CONCAT(t.fname,' ',t.lname) AS created_by
        FROM Workout_Plan wp
        LEFT JOIN Trainer t ON wp.created_by_trainer_id=t.trainer_id
        ORDER BY wp.workout_plan_id DESC
    """)
    return jsonify(rows or [])

@app.route('/api/workouts', methods=['POST'])
@login_required
def api_add_workout():
    d = request.get_json()
    if not d.get('plan_name') or not d.get('duration_weeks'):
        return jsonify({'success': False, 'message': 'Plan name and duration are required'}), 400
    lid = query("""
        INSERT INTO Workout_Plan (plan_name, duration_weeks, created_by_trainer_id, created_date)
        VALUES (%s,%s,%s,CURDATE())
    """, (d['plan_name'], d['duration_weeks'], d.get('trainer_id') or None), commit=True)
    return jsonify({'success': True, 'workout_plan_id': lid})

@app.route('/api/workouts/<int:wid>', methods=['PUT'])
@login_required
def api_update_workout(wid):
    d = request.get_json()
    query("""
        UPDATE Workout_Plan SET plan_name=%s, duration_weeks=%s, created_by_trainer_id=%s
        WHERE workout_plan_id=%s
    """, (d['plan_name'], d['duration_weeks'], d.get('trainer_id') or None, wid), commit=True)
    return jsonify({'success': True})

@app.route('/api/workouts/<int:wid>', methods=['DELETE'])
@login_required
def api_delete_workout(wid):
    query("DELETE FROM Workout_Plan WHERE workout_plan_id=%s", (wid,), commit=True)
    return jsonify({'success': True})

# Assign workout plan to a member
@app.route('/api/workouts/assign', methods=['POST'])
@login_required
def api_assign_workout():
    d = request.get_json()
    if not d.get('member_id') or not d.get('workout_plan_id'):
        return jsonify({'success': False, 'message': 'Member and plan are required'}), 400
    # Check if already assigned
    existing = query(
        "SELECT assignment_id FROM Member_Workout_Plan WHERE member_id=%s AND workout_plan_id=%s",
        (d['member_id'], d['workout_plan_id']), one=True)
    if existing:
        return jsonify({'success': False, 'message': 'Plan already assigned to this member'})
    query("""
        INSERT INTO Member_Workout_Plan (member_id, workout_plan_id, assigned_date)
        VALUES (%s,%s,CURDATE())
    """, (d['member_id'], d['workout_plan_id']), commit=True)
    return jsonify({'success': True})

# ─────────────────────────────────────────
# API — EQUIPMENT
# ─────────────────────────────────────────
@app.route('/api/equipment', methods=['GET'])
@login_required
def api_get_equipment():
    rows = query("""
        SELECT equipment_id, equipment_name, equipment_type, purchase_date,
               purchase_cost, status, last_maintenance_date, next_maintenance_date
        FROM Equipment ORDER BY equipment_id DESC
    """)
    return jsonify(rows or [])

@app.route('/api/equipment', methods=['POST'])
@login_required
def api_add_equipment():
    d = request.get_json()
    if not d.get('equipment_name'):
        return jsonify({'success': False, 'message': 'Equipment name is required'}), 400
    lid = query("""
        INSERT INTO Equipment (equipment_name, equipment_type, purchase_date,
                               purchase_cost, status, last_maintenance_date, next_maintenance_date)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (d['equipment_name'], d.get('equipment_type'),
          d.get('purchase_date') or None,
          d.get('purchase_cost') or None,
          d.get('status', 'Operational'),
          d.get('last_maintenance') or None,
          d.get('next_maintenance') or None), commit=True)
    return jsonify({'success': True, 'equipment_id': lid})

@app.route('/api/equipment/<int:eid>', methods=['PUT'])
@login_required
def api_update_equipment(eid):
    d = request.get_json()
    query("""
        UPDATE Equipment
        SET equipment_name=%s, equipment_type=%s, status=%s,
            last_maintenance_date=%s, next_maintenance_date=%s,
            purchase_date=%s, purchase_cost=%s
        WHERE equipment_id=%s
    """, (d['equipment_name'], d.get('equipment_type'), d['status'],
          d.get('last_maintenance') or None, d.get('next_maintenance') or None,
          d.get('purchase_date') or None, d.get('purchase_cost') or None,
          eid), commit=True)
    return jsonify({'success': True})

@app.route('/api/equipment/<int:eid>', methods=['DELETE'])
@login_required
def api_delete_equipment(eid):
    query("DELETE FROM Equipment WHERE equipment_id=%s", (eid,), commit=True)
    return jsonify({'success': True})

# ─────────────────────────────────────────
# API — PAYMENTS
# ─────────────────────────────────────────
@app.route('/api/payments', methods=['GET'])
@login_required
def api_get_payments():
    rows = query("""
        SELECT p.payment_id, p.payment_date, p.amount,
               p.payment_method, p.payment_for, p.status,
               p.member_id,
               CONCAT(m.fname,' ',m.lname) AS member_name
        FROM Payment p JOIN Member m ON p.member_id=m.member_id
        ORDER BY p.payment_date DESC, p.payment_id DESC
    """)
    return jsonify(rows or [])

@app.route('/api/payments', methods=['POST'])
@login_required
def api_add_payment():
    d = request.get_json()
    if not all([d.get('member_id'), d.get('amount'), d.get('payment_method'), d.get('payment_for')]):
        return jsonify({'success': False, 'message': 'All payment fields are required'}), 400
    lid = query("""
        INSERT INTO Payment (member_id, amount, payment_date, payment_method, payment_for, status)
        VALUES (%s,%s,%s,%s,%s,%s)
    """, (d['member_id'], d['amount'],
          d.get('payment_date') or date.today().isoformat(),
          d['payment_method'], d['payment_for'],
          d.get('status', 'Completed')), commit=True)
    return jsonify({'success': True, 'payment_id': lid})

@app.route('/api/payments/<int:pid>', methods=['PUT'])
@login_required
def api_update_payment(pid):
    d = request.get_json()
    query("""
        UPDATE Payment SET status=%s WHERE payment_id=%s
    """, (d['status'], pid), commit=True)
    return jsonify({'success': True})

@app.route('/api/payments/<int:pid>', methods=['DELETE'])
@login_required
def api_delete_payment(pid):
    query("DELETE FROM Payment WHERE payment_id=%s", (pid,), commit=True)
    return jsonify({'success': True})

@app.route('/api/payments/stats')
@login_required
def api_payment_stats():
    total   = query("SELECT COALESCE(SUM(amount),0) AS s FROM Payment WHERE status='Completed'", one=True)['s']
    pending = query("SELECT COALESCE(SUM(amount),0) AS s FROM Payment WHERE status='Pending'",   one=True)['s']
    monthly = query("""
        SELECT COALESCE(SUM(amount),0) AS s FROM Payment
        WHERE status='Completed'
        AND MONTH(payment_date)=MONTH(CURDATE())
        AND YEAR(payment_date)=YEAR(CURDATE())
    """, one=True)['s']
    return jsonify({'total': float(total), 'pending': float(pending), 'monthly': float(monthly)})

# ─────────────────────────────────────────
# MEMBER SELF-SERVICE API
# ─────────────────────────────────────────
@app.route('/api/my/profile')
@login_required
def api_my_profile():
    uid = session['user']['id']
    row = query("""
        SELECT m.member_id, m.fname, m.lname, m.email, m.phone,
               m.dob, m.gender, m.address, m.join_date,
               m.membership_start_date, m.membership_end_date,
               mp.plan_name, mp.price
        FROM Member m
        LEFT JOIN Membership_Plan mp ON m.membership_plan_id=mp.plan_id
        WHERE m.member_id=%s
    """, (uid,), one=True)
    return jsonify(row or {})

@app.route('/api/my/attendance')
@login_required
def api_my_attendance():
    uid  = session['user']['id']
    rows = query("""
        SELECT check_in_date, check_in_time, check_out_time,
               CASE WHEN check_out_time IS NOT NULL
                    THEN ROUND(TIMESTAMPDIFF(MINUTE,check_in_time,check_out_time)/60.0,2)
                    ELSE NULL END AS duration
        FROM Attendance WHERE member_id=%s
        ORDER BY check_in_date DESC, check_in_time DESC
        LIMIT 20
    """, (uid,))
    return jsonify(rows or [])

@app.route('/api/my/workouts')
@login_required
def api_my_workouts():
    uid  = session['user']['id']
    rows = query("""
        SELECT wp.plan_name, wp.duration_weeks, mwp.assigned_date,
               CONCAT(t.fname,' ',t.lname) AS trainer
        FROM Member_Workout_Plan mwp
        JOIN Workout_Plan wp ON mwp.workout_plan_id=wp.workout_plan_id
        LEFT JOIN Trainer t ON wp.created_by_trainer_id=t.trainer_id
        WHERE mwp.member_id=%s
        ORDER BY mwp.assigned_date DESC
    """, (uid,))
    return jsonify(rows or [])

if __name__ == '__main__':
    app.run(debug=True)
