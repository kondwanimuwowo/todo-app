
# 📚 To-Do App with Projects

A modern and modular to-do list application built with **vanilla JavaScript**, organized using the **MVC pattern**, bundled with **Webpack**, and styled for clarity and responsiveness.

---

## ✨ Features

- 🗂 **Project-Based Tasks** – Organize your todos by categories (e.g., Work, School, Gym)
- ✅ **Task Completion** – Mark tasks as complete/incomplete with a checkbox
- ⭐ **Priority System** – Set priorities with visual star indicators (Low, Medium, High)
- 🗓️ **Date & Time Support** – Due dates include both date and time (powered by `date-fns`)
- 💾 **Persistent Storage** – Tasks and projects persist with `localStorage`
- 🧹 **Modular Codebase** – Code is organized into reusable modules:
  - `model.js`, `view.js`, `controller.js`, `storage.js`
- 🖼️ **UI Modals** – Add projects and tasks via styled modal forms
- ⚙️ **Webpack + npm Scripts** – Project is bundled with Webpack for development and production

---

## 🏗️ Folder Structure

```
/src
  ├── index.js              # Entry file
  ├── model.js              # Classes and logic for projects/tasks
  ├── view.js               # DOM rendering logic
  ├── controller.js         # Event handling and app flow
  ├── storage.js            # LocalStorage handling
  ├── styles.css            # Clean, responsive CSS
  └── todo.html             # HTML structure
```

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
npm install
```

### 2. Run in Development Mode

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

Then open `dist/index.html` in your browser.

---

## 📦 Built With

- **JavaScript ES6+**
- **Webpack** – module bundler
- **date-fns** – date formatting
- **Font Awesome** – icons for priority stars and UI
- **localStorage** – data persistence

---

## 🔧 To-Do (Optional Enhancements)

- ⏳ Task editing functionality
- 🔍 Filter/sort tasks
- 📱 Mobile responsiveness improvements
- 🔔 Due date reminders

---

## 📸 Screenshots

_You can add images or GIFs here to show off the UI._

---

## 📝 License

This project is open-source and free to use under the [MIT License](LICENSE).
