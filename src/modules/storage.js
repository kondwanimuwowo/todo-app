import { projects, Project, Task, projectIdGenerator, taskIdGenerator } from "./model.js"

export const STORAGE_KEY = "projectData";

export function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) return undefined; // No data exists
    
    const parsedData = JSON.parse(data);
    projects.length = 0;

    // Load projects and tasks
    parsedData.forEach(projData => {
        const project = new Project(projData.projectName, projData.projectId);
        project.tasks = projData.tasks.map(taskData => {
            return new Task(
                taskData.taskName,
                taskData.taskId,
                taskData.description,
                taskData.priority,
                taskData.dueDate,
                taskData.complete
            );
        });
        projects.push(project);
    });

    // Reset ID generators to avoid duplicates
    const maxProjectId = parsedData.reduce((max, p) => Math.max(max, p.projectId), 0);
    projectIdGenerator.set(maxProjectId);

    const allTaskIds = parsedData.flatMap(p => p.tasks.map(t => t.taskId));
    const maxTaskId = allTaskIds.length > 0 ? Math.max(...allTaskIds) : 0;
    taskIdGenerator.set(maxTaskId);

    return parsedData;
}