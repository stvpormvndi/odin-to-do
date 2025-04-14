export default class ToDo {
  constructor(
    title,
    dueDate,
    priority,
    project,
    notes = "No notes have been added",
    description = "No description has been added."
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.project = project;
    /* console.log(
      `Title: ${this.title}\nDescription: ${this.description}\nDue date: ${this.dueDate}\nPriority: ${this.priority}\nNotes: ${this.notes}\nProject: ${this.project}`
    ); */
  }
}
