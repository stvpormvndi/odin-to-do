export default class ToDo {
  constructor(
    title,
    project = null,
    dueDate = null,
    priority = "low",
    notes = "No notes have been added",
    description = "No description has been added.",
    completion = false
  ) {
    this.title = title;
    this.description = description
      ? description
      : "No description has been added.";
    this.dueDate = dueDate ? dueDate : "No Due Date";
    this.priority = priority ? priority : "low";
    this.notes = notes ? notes : "No notes have been added";
    this.project = project ? project : null;
    this.completion = completion;
    /* console.log(
      `Title: ${this.title}\nDescription: ${this.description}\nDue date: ${this.dueDate}\nPriority: ${this.priority}\nNotes: ${this.notes}\nProject: ${this.project}`
    ); */
  }
}
