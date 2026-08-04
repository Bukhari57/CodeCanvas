// Array to store all tasks
const tasks = [];

// // //  task=[
//     {
//        id:12000
//       text:hello
//       due-date:08-08-2026
//       priority:low
//       category:study   }
//                          ]

let editingTaskId = null;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const category = document.getElementById("category");

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("input", function () {
  errorMessage.textContent = "";
});

const setDefaultValues = () => {
  const defaultDate = new Date();

  defaultDate.setDate(defaultDate.getDate() + 5);

  dueDate.value = defaultDate.toISOString().split("T")[0];

  priority.value = "Low";

  category.value = "Study";
};

// Set the initial default values when the page loads
setDefaultValues();

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

  setDefaultValues();

  taskInput.focus();
}

function createTask(taskText) {
  const task = {
    id: String(Date.now()),
    text: taskText,
    dueDate: dueDate.value,
    priority: priority.value,
    category: category.value,
    completed: false,
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
  const row = document.createElement("tr");

  row.id = task.id;

  const taskTd = document.createElement("td");
  const taskSpan = document.createElement("span");
  taskSpan.textContent = task.text;
  taskTd.appendChild(taskSpan);

  const dueDateTd = document.createElement("td");
  dueDateTd.textContent = task.dueDate;

  const priorityTd = document.createElement("td");
  priorityTd.textContent = task.priority;

  const categoryTd = document.createElement("td");
  categoryTd.textContent = task.category;

  const statusTd = document.createElement("td");
  statusTd.textContent = task.completed ? "Completed" : "Active";
  const completeBtn = document.createElement("button");

  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  completeBtn.classList.add("complete-btn");

  completeBtn.title = "Complete";

  completeBtn.addEventListener("click", () => toggleTask(task.id));

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  editBtn.classList.add("edit-btn");
  editBtn.title = "Edit Task";
  editBtn.addEventListener("click", () => editTask(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteBtn.classList.add("delete-btn");
  deleteBtn.title = "Delete Task";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("action-buttons");

  buttonGroup.appendChild(completeBtn);
  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(deleteBtn);

  const actionsTd = document.createElement("td");
  actionsTd.appendChild(buttonGroup);

  row.appendChild(taskTd);
  row.appendChild(dueDateTd);
  row.appendChild(priorityTd);
  row.appendChild(categoryTd);
  row.appendChild(statusTd);
  row.appendChild(actionsTd);

  return row;
}

// Toggle Task

function toggleTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);

  task.completed = !task.completed;

  updateCompletedTask(task);
}

function updateCompletedTask(task) {
  const taskElement = document.getElementById(task.id);

  const span = taskElement.querySelector("span");
  const statusTd = taskElement.children[4];
  const completeBtn = taskElement.querySelector(".complete-btn");
  if (task.completed) {
    span.classList.add("completed");
    statusTd.textContent = "Completed";
  } else {
    span.classList.remove("completed");
    statusTd.textContent = "Active";
  }

  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeBtn.title = "Complete";
}

// Edit Task

function editTask(id) {
  const task = tasks.find(function (task) {
    return task.id === id;
  });

  taskInput.value = task.text;
  dueDate.value = task.dueDate;
  priority.value = task.priority;
  category.value = task.category;

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

  // Update task fields
  task.text = taskText;
  task.dueDate = dueDate.value;
  task.priority = priority.value;
  task.category = category.value;

  // Update only this task in DOM
  updateTaskElement(task);
}

// Update One Task

function updateTaskElement(task) {
  const taskElement = document.getElementById(task.id);

  const span = taskElement.querySelector("span");
  span.textContent = task.text;

  taskElement.children[1].textContent = task.dueDate;
  taskElement.children[2].textContent = task.priority;
  taskElement.children[3].textContent = task.category;
}

// Delete Task

function deleteTask(id) {
  const index = tasks.findIndex(function (task) {
    return task.id === id;
  });

  tasks.splice(index, 1);

  const taskElement = document.getElementById(id);

  taskElement.remove();

  // If deleted task was being edited
  //reset the edit
  if (editingTaskId === id) {
    editingTaskId = null;

    taskInput.value = "";

    addTaskBtn.textContent = "Add Task";
  }
}
