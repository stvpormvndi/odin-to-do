import ToDo from "./ToDo.js";
import Container from "./Container.js";

const peeing = new ToDo("peeing", "tomorrow", "low", "betterment");
const walking = new ToDo(
  "walking",
  "tomorrow",
  "low",
  "fitness",
  "Remember to bring your equipment with you.",
  "I would like to walk a bit more to imporve my fitness."
);
const crafting = new ToDo("crafting", "tomorrow", "low", "betterment");
const appContainer = new Container([peeing]);
appContainer.toDoList = walking;
appContainer.toDoList = crafting;

appContainer.projectList = "crafting";
appContainer.projectList = "studying";

function createToDo(toDoInstance, index, array) {
  function deleteToDoInstance(e) {
    e.currentTarget.removeEventListener("click", deleteToDoInstance);
    console.log(e.currentTarget);
    this.parentElement.remove();
    array.splice(index, 1);
    console.log(array);
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
  toDoContainer.appendChild(toDoDeleteButton);
  toDoDeleteButton.addEventListener("click", deleteToDoInstance);
  return toDoContainer;
}

function createProjectOption(x) {
  const xOption = document.createElement("option");
  xOption.value = x;
  xOption.textContent = x;
  return xOption;
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
  const toDoContainer = document.getElementById("main-wrapper");
  const projectSelect = document.getElementById("project-select");
  const addToDoButton = document.getElementById("add-to-do-button");
  appContainer.toDoArray.forEach((x, index, array) => {
    // console.log(x);
    toDoContainer.appendChild(createToDo(x, index, array));
  });
  appContainer.projectArray.forEach((x) => {
    // console.log(x);
    projectSelect.appendChild(createProjectOption(x));
  });
  addToDoButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("I've prevented the default action!!!!");
    const titleInput = document.getElementById("title-input");
    const dueDateInput = document.getElementById("due-date-input");
    const prioritySelect = document.getElementById("priority-select");
    const projectSelect = document.getElementById("project-select");
    const descriptionInput = document.getElementById("description-input");
    const notesInput = document.getElementById("notes-input");
    if (titleInput.value) {
      appContainer.toDoList = new ToDo(
        titleInput.value,
        projectSelect.value,
        dueDateInput.value,
        prioritySelect.value,
        notesInput.value,
        descriptionInput.value
      );
    }
  });
  //createForm(appContainer);
});
