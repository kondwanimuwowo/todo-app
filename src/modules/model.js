import { parseISO } from "date-fns";

export const projects = [];

export const projectIdGenerator = {
  _id: 0,
  next() {
    return ++this._id;
  },
  set(id) {
    this._id = id;
  },
};

export const taskIdGenerator = {
  _id: 0,
  next() {
    return ++this._id;
  },
  set(id) {
    this._id = id;
  },
};

export class Project {
  constructor(projectName, projectId = projectIdGenerator.next()) {
    this.projectName = projectName;
    this.projectId = projectId;
    this.tasks = [];
  }
}

export class Task {
  constructor(
    taskName,
    taskId = taskIdGenerator.next(),
    description,
    priority = 1,
    dueDate,
    complete = false
  ) {
    this.taskName = taskName;
    this.taskId = taskId;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate ? parseISO(dueDate) : null;
    this.complete = complete;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}

export function addProject(projectName) {
  const newProject = new Project(projectName);
  projects.push(newProject);
  return newProject;
}

export function removeProject(projectId) {
  const index = projects.findIndex((p) => p.projectId === projectId);
  if (index !== -1) {
    projects.splice(index, 1);
  }
}

export function addTaskToProject(
  projectId,
  taskName,
  description,
  priority = 1,
  dueDate,
  complete = false
) {
  const project = projects.find((p) => p.projectId === projectId);

  if (project) {
    const newTask = new Task(
      taskName,
      undefined,
      description,
      priority,
      dueDate
    );
    project.tasks.push(newTask);
    return newTask;
  }
}

export function removeTask(projectId, taskId) {
  const project = projects.find((p) => p.projectId === projectId);

  if (project) {
    project.tasks = project.tasks.filter((t) => t.taskId !== taskId);
  }
}

export function toggleTaskComplete(projectId, taskId) {
  const project = projects.find((p) => p.projectId === projectId);
  if (!project) return;

  const task = project.tasks.find((t) => t.taskId === taskId);
  if (task) {
    task.toggleComplete();
  }
}
