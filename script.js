// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const tabButtons = document.querySelectorAll(".tab-button");
const taskLists = document.querySelectorAll(".task-list");

// Display tasks
function renderTasks() {
  taskLists.forEach(list => list.innerHTML = "");

  tasks.forEach((task, index) => {
    const list = document.getElementById(task.category);

    const li = document.createElement("li");
    li.className = `task-item ${task.done ? "done" : ""}`;

    li.innerHTML = `
      <span>${task.text} <span class="task-date">(${task.date || "No date"})</span></span>
      <div class="task-actions">
        <button class="complete-btn">✔</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    // Complete button
    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
    });

    // Delete button
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    list.appendChild(li);
  });
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Add new task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const category = taskCategory.value;

  if (text === "") return alert("Please enter a task!");

  tasks.push({ text, date, category, done: false });
  taskInput.value = "";
  taskDate.value = "";
  saveTasks();
});

// Switch tabs
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    taskLists.forEach(list => list.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.category).classList.add("active");
  });
});

// Initial render
renderTasks();
