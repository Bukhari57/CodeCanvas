const tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");



addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("input", function () {
    errorMessage.textContent = "";})


function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    errorMessage.textContent = "";

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";


    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", function() {
            task.completed = !task.completed;
            displayTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function() {
            const newTask = prompt("Edit task", task.text);

            if (newTask !== null && newTask.trim() !== "") {
                task.text = newTask.trim();
                displayTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            displayTasks();
        });
const buttonGroup = document.createElement("div");
buttonGroup.classList.add("button-group");

buttonGroup.appendChild(completeBtn);
buttonGroup.appendChild(editBtn);
buttonGroup.appendChild(deleteBtn);

li.appendChild(span);
li.appendChild(buttonGroup);

        taskList.appendChild(li);
    });
}