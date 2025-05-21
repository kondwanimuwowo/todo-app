import { format } from "date-fns"

let taskToggleHandler = null;

const projectNameInput = document.querySelector("#projectName");
const taskNameInput = document.querySelector("#taskName");
const taskDescriptionInput = document.querySelector("#taskDescription");
const taskDueDateInput = document.querySelector("#taskDueDate");
const taskPriorityInput = document.querySelector("#priority");
const addProjectModal = document.querySelector("#addProjectModal");
const addTaskModal = document.querySelector("#addTaskModal");


// Logic for handling the project modal
export function showProjectModal() {
	addProjectModal.classList.remove("hidden");
	projectNameInput.focus();
}

export function hideProjectModal() {
	addProjectModal.classList.add("hidden");
	projectNameInput.value = "";
}

export function getProjectData() {
	const projectName = projectNameInput.value.trim();
	return { projectName };
}

// Logic for handling the task modal
export function showTaskModal() {
	addTaskModal.classList.remove("hidden");
	taskNameInput.focus();
}

export function hideTaskModal() {
	addTaskModal.classList.add("hidden");
	taskNameInput.value = "";
	taskDescriptionInput.value = "";
	taskDueDateInput.value = "";
	taskPriorityInput.value = "";
}

export function getTaskData() {
	const taskName = taskNameInput.value.trim();
	const description = taskDescriptionInput.value.trim();
	const dueDate = taskDueDateInput.value.trim();
	const priority = parseInt(taskPriorityInput.value.trim());

	return { taskName, description, dueDate, priority };
}

export function highlightActiveProject(projectId) {
	const links = document.querySelectorAll(".project-link");
	const projectTitle = document.querySelector("#project-title-text");

	links.forEach(link => {
		link.classList.remove("active");

		if (link.getAttribute("data-project-id") === projectId.toString()) {
			link.classList.add("active");
			projectTitle.textContent = link.textContent;
		}
	});
}

export function bindProjectLinkClicks(callback) {
    const links = document.querySelectorAll(".project-link");
    links.forEach(link => {
        link.addEventListener("click", () => {
            const projectId = link.getAttribute("data-project-id");
            if (projectId) callback(projectId);
        });
    });
}

export function bindTaskToggleHandler(callback) {
    taskToggleHandler = callback;
}

export function renderProjects(projects) {
	const projectsContainer = document.querySelector(".project-list");

	if (!projectsContainer) {
		console.log("Element with class 'project-list' could not be found.");
		return;
	}

	projectsContainer.innerHTML = ``;
	const projectFragment = document.createDocumentFragment();

	projects.forEach(project => {
		const listProject = document.createElement("li");

		const projectLink = document.createElement("a");
		projectLink.className = "project-link";
		projectLink.textContent = project.projectName;
		projectLink.setAttribute("data-project-id", project.projectId);
		projectLink.href = "#";

		const removeProjectBtn = document.createElement("button");
		removeProjectBtn.className = "removeProjectBtn";
		removeProjectBtn.innerHTML = '<i class="fas fa-trash"></i>';
		removeProjectBtn.setAttribute("aria-label", `Delete ${project.projectName}`);
		removeProjectBtn.setAttribute("data-project-id", project.projectId);
		removeProjectBtn.setAttribute("data-project-id", project.projectId);
		removeProjectBtn.type = "button";

		listProject.appendChild(projectLink);
		listProject.appendChild(removeProjectBtn);
		projectFragment.appendChild(listProject);
	});
	
	projectsContainer.appendChild(projectFragment);
}

function priorityToStars(priority) {
  const starWrapper = document.createElement("div");

  for (let i = 1; i <= 3; i++) {
    const starIcon = document.createElement("i");
    if (i <= priority) {
      starIcon.className = "fas fa-star"; // solid full star
    } else {
      starIcon.className = "far fa-star"; // outlined star
    }
    starWrapper.appendChild(starIcon);
  }

  return starWrapper;
}


// Logic for rendering tasks
export function renderTasks(tasksArray) {
	const taskTable = document.querySelector("tbody");

	if(!taskTable) {
		console.log("No tbody element could be found");
		return;
	}

	taskTable.innerHTML = ``;

	const taskFragment = document.createDocumentFragment();

	tasksArray.forEach(task => {
		const tasksRow = document.createElement("tr");
		tasksRow.dataset.taskId = task.taskId;
		tasksRow.classList.toggle("completed", task.complete);
		tasksRow.classList.toggle("uncomplete", !task.complete);

		// Task Colunm
		const taskCol = document.createElement("td");
		const label = document.createElement("label");
		label.className = "checkbox-label";

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = task.complete;
		checkbox.addEventListener("change", () => {
    		if (typeof taskToggleHandler === "function") {
        		taskToggleHandler(task.taskId);
    		}
		});

		const taskInfo = document.createElement("div");
		taskInfo.classList = "task-info";

		const strong = document.createElement("strong");
		strong.textContent = task.taskName;

		const description = document.createElement("span");
		description.textContent = task.description;

		taskInfo.appendChild(strong);
		taskInfo.appendChild(description);

		label.appendChild(checkbox);
		label.appendChild(taskInfo);

		taskCol.appendChild(label);

		//Date Column
		const dateCol = document.createElement("td");
		const dateEle = document.createElement("time");

		// Format date and time separately
		const formattedDate = format(task.dueDate, "d LLLL, yyyy");
		const formattedTime = format(task.dueDate, "h:mm a");

		dateEle.textContent = formattedDate;

		const br = document.createElement("br");
		const timeEle = document.createElement("small");
		timeEle.textContent = formattedTime;

		dateEle.appendChild(br);
		dateEle.appendChild(timeEle);


		dateCol.appendChild(dateEle);

		//Priority
		const priorityCol = document.createElement("td");
		priorityCol.className = "priority-stars";

		const menuCol = document.createElement("td");
		const menuWrapper = document.createElement("div");
		menuWrapper.className = "menu-wrapper";

		const taskMenu = document.createElement("span");
		taskMenu.className = "task-menu";
		taskMenu.textContent = "⋮";

		const dropdown = document.createElement("div");
		dropdown.className = "task-dropdown hidden";
		dropdown.innerHTML = `
		  <button class="edit-task">Edit</button>
		  <button class="delete-task">Delete</button>
		`;

		menuWrapper.appendChild(taskMenu);
		menuWrapper.appendChild(dropdown);
		menuCol.appendChild(menuWrapper);


		priorityCol.appendChild(priorityToStars(task.priority));
		menuCol.appendChild(taskMenu);

		taskMenu.addEventListener("click", (e) => {
			e.stopPropagation(); // prevent event bubbling
			closeAllDropdowns(); // close other open dropdowns
			dropdown.classList.toggle("hidden");
		  });
		  

		// Append to the taskRow
		tasksRow.appendChild(taskCol);
		tasksRow.appendChild(dateCol);
		tasksRow.appendChild(priorityCol);
		tasksRow.appendChild(menuCol);

		taskFragment.appendChild(tasksRow);
	});

	taskTable.appendChild(taskFragment);

	function closeAllDropdowns() {
		document.querySelectorAll(".task-dropdown").forEach(drop => drop.classList.add("hidden"));
	  }
	  
	  // Optional: Close dropdowns on click outside
	  document.addEventListener("click", () => closeAllDropdowns());
	  
}
