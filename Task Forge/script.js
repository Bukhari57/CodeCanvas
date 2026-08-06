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
let searchTimeout;

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const activeTasks = document.getElementById("activeTasks");
const categoryCount = document.getElementById("categoryCount");
const filterTask = document.getElementById("filterTask");
const sortTask = document.getElementById("sortTask");
const charCount = document.getElementById("charCount");
const searchInput = document.getElementById("searchInput");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const category = document.getElementById("category");

const segButtons = document.querySelectorAll(".seg-btn");

const taskModal = document.getElementById("taskModal");
const taskModalTitle = document.getElementById("taskModalTitle");
const openModalBtn = document.getElementById("openAddTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const closeModalBtn = document.getElementById("closeTaskModalBtn");

filterTask.addEventListener("change", filterTasks);

sortTask.addEventListener("change", sortTasks);

openModalBtn.addEventListener("click", () => {
  openModal();
});
closeModalBtn.addEventListener("click", () => {
  closeModal();
});

cancelTaskBtn.addEventListener("click", () => {
  closeModal();
});

taskInput.addEventListener("input", () => {
  errorMessage.textContent = "";

  charCount.textContent = `${taskInput.value.length} / 200`;
});

searchInput.addEventListener("input", function () {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(searchTasks, 500);
});

//filter task
function filterTasks() {
  const filterValue = filterTask.value;

  let filtered = tasks;

  if (filterValue === "active") {
    filtered = tasks.filter((task) => {
      return task.completed === false;
    });
  } else if (filterValue === "completed") {
    filtered = tasks.filter((task) => {
      return task.completed === true;
    });
  }
  // agar "all" selected ho to filtered = tasks hi rahega, koi change nahi

  displayFilteredTasks(filtered);
}

//sort tasks
function sortTasks() {
  const sortType = sortTask.value;

  if (sortType === "default") {
    displayFilteredTasks(tasks);
    return;
  }

  let sortedTasks = [...tasks]; // original ki copy bana li

  if (sortType === "priority") {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    sortedTasks.sort((a, b) => {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  } else if (sortType === "date") {
    sortedTasks.sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  displayFilteredTasks(sortedTasks); // sorted copy display ho rahi hai original tasks safe hai
}
//search task
function searchTasks() {
  const searchText = searchInput.value.toLowerCase();
  const filteredTasks = tasks.filter(function (task) {
    return task.text.toLowerCase().includes(searchText);
  });

  displayFilteredTasks(filteredTasks);
}

//display filtered task
function displayFilteredTasks(taskArray) {
  taskList.innerHTML = "";

  taskArray.forEach(function (task) {
    renderTask(task);
  });
}

function openModal() {
  taskModal.classList.remove("hidden");
  taskInput.focus();
}

function closeModal() {
  taskModal.classList.add("hidden");
  editingTaskId = null;
  addTaskBtn.textContent = "Add Task";
  taskInput.value = "";
  charCount.textContent = "0 / 200";
  setDefaultValues();
}

segButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setPriority(btn.dataset.value);
  });
});

function setPriority(value) {
  priority.value = value;

  segButtons.forEach((btn) => {
    if (btn.dataset.value === value) {
      btn.classList.add("active"); // isko highlight karo
    } else {
      btn.classList.remove("active"); // baqi sab se hatao
    }
  });
}

addTaskBtn.addEventListener("click", addTask);

const setDefaultValues = () => {
  const defaultDate = new Date();

  defaultDate.setDate(defaultDate.getDate() + 5);

  dueDate.value = defaultDate.toISOString().split("T")[0];

  setPriority("Low");

  category.value = "Study";
};

// Set the initial default values when the page loads
setDefaultValues();
loadTasks();

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

    // Change button text back
    addTaskBtn.textContent = "Add Task";
  }
  // Add New Task
  else {
    createTask(taskText);
  }

  closeModal();
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

  saveTasks();

  updateStatistics();

  sortTasks();
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
  const priorityPill = document.createElement("span");
  priorityPill.textContent = task.priority;
  priorityPill.classList.add("pill");
  priorityPill.dataset.priority = task.priority;
  priorityTd.appendChild(priorityPill);

  const categoryTd = document.createElement("td");
  categoryTd.textContent = task.category;

  const statusTd = document.createElement("td");
  statusTd.textContent = task.completed ? "Completed" : "Active";
  const completeBtn = document.createElement("button");

  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  completeBtn.classList.add("complete-btn");

  completeBtn.title = "Mark as Completed";

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
  saveTasks();

  updateStatistics();

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
  charCount.textContent = `${task.text.length} / 200`;
  dueDate.value = task.dueDate;
  setPriority(task.priority);
  category.value = task.category;

  // Save task id
  editingTaskId = id;

  addTaskBtn.textContent = "Update Task";
  openModal();
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
  saveTasks();

  updateStatistics();
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

  saveTasks();

  updateStatistics();

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

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (!savedTasks) return;

  const parsedTasks = JSON.parse(savedTasks);

  parsedTasks.forEach((task) => {
    tasks.push(task);
  });

  updateStatistics();

  sortTasks();
}

function updateStatistics() {
  // Total Tasks
  totalTasks.textContent = tasks.length;

  // Completed Tasks
  const completed = tasks.filter((task) => task.completed).length;
  completedTasks.textContent = completed;

  // Active Tasks
  const active = tasks.filter((task) => !task.completed).length;
  activeTasks.textContent = active;

  // Distinct Categories
  const uniqueCategories = new Set(tasks.map((task) => task.category));

  categoryCount.textContent = uniqueCategories.size;
}
