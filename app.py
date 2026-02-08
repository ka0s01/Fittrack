from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')
@app.route('/attendance')
def attendance():
    return render_template('attendance.html')



@app.route('/equipment')
def equipment():
    return render_template('equipment.html')

@app.route('/members')
def members():
    return render_template('members.html')

@app.route('/payments')
def payments():
    return render_template('payments.html')

@app.route('/sessions')
def sessions():
    return render_template('sessions.html')


@app.route('/trainers')
def trainers():
    return render_template('trainers.html')

@app.route('/workouts')
def workouts():
    return render_template('workouts.html')

if __name__ == '__main__':
    app.run(debug=True)