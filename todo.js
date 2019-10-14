init();

var tasks = [];
var taskId = 0;
var subTaskId = 0;
var currentTask = "";
var currentSubTask = "";
var taskName = getElementById("sub-task-title");
var subTask = getElementById("sub-task");

function init() {
    addEventListeners(getElementById("open-nav"),"click",toggleMenu);
    addEventListeners(getElementById("new-task"),"click",openMenu);
    addEventListeners(getElementById("add-task"),"keyup",addTask);
    addEventListeners(getElementById("enter-task"),"keyup",addSubTask);
}

function getElementById(id) {
    return document.getElementById(id);
}

function addEventListeners(element,action,resultOperation) {
    element.addEventListener(action,resultOperation)
}

function getElementByClassName(className) {
    return document.getElementsByClassName(className);
}

function toggleMenu() {
    var toggleStatus = getElementById("menu");
    var sideBar = getElementById("side-nav");
    var categories = getElementByClassName("category-name");
    if ("close" == toggleStatus.value) {
        sideBar.setAttribute("class","side-nav side-nav-open");
        toggleStatus.value = "open";
        for (let category in categories) {
            categories[category].setAttribute("class","category-name category-name-show");
        }
    } else {
        sideBar.setAttribute("class","side-nav side-nav-close");
        toggleStatus.value = "close";
        for (let category in categories) {
            categories[category].setAttribute("class","category-name category-name-hide");
        }
    }
}

function openMenu() {
    var toggleStatus = getElementById("menu");
    var sideBar = getElementById("side-nav");
    var categories = getElementByClassName("category-name");
    if ("close" == toggleStatus.value) {
        sideBar.setAttribute("class","side-nav side-nav-open");
        toggleStatus.value = "open";
        for (let category in categories) {
            categories[category].setAttribute("class","category-name category-name-show");
        }
    }
}

function generateTaskId() {
    taskId++;
    return taskId;
}

function addTask(event) {
    var taskName = getElementById("add-task");
    console.log(taskName);
    if (13 === event.keyCode && "" !== taskName.value.trim()) {
        var task = {};
        task.id = generateTaskId();
        console.log(taskName.value);
        task.name = taskName.value;
        task.status = Boolean(true);
        task.subTasks = [];
        tasks.push(task);
        displayTask(task.name,task.id);     
        taskName.value="";
    }
}

function generateSubTaskId() {
    SubTaskId++;
    return subTaskId;
}

function addSubTask(event) {
    var subTaskName = getElementById("enter-task");
    console.log(subTaskName);
    if (13 === event.keyCode && "" !== subTaskName.value.trim()) {
        var subTask = {};
        subTask.id = generateSubTaskId();
        console.log(subTaskName.value);
        subTask.name = subTaskName.value;
        subTask.status = Boolean(true);
        subTask.steps = [];
        currentTask.subTasks.push(subTask);
        displayTask(task.name,task.id);     
        taskName.value="";
    }
}

function displayTask(name, id) {
    const text = `<div id=${id} onclick="getTaskDetails(id)">
                    <div class = "side-nav-category">
                        <span><img src = "images/bullet-list.svg"/></span>
                    <div class="category-name category-name-show ">${name}</div>
                  </div>`;
    const position = "beforeend";
    getElementById("task-list").insertAdjacentHTML(position, text, id);
}

function getTaskDetails(id) {
    
}