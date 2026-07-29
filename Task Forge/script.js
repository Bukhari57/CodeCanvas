//array
const tasks = [];

//  task=[
//{
// id:12000
// text:hello  }
//]
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

  const task = {
    id: Date.now(),
    text: taskText,
  };

  tasks.push(task);

  renderTask(task);

  taskInput.value = "";
}

function renderTask(task) {
  // function calls  createTaskElement(task)  rendertask() excecution pause
  const taskElement = createTaskElement(task);

  taskList.appendChild(taskElement);
}

// Create task html attributes li span
function createTaskElement(task) {
  const li = document.createElement("li");

  li.dataset.id = task.id;

  const span = document.createElement("span");

  span.textContent = task.text;

  li.appendChild(span);

  return li;
  //return lisst to the  createTaskElement()
}
