from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Task Model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{"id": t.id, "text": t.text, "completed": t.completed} for t in tasks])

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    task = Task(text=data["text"])
    db.session.add(task)
    db.session.commit()
    return jsonify({"id": task.id, "text": task.text, "completed": task.completed}), 201

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"success": True})
    return jsonify({"error": "Task not found"}), 404

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def toggle_task(task_id):
    task = Task.query.get(task_id)
    if task:
        task.completed = not task.completed
        db.session.commit()
        return jsonify({"id": task.id, "text": task.text, "completed": task.completed})
    return jsonify({"error": "Task not found"}), 404

# ✅ Single block
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
