import { 
    renderProjects,
    renderTasks,
    showProjectModal,
    showTaskModal,
    getProjectData,
    getTaskData, 
    hideProjectModal, 
    hideTaskModal, 
    bindProjectLinkClicks,
    bindTaskToggleHandler,
    highlightActiveProject
} from "./view.js";

import { 
    addTaskToProject, 
    addProject, 
    toggleTaskComplete, 
    projects, 
    projectIdGenerator, 
    taskIdGenerator,
    removeProject
} from "./model.js";

import { saveProjects, loadProjects, STORAGE_KEY } from "./storage.js";

const addProjectModalBtn = document.querySelector(".add-project");
const hideProjectModalBtn = document.querySelector(".close-btn");
const projectModalForm = document.querySelector("#addProjectForm");
const taskModalForm = document.querySelector("#addTaskForm");
const addTaskModalBtn = document.querySelector(".add-task");
const hideTaskModalBtn = document.querySelector(".close-task-btn");
const removeProjectBtn = document.querySelector(".removeProjectBtn");

export function initApp() {
    // Always load first
    loadProjects();

    // Check if storage has ANY data (including empty array)
    const hasStorageEntry = localStorage.getItem(STORAGE_KEY) !== null;
    
    // Only create dummy projects if:
    // 1. There's NO storage entry at all (first visit)
    // 2. AND no projects exist
    if (!hasStorageEntry && projects.length === 0) {
        createInitialProjects();
        saveProjects();
    }

    // Render UI
    renderProjects(projects);
    
    if (projects.length > 0) {
        renderTasks(projects[0].tasks);
        highlightActiveProject(projects[0].projectId);
    } else {
        document.querySelector("tbody").innerHTML = "";
    }

    setUpEventListeners();
    bindProjectLinkClicks(setActiveProject);
    bindTaskToggleHandler(handleTaskToggle);
}

function setActiveProject(projectId) {
    highlightActiveProject(projectId);

    const selectedProject = projects.find(p => p.projectId.toString() === projectId.toString());
    if (selectedProject) {
        renderTasks(selectedProject.tasks);
    }
}

function handleTaskToggle(taskId) {
    const activeLink = document.querySelector(".project-link.active");
    if (!activeLink) return;

    const projectId = parseInt(activeLink.getAttribute("data-project-id"));

    toggleTaskComplete(projectId, parseInt(taskId));
    saveProjects();
    renderTasks(projects.find(p => p.projectId === projectId).tasks);
}

function handleProjectRemoval(projectId) {
    removeProject(Number(projectId));
    
    // Always save to maintain empty state
    saveProjects();
    
    // Update UI
    renderProjects(projects);
    
    if (projects.length > 0) {
        setActiveProject(projects[0].projectId);
    } else {
        document.querySelector("tbody").innerHTML = "";
    }
}

function createInitialProjects() {
    addProject("Getting Started");
    addProject("Website Design");
    addProject("Hello 1");

    addTaskToProject(
        projects[0].projectId,
        "Learn how to add a Project",
        "Learn how to add a project to DOIT by watching some videos",
        1,
        "2025-07-01"
    );
    addTaskToProject(
        projects[0].projectId,
        "Learn how to add a Task",
        "Learn how to add a task to DOIT by watching some videos",
        3,
        "2025-07-02"
    );
    addTaskToProject(
        projects[1].projectId,
        "Plan the UI/UX",
        "Draft out the UI/UX in Figma",
        3,
        "2025-08-10"
    );
    addTaskToProject(
        projects[2].projectId,
        "Hello",
        "Hello",
        2,
        "2025-09-10"
    );
}

function setUpEventListeners() {
    // Adding a project
    addProjectModalBtn.addEventListener("click", showProjectModal)

    projectModalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const { projectName } = getProjectData();
        const newProject = addProject(projectName);
        saveProjects();
        loadProjects();
        hideProjectModal();
        renderProjects(projects);
        highlightActiveProject(newProject.projectId);
        renderTasks(newProject.tasks);
        bindProjectLinkClicks(setActiveProject);
    })


    hideProjectModalBtn.addEventListener("click", hideProjectModal)

    // Adding task to project
    addTaskModalBtn.addEventListener("click", showTaskModal);

    taskModalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const { taskName, description, dueDate, priority } = getTaskData();

        // Validate dueDate
        if (!dueDate) {
            alert("Please select a due date.");
            return;
        }

        const activeLink = document.querySelector(".project-link.active");
        if (!activeLink) return;

        const projectId = parseInt(activeLink.getAttribute("data-project-id"));
        addTaskToProject(projectId, taskName, description, parseInt(priority), dueDate);

        saveProjects();
        hideTaskModal();

        const selectedProject = projects.find(p => p.projectId === projectId);
        if (selectedProject) {
            renderTasks(selectedProject.tasks);
        }
    });

    hideTaskModalBtn.addEventListener("click", hideTaskModal); 

    document.querySelector(".project-list").addEventListener("click", (e) => {
        if (e.target.closest(".removeProjectBtn")) {
            const projectId = e.target.closest(".removeProjectBtn").dataset.projectId;
            handleProjectRemoval(projectId);
        }
    });
}