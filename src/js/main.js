/** @format */

import '../scss/main.scss';
import { Todos } from './models/todos';

let task = [
  new Todos('Eat', false),
  new Todos('Code', false),
  new Todos('Sleep', false),
];

const todosWrapper = document.createElement('div');
const titleWrapper = document.createElement('div');
const title = document.createElement('h3');
const taskWrapper = document.createElement('div');
const userinput = document.createElement('input');
const taskBtnContainer = document.createElement('div');
const addTask = document.createElement('button');
const clearAll = document.createElement('button');
const todosContainer = document.createElement('div');
todosWrapper.className = 'todos';
titleWrapper.className = 'todos__title';
title.className = 'todos__title__text';
taskWrapper.className = 'taskWrapper';
title.innerHTML = 'ToDo List';
userinput.className = 'userinput';
userinput.setAttribute('type', 'text');
userinput.placeholder = 'Type a task here';
taskBtnContainer.className = 'taskBtnContainer';
addTask.className = 'addTask, taskBtn';
addTask.innerHTML = 'Add Tasks';
addTask.type = 'button';
clearAll.className = 'clearAll,taskBtn';
clearAll.type = 'button';
clearAll.innerHTML = 'Clear Tasks';
todosContainer.className = 'allTodos';
titleWrapper.appendChild(title);
todosWrapper.appendChild(titleWrapper);
todosWrapper.appendChild(taskWrapper);
taskWrapper.appendChild(userinput);
taskBtnContainer.appendChild(addTask);
taskBtnContainer.appendChild(clearAll);
taskWrapper.appendChild(taskBtnContainer);
taskWrapper.appendChild(todosContainer);
document.body.appendChild(todosWrapper);

addTask.addEventListener('click', () => {
  if (userinput.value === '') {
    alert('Please add a task name!');
  } else {
    task.push(new Todos(userinput.value, false));
    createHtml();
    saveToLocalStorage();
    userinput.value = '';
  }
});

function createHtml() {
  const main = document.querySelector('.allTodos');
  main.innerHTML = '';

  for (let i = 0; i < task.length; i += 1) {
    const container = document.createElement('div');
    const list = document.createElement('div');
    const listItem = document.createElement('div');
    const btns = document.createElement('span');
    const deleteTask = document.createElement('button');
    const taskDone = document.createElement('button');

    container.className = 'taskContainer';
    list.className = 'tasks';
    listItem.className = 'taskname';
    btns.className = 'btns';
    taskDone.className = 'taskFinished';
    deleteTask.className = 'deleteTask';

    main.appendChild(container);

    container.appendChild(list);
    list.appendChild(listItem);
    btns.appendChild(taskDone);
    btns.appendChild(deleteTask);
    list.appendChild(btns);

    taskDone.type = 'button';
    deleteTask.type = 'button';
    taskDone.setAttribute('aria-label', 'Task Done');
    deleteTask.setAttribute('aria-label', 'Delete Task');

    listItem.innerHTML = task[i].task;

    const getTasks = localStorage.getItem('todos');

    taskDone.addEventListener('click', createTaskDone(listItem, task[i]));

    taskDone.addEventListener('dblclick', createTaskUndone(listItem, task[i]));

    deleteTask.addEventListener('click', createDeleteTask(listItem, task[i]));

    clearAll.addEventListener('click', createClearAll());
  }
}

createHtml();

function createTaskDone(listItem, taskItem) {
  return function taskDoneHandler() {
    if (taskItem.done === false) {
      listItem.style.textDecoration = 'line-through';
      taskItem.done = true;
    }
  };
}

function createTaskUndone(listItem, taskItem) {
  return function taskUndoneHandler() {
    if (taskItem.done === true) {
      listItem.style.textDecoration = 'none';
      taskItem.done = false;
    }
  };
}

function createDeleteTask(listItem, taskItem) {
  return function deleteTaskHandler() {
    const index = task.indexOf(taskItem);
    if (index !== -1) {
      task.splice(index, 1);
      listItem.parentNode.parentNode.remove();
      saveToLocalStorage();
    }
  };
}

function createClearAll() {
  return function clearAllHandler() {
    task = [];
    createHtml();
    saveToLocalStorage();
  };
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(task));
}

function loadFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    task = JSON.parse(savedTodos);
  }
}
window.addEventListener('load', () => {
  loadFromLocalStorage();
  createHtml();
});
