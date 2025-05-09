"use strict";
import ToDo from "./ToDo.js";
import Container from "./Container.js";

// Initialising some data
const peeing = new ToDo("peeing", "betterment", "tomorrow", "low");
const walking = new ToDo(
  "walking",
  "fitness",
  "tomorrow",
  "low",
  "Remember to bring your equipment with you.",
  "I would like to walk a bit more to imporve my fitness."
);
const crafting = new ToDo("crafting", "betterment", "tomorrow", "low");
const appContainer = new Container([peeing]);
appContainer.toDoList = walking;
appContainer.toDoList = crafting;

appContainer.projectList = "crafting";
appContainer.projectList = "studying";
appContainer.projectList = "fitness";
appContainer.projectList = "betterment";

// Here we have all the methods relating to the DOM manipulation.

// Function that creats all the ToDos elements in the DOM
function createToDoElements(array = appContainer.toDoArray) {
  const toDoContainer = document.getElementById("to-do-container");
  if (toDoContainer.children) {
    toDoContainer.innerHTML = "";
  }
  if (array && array.length > 0) {
    array.forEach((x, index, array) => {
      // console.log(x);
      toDoContainer.appendChild(createToDo(x, index, array));
    });
  } else {
    const noToDosFoundContainer = document.createElement("div");
    noToDosFoundContainer.id = "no-to-dos-found";
    const noToDosFoundTitle = document.createElement("h3");
    noToDosFoundTitle.textContent = "No To Do found";
    noToDosFoundContainer.appendChild(noToDosFoundTitle);
    toDoContainer.appendChild(noToDosFoundContainer);
  }
}

//Function that takes the inputs value in the form and creates the toDo Objects
function addAToDo(event) {
  event.preventDefault();
  //console.log("I've prevented the default action!!!!");
  const titleInput = document.getElementById("title-input");
  const dueDateInput = document.getElementById("due-date-input");
  const prioritySelect = document.getElementById("priority-select");
  const projectSelect = document.getElementById("project-select");
  const descriptionInput = document.getElementById("description-input");
  const notesInput = document.getElementById("notes-input");
  if (titleInput.value) {
    const newToDo = new ToDo(
      titleInput.value,
      projectSelect.value,
      dueDateInput.value,
      prioritySelect.value,
      notesInput.value,
      descriptionInput.value
    );
    appContainer.toDoList = newToDo;
    const toDoContainer = document.getElementById("to-do-container");
    toDoContainer.appendChild(
      createToDo(
        newToDo,
        appContainer.toDoList.length - 1,
        appContainer.toDoList
      )
    );
    titleInput.value = "";
    projectSelect.value = "";
    dueDateInput.value = "";
    prioritySelect.value = "";
    notesInput.value = "";
    descriptionInput.value = "";
  }
}

// Creates the singular toDo Element
function createToDo(toDoInstance, index, array) {
  function deleteToDoInstance(e) {
    e.currentTarget.removeEventListener("click", deleteToDoInstance);
    /* console.log(e.currentTarget);
    console.log(index); */
    this.parentElement.remove();
    array.splice(index, 1);
    console.log(array);
    createToDoElements();
  }

  function editToDo(e) {
    function updateToDo(event) {
      event.preventDefault();
      const titleInput = document.getElementById("title-input");
      const dueDateInput = document.getElementById("due-date-input");
      const prioritySelect = document.getElementById("priority-select");
      const projectSelect = document.getElementById("project-select");
      const descriptionInput = document.getElementById("description-input");
      const notesInput = document.getElementById("notes-input");
      /* if (titleInput.value) {
      ); */
      const newToDo = new ToDo(
        titleInput.value,
        projectSelect.value,
        dueDateInput.value,
        prioritySelect.value,
        notesInput.value,
        descriptionInput.value
      );
      appContainer.editObject(index, newToDo);
      createToDoElements();
      titleInput.value = "";
      projectSelect.value = "";
      dueDateInput.value = "";
      prioritySelect.value = "";
      notesInput.value = "";
      descriptionInput.value = "";
      addToDoButton.addEventListener("click", addAToDo);
    }

    const title = document.getElementById("title-input");
    const dueDate = document.getElementById("due-date-input");
    const priority = document.getElementById("priority-select");
    const project = document.getElementById("project-select");
    const description = document.getElementById("description-input");
    const notes = document.getElementById("notes-input");
    /* console.log(this.parentElement.children);
    title.value = this.parentElement.children[0].textContent;
    const dueDate = document.getElementById("due-date-input"); */
    console.log(appContainer.toDoArray[index]);
    title.value = appContainer.toDoArray[index].title;
    dueDate.value = appContainer.toDoArray[index].dueDate;
    priority.value = appContainer.toDoArray[index].priority;
    if (appContainer.projectArray.includes(this.parentElement.children[3])) {
      project.value = appContainer.toDoArray[index].project;
    }
    description.value = "No descriptio has been added"
      ? ""
      : appContainer.toDoArray[index].description;
    notes.value = "No notes have been added"
      ? ""
      : appContainer.toDoArray[index].notes;
    const addToDoButton = document.getElementById("add-to-do-button");
    addToDoButton.removeEventListener("click", addAToDo);
    addToDoButton.addEventListener("click", updateToDo, { once: true });
  }

  // The function that sets the completedness of a task
  function setDone(event) {
    event.preventDefault();
    appContainer.toDoArray[index].completion =
      !appContainer.toDoArray[index].completion;
    console.log(
      `The task is ${
        appContainer.toDoArray[index].completion ? "complete" : "not complete"
      }`
    );
  }

  const toDoContainer = document.createElement("div");
  toDoContainer.classList.add("to-do");
  const toDoTitle = document.createElement("h5");
  toDoTitle.textContent = toDoInstance.title;
  toDoContainer.appendChild(toDoTitle);
  const toDoDueDate = document.createElement("p");
  toDoDueDate.textContent = toDoInstance.dueDate;
  toDoContainer.appendChild(toDoDueDate);
  const toDoPriority = document.createElement("p");
  toDoPriority.textContent = toDoInstance.priority;
  toDoContainer.appendChild(toDoPriority);
  const toDoProject = document.createElement("p");
  toDoProject.textContent = toDoInstance.project;
  toDoContainer.appendChild(toDoProject);
  const toDoDescription = document.createElement("p");
  toDoDescription.textContent = toDoInstance.description;
  toDoContainer.appendChild(toDoDescription);
  const toDoNotes = document.createElement("p");
  toDoNotes.textContent = toDoInstance.notes;
  toDoContainer.appendChild(toDoNotes);
  const toDoDeleteButton = document.createElement("button");
  toDoDeleteButton.textContent = "X";
  toDoDeleteButton.setAttribute("type", "button");
  const toDoEditButton = document.createElement("button");
  toDoEditButton.classList.add("to-do-edit-button");
  toDoEditButton.setAttribute("type", "button");
  toDoEditButton.textContent = "Edit";
  // The completion button.
  const toDoCompletionContainer = document.createElement("div");
  toDoCompletionContainer.classList.add("to-do-completion-container");
  const toDoCompletionButton = document.createElement("input");
  const toDoCompletionLabel = document.createElement("label");
  toDoCompletionLabel.classList.add("to-do-completion-label");
  toDoCompletionContainer.appendChild(toDoCompletionButton);
  toDoCompletionContainer.appendChild(toDoCompletionLabel);
  toDoCompletionLabel.textContent = "Completion State";
  toDoCompletionButton.setAttribute("type", "checkbox");
  toDoCompletionButton.classList.add("to-do-complete-button");
  //toDoCompletionButton.setAttribute("name", `completion-${index}`);
  toDoCompletionButton.setAttribute("value", "true");
  toDoContainer.prepend(toDoCompletionContainer);
  toDoContainer.appendChild(toDoDeleteButton);
  toDoContainer.appendChild(toDoEditButton);
  toDoDeleteButton.addEventListener("click", deleteToDoInstance);
  toDoInstance.completion
    ? (toDoCompletionButton.checked = true)
    : (toDoCompletionButton.checked = false);
  toDoEditButton.addEventListener("click", editToDo);
  toDoCompletionButton.addEventListener("change", setDone);
  return toDoContainer;
}

function createProjectOption(x) {
  const xOption = document.createElement("option");
  xOption.value = x;
  xOption.textContent = x;
  return xOption;
}

function createProjectLink(project) {
  const projectContainer = document.createElement("div");
  const projectTitle = document.createElement("h4");
  const projectIdentificationName = `project-${project}`;
  projectContainer.classList.add(projectIdentificationName);
  projectContainer.id = projectIdentificationName;
  projectContainer.classList.add("project-container");
  projectTitle.textContent = project;
  projectContainer.appendChild(projectTitle);
  // Filter event for the project links
  projectTitle.addEventListener("click", () => {
    createToDoElements(
      appContainer.toDoList.filter((x) => x.project === project)
    );
    console.log(appContainer.toDoList.filter((x) => x.project === project));
  });
  return projectContainer;
}

function addProject(e) {
  e.preventDefault();
  console.log("I've been clicked !!!");
  console.log(e.currentTarget);
  appContainer.projectList = document.getElementById("add-project-input").value;
  updateProjectsElements();
  document.getElementById("add-project-input").value = "";
}

function updateProjectsElements() {
  const projectSelect = document.getElementById("project-select");
  const projectAsideContainer = document.getElementById(
    "projects-aside-container"
  );
  projectSelect.innerHTML = "";
  projectAsideContainer.innerHTML = "";
  const nullOption = document.createElement("option");
  nullOption.setAttribute("value", "");
  nullOption.textContent = "--Choose a project--";
  projectSelect.appendChild(nullOption);
  appContainer.projectArray.forEach((x) => {
    // console.log(x);
    projectSelect.appendChild(createProjectOption(x));
    projectAsideContainer.appendChild(createProjectLink(x));
  });
}

function createForm(array) {
  const formContainer = document.getElementById("main-wrapper");
  const addToDoForm = document.createElement("form");
  addToDoForm.classList.add("add-to-do-form");
  addToDoForm.setAttribute("id", "add-to-do-form");
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("add-title-container");
  titleContainer.id = "add-title-container";
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "add-title-input");
  titleLabel.classList.add("add-title-label");
  titleLabel.id = "add-title-label";
  titleLabel.textContent = "Title: ";
  const titleInput = document.createElement("input");
  titleInput.classList.add("add-title-input");
  titleInput.setAttribute("id", "add-title-input");
  titleContainer.appendChild(titleLabel);
  titleContainer.appendChild(titleInput);
  addToDoForm.appendChild(titleContainer);
  // Creating the Due container input and everything correlated
  const dueDateContainer = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  const dueDateInput = document.createElement("input");
  formContainer.prepend(addToDoForm);
  formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    array.push();
  });
}

window.addEventListener("load", () => {
  console.log("The window is loaded");
  const addToDoButton = document.getElementById("add-to-do-button");
  const addProjectButton = document.getElementById("add-project-button");
  const asideHomeLink = document.getElementById("home-aside-link");
  asideHomeLink.addEventListener("click", () => createToDoElements());

  updateProjectsElements();
  createToDoElements();
  addToDoButton.addEventListener("click", addAToDo);
  addProjectButton.addEventListener("click", addProject);
  //createForm(appContainer);
});
