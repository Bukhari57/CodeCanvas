// Array to store all tasks
const tasks = [];

// // //  task=[
// // //{
// // // id:12000
// // // text:hello  }
// // //]

let editingTaskId = null;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("input", function () {
  errorMessage.textContent = "";
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    errorMessage.textContent = "Please enter a task.";
    return;
  }

  errorMessage.textContent = "";

  // Update Existing Task

  if (editingTaskId !== null) {
   
    updateTask(taskText, editingTaskId);

    editingTaskId = null;
    // Change button text back
    addTaskBtn.textContent = "Add Task";
  }

  // Add New Task
  else {
    createTask(taskText);
  }

  taskInput.value = "";

  taskInput.focus();
}

function createTask(taskText) {
  const task = {
    id: Date.now(),
    text: taskText,
  };

  tasks.push(task);

  renderTask(task);
}

// Render One Task

function renderTask(task) {
  const taskElement = createTaskElement(task);

  taskList.appendChild(taskElement);
}

function createTaskElement(task) {
  const li = document.createElement("li");

  li.dataset.id = task.id;

  const span = document.createElement("span");

  span.textContent = task.text;

  // Edit Button

  const editBtn = document.createElement("button");

  editBtn.textContent = "Edit";

  editBtn.classList.add("edit-btn");

  editBtn.addEventListener("click", function () {
    editTask(task.id);
  });

  // Delete Button

  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";

  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    deleteTask(task.id);
  });

  li.appendChild(span);

  li.appendChild(editBtn);

  li.appendChild(deleteBtn);

  return li;
}

// Edit Task

function editTask(id) {
  const task = tasks.find(function (task) {
    return task.id === id;
  });

  taskInput.value = task.text;

  // Save task id
  editingTaskId = id;

  addTaskBtn.textContent = "Update Task";

  taskInput.focus();
}

// Update Task

function updateTask(taskText, id) {
  const task = tasks.find(function (task) {
    return task.id === id;
  });

  // Update task text
  task.text = taskText;

  // Update only this task in DOM
  updateTaskElement(task);
}

// Update One Task

function updateTaskElement(task) {
  const taskElement = document.querySelector('[data-id="' + task.id + '"]');

  const span = taskElement.querySelector("span");

  span.textContent = task.text;
}

// Delete Task

function deleteTask(id) {
  const index = tasks.findIndex(function (task) {
    return task.id === id;
  });

  // Remove task from array
  tasks.splice(index, 1);

  // Remove task from page
  removeTaskElement(id);
}

// Remove One TaskElement

function removeTaskElement(id) {
  const taskElement = document.querySelector('[data-id="' + id + '"]');

  taskElement.remove();
}
