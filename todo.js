init();

let tasks = [];
let currentTask = {};
let currentSubTask = {};
let currentStep = {};
let id = 0;

/**
 * Initial method called, Contains the list of event listeners and their 
 * events with the corresponding methods called.
 */
function init() {
    addEventListeners(getElementById("open-nav"), "click", toggleMenu);
    addEventListeners(getElementById("new-task"), "click", openMenu);
    addEventListeners(getElementById("add-task"), "keyup", addTask);
    addEventListeners(getElementById("task-name"), "keyup", updateTask);
    addEventListeners(getElementById("add-sub-task"), "keyup", addSubTask);
    addEventListeners(getElementById("sub-task-name"), "keyup", updateSubTask);
    addEventListeners(getElementById("sub-task"), "click", openStepSpace);
    addEventListeners(getElementById("add-step"), "keyup", addStep);
}

/**
 * Generic method for adding event listeners
 * @param {Object} element for which listener is added
 * @param {String} action the event to be listened
 * @param {Function} resultOperation is the method to be called for
 *           the occuring event
 */
function addEventListeners(element, action, resultOperation) {
    element.addEventListener(action, resultOperation)
}

/**
 * Generic method for retrieving elements using Id in document
 * @param {Number} id whose element is retrived
 * @return {Object} element with corresponding id
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Generic method for getting list of elements using class name
 * @param {String} className whose elements are retrived
 * @return {Object} list of elements with corresponding class name 
 */
function getElementsByClassName(className) {
    return document.getElementsByClassName(className);
}

function createElement (elementName) {
    return document.createElement(elementName);
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

/**
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

/**
 * Generates the unique task id by incrementing a counter value
 * @return {Number} generated unique task id
 */
function generateId() {
    id++;
    return id;
}

/**
 * Adds a new task to the tasks list
 */
function addTask(event) {
    let taskName = getElementById("add-task");
    if (13 == event.keyCode && (taskName.value.trim())) {
        let task = {};
        task.id = generateId();
        task.name = taskName.value;
        task.status = Boolean(true);
        task.subTasks = [];
        tasks.push(task);
        currentTask = task;
        displayTask(currentTask);
        getTask(task.id);
        taskName.value = "";
    }
}

/**
 * Displays the added task in the side navigation bar
 * @param {Object} task to be displayed
 */
function displayTask(task) {
    let taskList = getElementById("task-list")
    let mainDiv = createElement("div");
    let flexDiv = createElement("div");
    let imageSpan = createElement("img")
    let nameDiv = createElement("div");
    mainDiv.setAttribute("id", task.id);
    mainDiv.setAttribute("onclick", "getTask(id)");
    flexDiv.setAttribute("class", "d-flex")
    imageSpan.setAttribute("src", "images/bullet-list.svg");
    nameDiv.setAttribute("class", "category-name category-name-show");
    nameDiv.textContent = task.name;
    mainDiv.appendChild(flexDiv);
    flexDiv.appendChild(imageSpan)
    flexDiv.appendChild(nameDiv);
    taskList.appendChild(mainDiv);
}

/**
 * Updates the current task name with new task name entered
 * @param {Object} event 
 */
function updateTask(event) {
    let newTask = getElementById("task-name").value;
    if ((13 == event.keyCode) && (newTask.trim())) {
        currentTask.name = newTask;
        getElementById("task-list").innerHTML = "";
        for (let task of tasks) {
            displayTask(task);
        }
    }
}

/**
 * Retrieves the task details with the given id
 * @param {Number} id of the task to be retrieved
 */
function getTask(id) {
    getElementById("sub-task").textContent = "";
    for (let task of tasks) {
        if (task.id === Number(id)) {
            currentTask = task;
            getElementById("task-name").value = task.name;
            for (let subTask of task.subTasks) {
                displaySubTask(subTask);
            }
        }
    }
}

/**
 * Adds a new sub task to the sub tasks list in a particular task
 */
function addSubTask(event) {
    let subTaskName = getElementById("add-sub-task");
    if (13 === event.keyCode && "" !== subTaskName.value.trim()) {
        let subTask = {};
        subTask.id = generateId();
        subTask.name = subTaskName.value;
        subTask.status = Boolean(true);
        subTask.steps = [];
        currentTask.subTasks.push(subTask);
        currentSubTask = subTask; 
        subTaskName.value = "";
        displaySubTask(subTask);
    }
}

/**
 * Displays the added sub task in the task space div
 * @param {Object} subTask to be displayed
 */
function displaySubTask(subTask) {
    let taskList = getElementById("sub-task")
    let listIndex = createElement("li");
    let mainDiv = createElement("div");
    let flexDiv = createElement("div");
    let imageSpan = createElement("img")
    let nameDiv = createElement("div");
    mainDiv.setAttribute("id", subTask.id);
    mainDiv.setAttribute("onclick", "getSubTask(id)");
    flexDiv.setAttribute("class", "d-flex");
    imageSpan.setAttribute("src", "images/circle.svg");
    imageSpan.setAttribute("class", "sub-task")
    nameDiv.setAttribute("class", "sub-task");
    nameDiv.textContent = subTask.name;
    listIndex.appendChild(mainDiv);
    mainDiv.appendChild(flexDiv);
    flexDiv.appendChild(imageSpan)
    flexDiv.appendChild(nameDiv);
    taskList.appendChild(mainDiv);
}

/**
 * Retrieves the sub task details with the given id
 * @param {Number} id of the task to be retrieved
 */
function getSubTask(id) {
    getElementById("step").textContent = "";
    for (let subTask of currentTask.subTasks) { 
        if (subTask.id === Number(id)) {
            currentSubTask = subTask; 
            getElementById("sub-task-name").value = subTask.name;
            for (let step of subTask.steps) {
                displayStep(step);
            }
        }
    }
}

/**
 * Updates the current sub task name with new sub task name entered
 * @param {Object} event 
 */
function updateSubTask(event) {
    let newSubTask = getElementById("sub-task-name").value;
    if ((13 == event.keyCode) && ("" !== newSubTask.trim())) {
        currentSubTask.name = newSubTask;
        getElementById("sub-task").innerHTML = "";
        for (let subTask of currentTask.subTasks) {
            displaySubTask(subTask);
        }
    }
}

/**
 * Opens the step space div to add spaces for adding steps to task
 * while clicking on the sub task name
 */
function openStepSpace(event) {
    let stepSpace = getElementById("step-space");
    stepSpace.setAttribute("class", "step-space step-space-open");
}

/**
 * Adds a new sub task to the sub tasks list in a particular task
 */
function addStep(event) {
    let stepName = getElementById("add-step");
    if (13 === event.keyCode && "" !== stepName.value.trim()) {
        let step = {};
        step.id = generateId();
        step.name = stepName.value;
        step.status = Boolean(true);
        currentSubTask.steps.push(step);  
        stepName.value = "";
        displayStep(step);
    }
}

/**
 * Displays the added step in the step space div
 * @param {Object} step to be displayed
 */
function displayStep (step) {
    let taskList = getElementById("step")
    let listIndex = createElement("li");
    let mainDiv = createElement("div");
    let flexDiv = createElement("div");
    let imageSpan = createElement("img")
    let nameDiv = createElement("div");
    mainDiv.setAttribute("id", step.id);
    mainDiv.setAttribute("onclick", "getStep(id)");
    flexDiv.setAttribute("class", "d-flex");
    imageSpan.setAttribute("src", "images/circle.svg");
    imageSpan.setAttribute("class", "sub-task")
    nameDiv.setAttribute("class", "sub-task");
    nameDiv.textContent = step.name;
    listIndex.appendChild(mainDiv);
    mainDiv.appendChild(flexDiv);
    flexDiv.appendChild(imageSpan)
    flexDiv.appendChild(nameDiv);
    taskList.appendChild(mainDiv);
}

/**
 * Retrieves the step details with the given id
 * @param {Number} id 
 */
function getStep(id) {
    for (let step of currentSubTask.steps) { 
        if (step.id === Number(id)) {
            currentStep = step; 
        }
    }
}