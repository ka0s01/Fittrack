"""
Run this ONCE after importing fittrack_db.sql:
    python setup_passwords.py

This sets proper bcrypt hashes for all users.
Default passwords:
    Admin:   admin@fittrack.com  / admin123
    Trainer: rajesh@fittrack.com / trainer123  (same for all trainers)
    Member:  arjun@email.com     / member123   (same for all members)
"""

import mysql.connector
from werkzeug.security import generate_password_hash

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'tiger123',        # ← your MySQL password
    'database': 'fittrack'
}

conn = mysql.connector.connect(**DB_CONFIG)
cur = conn.cursor()

admin_hash   = generate_password_hash('admin123')
trainer_hash = generate_password_hash('trainer123')
member_hash  = generate_password_hash('member123')

# Admin
cur.execute("UPDATE Admin SET password_hash=%s WHERE email='admin@fittrack.com'", (admin_hash,))

# Trainers
cur.execute("UPDATE Trainer SET password_hash=%s", (trainer_hash,))

# Members
cur.execute("UPDATE Member SET password_hash=%s", (member_hash,))

conn.commit()
cur.close()
conn.close()

print("✅ Passwords set successfully!")
print()
print("Login credentials:")
print("  Admin   → admin@fittrack.com    / admin123")
print("  Trainer → rajesh@fittrack.com   / trainer123")
print("  Member  → arjun@email.com       / member123")
