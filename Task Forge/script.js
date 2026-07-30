//array
const tasks = [];

//  task=[
//{
// id:12000
// text:hello  }
//]

let editingTaskId = null;

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const errorMessage = document.getElementById("errorMessage");

addTaskBtn.addEventListener("click", addTask);

function addTask() {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    errorMessage.textContent = "Please enter a task.";
    return;
  }

  errorMessage.textContent = "";

  if (editingTaskId !== null) {

    updateTask(taskText);

  } else {

    createTask(taskText);

  }

  taskInput.value = "";
}

// Create New Task
function createTask(taskText) {

  const task = {
    id: Date.now(),
    text: taskText,
  };

  tasks.push(task);

  renderTask(task);
}

// Update Existing Task
function updateTask(taskText) {

  const task = tasks.find(function (task) {

    return task.id === editingTaskId;

  });
//update text in array obj
  task.text = taskText;

  

  updateTaskElement(task);

  editingTaskId = null;

  addTaskBtn.textContent = "Add Task";
}

function renderTask(task) {
  // function calls createTaskElement(task) renderTask() execution pause
  const taskElement = createTaskElement(task);

  taskList.appendChild(taskElement);
}

// Create task html attributes li span
function createTaskElement(task) {

  const li = document.createElement("li");

  li.dataset.id = task.id;

  const span = document.createElement("span");

  span.textContent = task.text;

  const editBtn = document.createElement("button");
  editBtn.id = "edit-btn";

  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", function () {

    editTask(task.id);

  });

  li.appendChild(span);

  li.appendChild(editBtn);

  return li;

  // Return the <li> element to updateTaskElement()
}

// Edit Task
function editTask(id) {

  const task = tasks.find(function (task) {

    return task.id === id;

  });


  taskInput.value = task.text;


  editingTaskId = id;

  addTaskBtn.textContent = "Update Task";

  taskInput.focus();

}

// Update Task HTML
function updateTaskElement(task) {

  const oldElement = document.querySelector(
    '[data-id="' + task.id + '"]'
  );

  const newElement = createTaskElement(task);

  oldElement.replaceWith(newElement);

}