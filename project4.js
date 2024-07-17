document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
  
    const saveTasks = () => {
      const tasks = [];
      taskList.querySelectorAll('.task').forEach(task => {
        tasks.push(task.querySelector('input').value);
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        tasks.forEach(taskText => {
          addTask(taskText);
        });
      }
    };
  
    const addTask = (taskText) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task');
  
      const taskInput = document.createElement('input');
      taskInput.type = 'text';
      taskInput.value = taskText;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
  
      taskItem.appendChild(taskInput);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
  
      taskInput.addEventListener('change', saveTasks);
      deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
      });
  
      saveTasks();
    };
  
    addTaskButton.addEventListener('click', () => {
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        newTaskInput.value = '';
      }
    });
  
    newTaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskButton.click();
      }
    });
  
    loadTasks();
  });
  