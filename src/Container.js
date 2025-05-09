export default class Container {
  constructor(toDoArray = [], projectArray = []) {
    this.toDoArray = toDoArray;
    this.projectArray = projectArray;
    //console.log(`The container is initialized\nToDos: ${toDoArray}`);
  }

  get toDoList() {
    return this.toDoArray;
  }

  set toDoList(toDoAction) {
    this.toDoArray.push(toDoAction);
    /* console.log("The To Do list has been updated!");
    console.log(this.toDoArray); */
  }

  get projectList() {
    return this.projectList;
  }

  set projectList(project) {
    this.projectArray.push(project);
  }

  displayToDoArray() {
    console.log(this.toDoArray);
  }

  deleteObject(index) {
    this.toDoArray.splice(index, 1);
  }

  editObject(index, object) {
    this.toDoArray.splice(index, 1, object);
  }

  returnByProject(projectName) {
    let returnArray = [];
    for (let i = 0; i < this.toDoArray.length; i++) {
      if (this.toDoArray[i].project === projectName) {
        returnArray.push(this.toDoArray[i]);
      }
    }
    return returnArray;
  }
}
