export const projects = [];

const projectIdGenerator = (function() {
    let id = 0;
    return function() {
        id += 1;
        return id
    }
})();

const taskIdGenerator = (function() {
    let id = 0;
    return function() {
        id += 1;
        return id
    }
})();

class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.projectId = projectIdGenerator();
        this.tasks = [];
    }
}

class Task {
    constructor(taskName, description, priority = 1, dueDate) {
        this.taskName = taskName;
        this.description = description;
        this.taskId = taskIdGenerator();
        this.priority = priority;
        this.dueDate = new Date(dueDate);
        this.complete = false;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}

function addProject(projectName) {
    const newProject = new Project(projectName);
    projects.push(newProject);
    return newProject;
}

function removeProject(projectId) {
    const index = projects.findIndex(p => p.projectId === projectId);
    if (index !== -1) {
        projects.splice(index, 1);
    }
}

function addTaskToProject(projectId, taskName, description, priority = 1, dueDate) {
    const project = projects.find(p => p.projectId === projectId);

    if (project) {
        const newTask = new Task(taskName, description, priority, dueDate);
        project.tasks.push(newTask);
        return newTask;
    }
}

function removeTask(projectId, taskId) {
    const project = projects.find(p => p.projectId === projectId);

    if (project) {
        project.tasks = project.tasks.filter(t => t.taskId !== taskId);
    }
}