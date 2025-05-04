import { projects } from "../modules/model.js"

export function saveProjects() {
    localStorage.setItem("todoData", JSON.stringify(projects));
}

export function loadProjects() {
    const stored = localStorage.getItem("todoData");
    projects = stored ? JSON.parse(stored) : [];
}