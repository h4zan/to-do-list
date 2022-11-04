import { Todos } from "./models/todos";

let titleWrapper = document.createElement("div");

titleWrapper.className = "title";
document.body.appendChild(titleWrapper);

let title = document.createElement("h3");
title.className = "title";
title.innerHTML = "To Do List";
titleWrapper.appendChild(title);

let taskWrapper = document.createElement("div");
taskWrapper.className = "taskWrapper";

let userinput = document.createElement("input");
userinput.className = "userinput";
userinput.setAttribute("type", "text");
userinput.placeholder = "Type Task Here ";

let taskContainer = document.createElement("div");
taskContainer.className = "taskContainer";

let addTask = document.createElement("button");
addTask.className = "addTask";
addTask.innerHTML = "Add Tasks";

let clearAll = document.createElement("button");
clearAll.className = "clearAll";
clearAll.innerHTML = "Clear Tasks";

let todosContainer = document.createElement("div");
todosContainer.id = "main";

document.body.appendChild(taskWrapper);
taskWrapper.appendChild(userinput);
taskContainer.appendChild(addTask);
taskContainer.appendChild(clearAll);
taskWrapper.appendChild(taskContainer);
taskWrapper.appendChild(todosContainer);

addTask.addEventListener("click", function () {
  if (userinput.value === "") {
    alert("Please Add Task Name!");
  } else {
    task.push(new Todos(userinput.value, false));
    createHtml();
    userinput.value = "";
  }
});

/* class Todos {
  constructor(task, done) {
    this.task = task;
    this.done = done;
  }
} */

let task = [
  new Todos("Eat", false),
  new Todos("Code", false),
  new Todos("Sleep", false),
];

//let task = ["Eat", "Code", "Sleep"];

function createHtml() {
  let main = document.getElementById("main");
  main.innerHTML = "";

  for (let i = 0; i < task.length; i++) {
    let container = document.createElement("div");
    let list = document.createElement("ul");
    let listItem = document.createElement("li");
    let deleteTask = document.createElement("button");
    let taskDone = document.createElement("button");

    container.className = "container";
    list.className = "list";
    listItem.className = "list";
    taskDone.className = "taskFinished";
    deleteTask.className = "deleteTask";

    main.appendChild(container);

    container.appendChild(list);
    list.appendChild(listItem);
    list.appendChild(taskDone);
    list.appendChild(deleteTask);

    taskDone.innerHTML = "Done";
    deleteTask.innerHTML = "X";

    listItem.innerHTML = task[i].task;

    taskDone.addEventListener("click", () => {
      if (task[i].done === false) {
        listItem.style.textDecoration = "line-through";
        task[i].done = true;
        console.log(task);
      }
    });

    taskDone.addEventListener("dblclick", () => {
      if (task[i].done === true) {
        listItem.style.textDecoration = "none";
        task[i].done = false;
      }
      console.log(task);
    });

    deleteTask.addEventListener("click", () => {
      const newTasks = task?.filter((clickToDelete) => {
        return clickToDelete !== task[i];
      });
      task = newTasks;

      createHtml();
      console.log(newTasks);
    });

    clearAll.addEventListener("click", function () {
      task = [];
      createHtml();
    });
  }
}

createHtml();
