function createTaskElement(taskText, priority, date) {
    const div = document.createElement('div');
    div.classList.add('task-item', priority.toLowerCase());
  
    const span = document.createElement('span');
    span.textContent = `${taskText} (${priority}) - ${date || 'No Date'}`;
  
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      div.classList.add('fade-out');
      setTimeout(() => {
        div.remove();
        showToast('❌ Task Deleted!');
      }, 500);
    };
  
    div.appendChild(span);
    div.appendChild(delBtn);
  
    return div;
  }
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const datePicker = document.getElementById('taskDate');
  
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const date = datePicker.value;
  
    if (!taskText) {
      showToast('⚠️ Please enter a task!');
      return;
    }
  
    const taskList = document.getElementById('taskList');
    const newTask = createTaskElement(taskText, priority, date);
    taskList.appendChild(newTask);
  
    taskInput.value = '';
    datePicker.value = '';
  
    showToast('✅ Task Added!');
  }
  
  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
  }
  
  function toggleMode() {
    const body = document.body;
    const toggleButton = document.querySelector('.toggle-btn');
    const todoBox = document.querySelector('.todo-box');
    body.classList.toggle('dark');
    toggleButton.classList.add('rotate');
    todoBox.classList.add('glow');
    setTimeout(() => {
      toggleButton.classList.remove('rotate');
      todoBox.classList.remove('glow');
    }, 600);
  }
  fetch('http://localhost:5000/tasks')
  .then(response => response.json())
  .then(tasks => {
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
      const taskElement = createTaskElement(task.text, task.completed ? 'Completed' : 'Normal', '');
      taskList.appendChild(taskElement);
    });
  });

