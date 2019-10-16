init();

let tasks = [];
let taskId = 1;
let subTaskId = 1;

/**
 * Initial method called, Contains the list of event listeners and their 
 * events with the corresponding methods called.
 */
function init() {
    addEventListeners(getElementById("open-nav"), "click", toggleMenu);
    addEventListeners(getElementById("new-task"), "click", openMenu);
    addEventListeners(getElementById("add-task"), "keyup", addTask);
    addEventListeners(getElementById("add-sub-task"), "keyup", addSubTask);
    addEventListeners(getElementById("sub-task"), "click", openStepSpace);
    addEventListeners(getElementById("add-step"), "keyup", addStep);
}

/**
 * Generic method for adding event listeners
 * @param {} element for which listener is added
 * @param {} action the event to be listened
 * @param {} resultOperation is the method to be called for
 *           the occuring event
 */
function addEventListeners(element, action, resultOperation) {
    element.addEventListener(action, resultOperation)
}

/**
 * Generic method for retrieving elements using Id in document
 * @param {} id whose element is retrived
 * @return {} element with corresponding id
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Generic method for getting list of elements using class name
 * @param {} className whose elements are retrived
 * @return {} list of elements with corresponding class name 
 */
function getElementsByClassName(className) {
    return document.getElementsByClassName(className);
}

/**
 * Toggles the side navigation bar with width increased and decreased
 * and options displayed and hidden for open and close correspondingly
 */
function toggleMenu() {
    let toggleStatus = getElementById("menu");
    let sideBar = getElementById("side-nav");
    let categories = getElementsByClassName("category-name");
    if ("close" == toggleStatus.value) {
        sideBar.setAttribute("class", "side-nav side-nav-open");
        toggleStatus.value = "open";
        for (let category of categories) {
            category.setAttribute("class", "category-name category-name-show");
        }
    } else {
        sideBar.setAttribute("class", "side-nav side-nav-close");
        toggleStatus.value = "close";
        for (let category of categories) {
            category.setAttribute("class", "category-name category-name-hide");
        }
    }
}

/*
 * Opens the side navigation bar by increasing the width and diplaying
 * the options
 */
function openMenu() {
    let toggleStatus = getElementById("menu");
    let sideBar = getElementById("side-nav");
    let categories = getElementsByClassName("category-name");
    if ("close" == toggleStatus.value) {
        sideBar.setAttribute("class", "side-nav side-nav-open");
        toggleStatus.value = "open";
        for (let category of categories) {
            category.setAttribute("class", "category-name category-name-show");
        }
    }
}

/*
 * Generates the unique task id by incrementing a counter value
 * @return {} generated unique task id
 */
function generateTaskId() {
    taskId++;
    return taskId;
}

/*
 * Adds a new task to the tasks list
 */
function addTask(event) {
    let taskName = getElementById("add-task");
    if (13 === event.keyCode && "" !== taskName.value.trim()) {
        let task = {};
        task.id = generateTaskId();
        task.name = taskName.value;
        task.status = Boolean(true);
        task.subTasks = [];
        tasks.push(task);
        displayTask(task);
        getTask(task.id);
        taskName.value = "";
    }
}

/*
 * Displays the added task in the side navigation bar
 * @param {} task to be displayed
 */
function displayTask(task) {
    const text = `<div id=${task.id} onclick="getTask(id)">
                    <div class = "d-flex">
                        <span>
                            <img src = "images/bullet-list.svg"/>
                        </span>
                        <div id = "category-name" class="category-name category-name-show ">
                            ${task.name}
                        </div>
                    </div>
                  </div>`;
    const position = "beforeend";
    getElementById("task-list").insertAdjacentHTML(position, text, task);
}

/*
 * Retrieves the task details with the given id
 * @param {} id of the task to be retrieved
 */
function getTask(id) {
    getElementById("sub-task").textContent = "";
    for (let task of tasks) {
        if (task.id === Number(id)) {
            getElementById("task-name").value = task.name;
            getElementById("task-title").value = task;
            for (let subTask of task.subTasks) {
                displaySubTask(subTask);
            }
        }
    }
}

/*
 * Generates the unique sub task id by incrementing a counter value
 * @return {} generated unique sub task id
 */
function generateSubTaskId() {
    subTaskId++;
    return subTaskId;
}

/*
 * Adds a new sub task to the sub tasks list in a particular task
 */
function addSubTask(event) {
    let subTaskName = getElementById("add-sub-task");
    if (13 === event.keyCode && "" !== subTaskName.value.trim()) {
        let task = getElementById("task-title").value;
        let subTask = {};
        subTask.id = generateSubTaskId();
        subTask.name = subTaskName.value;
        subTask.status = Boolean(true);
        subTask.steps = [];
        task.subTasks.push(subTask);  
        subTaskName.value = "";
        displaySubTask(subTask);
    }
}

/*
 * Displays the added sub task in the task space div
 * @param {} subTask to be displayed
 */
function displaySubTask(subTask) {
    const text = `<li>
                    <div id=${subTask.id} onclick="getSubTask(id)">
                        <div class = "d-flex">
                            <span>
                                <img src = "images/circle.svg"/>
                            </span>
                            <div id = "sub-task-name">
                                ${subTask.name}
                            </div>
                        </div>
                    </div>
                  </li>`;
    const position = "beforeend";
    getElementById("sub-task").insertAdjacentHTML(position, text, subTask.id);
}

/*
 * Retrieves the sub task details with the given id
 * @param {} id of the task to be retrieved
 */
function getSubTask(id) {
    getElementById("step").textContent = "";
    for (let task of tasks) {
        for (let subTask of task.subTasks) { 
            if (subTask.id === Number(id)) {
                getElementById("task-name").value = subTask.name;
                getElementById("sub-task-title").value = subTask;
                for (let step of subTask.steps) {
                    displayStep(step);
                }
            }
        }
    }
}

/*
 * Opens the step space div to add spaces for adding steps to task
 * while clicking on the sub task name
 */
function openStepSpace(event) {
    let stepSpace = getElementById("step-space");
    stepSpace.setAttribute("class", "step-space step-space-open");
}

/*
 * Adds a new sub task to the sub tasks list in a particular task
 */
function addStep(event) {
    let stepName = getElementById("add-step");
    if (13 === event.keyCode && "" !== stepName.value.trim()) {
        let subTask = getElementById("sub-task-title").value;
        let step = {};
        step.name = stepName.value;
        step.status = Boolean(true);
        subTask.steps.push(step);  
        stepName.value = "";
        displayStep(step);
    }
}

/*
 * Displays the added step in the step space div
 * @param {} step to be displayed
 */
function displayStep (step) {
    const text = `<li>
                    <div id=${step.id}>
                      <div class = "d-flex">
                        <span>
                          <img src = "images/circle.svg"/>
                        </span>
                        <div id = "step-name" >
                          ${step.name}
                        </div>
                      </div>
                    </div>
                  </li>`;
    const position = "beforeend";
    getElementById("step").insertAdjacentHTML(position, text, step.id);
}

