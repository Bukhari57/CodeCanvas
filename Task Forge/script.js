// ===============================
// Array to store all tasks
// ===============================
const tasks = [];

// This variable stores the ID of the task being edited.
// If it is null, we are adding a new task.
let editingTaskId = null;

// ===============================
// Get HTML Elements
// ===============================
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

// ===============================
// Event Listeners
// ===============================

// Add or Update task
addTaskBtn.addEventListener("click", addTask);

// Remove error message while typing
taskInput.addEventListener("input", function () {
    errorMessage.textContent = "";
});

// ===============================
// Add New Task / Update Task
// ===============================
function addTask() {

    // Remove extra spaces
    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    errorMessage.textContent = "";

    // ===============================
    // Update Existing Task
    // ===============================
    if (editingTaskId !== null) {

        const task = tasks.find(function (task) {
            return task.id === editingTaskId;
        });

        task.text = taskText;

        // Update only this task in DOM
        updateTaskElement(task);

        // Exit edit mode
        editingTaskId = null;

        // Change button text back
        addTaskBtn.textContent = "Add Task";

    }

    // ===============================
    // Add New Task
    // ===============================
    else {

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);

        // Add only one task to the page
        renderTask(task);
    }

    // Clear input
    taskInput.value = "";

    // Focus input
    taskInput.focus();
}

// ===============================
// Render One Task
// ===============================
function renderTask(task) {

    const taskElement = createTaskElement(task);

    taskList.appendChild(taskElement);
}

// ===============================
// Create Task Element
// ===============================
function createTaskElement(task) {

    // Create list item
    const li = document.createElement("li");

    // Save task id inside HTML
    li.dataset.id = task.id;

    // Add completed class
    if (task.completed) {
        li.classList.add("completed");
    }

    // ===============================
    // Task Text
    // ===============================
    const span = document.createElement("span");
    span.textContent = task.text;

    // ===============================
    // Complete Button
    // ===============================
    const completeBtn = document.createElement("button");

    completeBtn.textContent = task.completed ? "Undo" : "Complete";

    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", function () {

        toggleTask(task.id);

    });

    // ===============================
    // Edit Button
    // ===============================
    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function () {

        editTask(task.id);

    });

    // ===============================
    // Delete Button
    // ===============================
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {

        deleteTask(task.id);

    });

    // ===============================
    // Button Group
    // ===============================
    const buttonGroup = document.createElement("div");

    buttonGroup.classList.add("button-group");

    buttonGroup.appendChild(completeBtn);
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    // ===============================
    // Add Elements into List Item
    // ===============================
    li.appendChild(span);

    li.appendChild(buttonGroup);

    return li;
}

// ===============================
// Complete / Undo Task
// ===============================
function toggleTask(id) {

    const task = tasks.find(function (task) {

        return task.id === id;

    });

    task.completed = !task.completed;

    updateTaskElement(task);
}

// ===============================
// Edit Task
// ===============================
function editTask(id) {

    const task = tasks.find(function (task) {

        return task.id === id;

    });

    // Put task text into input field
    taskInput.value = task.text;

    // Save task id
    editingTaskId = id;

    // Change button text
    addTaskBtn.textContent = "Update Task";

    // Focus input
    taskInput.focus();
}

// ===============================
// Delete Task
// ===============================
function deleteTask(id) {

    const index = tasks.findIndex(function (task) {

        return task.id === id;

    });

    // Remove task from array
    tasks.splice(index, 1);

    // Remove task from page
    removeTaskElement(id);

    // If the deleted task was being edited,
    // reset edit mode.
    if (editingTaskId === id) {

        editingTaskId = null;

        taskInput.value = "";

        addTaskBtn.textContent = "Add Task";
    }
}

// ===============================
// Update One Task
// ===============================
function updateTaskElement(task) {

    // Find old element
    const oldElement = document.querySelector(
        '[data-id="' + task.id + '"]'
    );

    // Create updated element
    const newElement = createTaskElement(task);

    // Replace old with new
    oldElement.replaceWith(newElement);
}

// ===============================
// Remove One Task
// ===============================
function removeTaskElement(id) {

    const taskElement = document.querySelector(
        '[data-id="' + id + '"]'
    );

    if (taskElement) {

        taskElement.remove();

    }
}