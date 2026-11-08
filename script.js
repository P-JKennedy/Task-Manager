/*
Name: Peter-John Kennedy
ID: 2507390
Course: Web Programming
Lab Activity: Interactive Task Manager
Objective:
Build a persistent, interactive Task Manager Web Application
using semantic HTML5, modern CSS3, and Vanilla JavaScript.
*/

const taskform = document.getElementById("task-form"); //this select the form where use enter task.
const taskinput = document.getElementById("task-title");// selects the input.
const taskpriority = document.getElementById("task-priority");// selects the priority of the task.
const tasklist = document.getElementById("task-list");//selects where the task go 
console.log("Task Manager JS connected!");

let tasks = [];//this is an array that will hold the tasks.

function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadtasks() {
    const savedtasks = localStorage.getItem("tasks");

    if (savedtasks) {
        tasks = JSON.parse(savedtasks);
    }

    displaytasks();
}
function displaytasks() {
    tasklist.innerHTML = "";

    tasks.forEach(function(task) {
        const taskitem = document.createElement("div");

        taskitem.className = "task-item " + task.priority;

        if (task.completed) {
            taskitem.classList.add("completed");
        }

        const tasktitle = document.createElement("span");
        tasktitle.textContent = task.title;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.className = "toggle-btn";
        completeButton.type = "button";

        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            savetasks();
            displaytasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });
            savetasks();
            displaytasks();
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        taskitem.appendChild(tasktitle);
        taskitem.appendChild(actions);

        tasklist.appendChild(taskitem);
    });
}
taskform.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskinput.value.trim();
    const priority = taskpriority.value;

    if (title === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);

    savetasks();
    displaytasks();

    taskform.reset();

});
  loadtasks();