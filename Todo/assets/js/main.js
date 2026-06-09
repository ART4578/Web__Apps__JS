class Todo {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];

        this.input = document.getElementById("todoInput");
        this.addBtn = document.getElementById("addBtn");
        this.list = document.getElementById("todoList");
        this.search = document.getElementById("searchInput");
        this.filter = document.getElementById("filter");
        this.themeBtn = document.getElementById("themeBtn");

        this.init();
    };

    init() {
        this.render();

        this.addBtn.addEventListener("click", () => this.addTodo());
        this.input.addEventListener("keydown", this.keyDown.bind(this));
        this.search.addEventListener("input", () => this.render());
        this.filter.addEventListener("change", () => this.render());
        this.themeBtn.addEventListener("click", () => this.toggleTheme());
        this.list.addEventListener("click", this.handleListClick.bind(this));
    };

    keyDown(e) {
        if (e.key === "Enter") {
            this.addTodo();
        };
    };

    addTodo() {
        const text = this.input.value.trim();

        if (!text) return;

        this.todos.push({
            id: Date.now(),
            text,
            completed: false
        });

        this.save();
        this.input.value = "";
        this.render();
    };

    handleListClick(e) {
        const id = Number(e.target.dataset.id);

        if (e.target.classList.contains("toggle-btn")) {
            this.toggle(id);
        };

        if (e.target.classList.contains("delete-btn")) {
            this.removeTodo(id);
        };
    };

    toggle(id) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            };

            return todo;
        });

        this.save();
        this.render();
    };

    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);

        this.save();
        this.render();
    };

    save() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };

    render() {
        this.list.innerHTML = "";

        let todos = [...this.todos];

        const searchValue = this.search.value.toLowerCase();

        todos = todos.filter((todo) => todo.text.toLowerCase().includes(searchValue));

        const filterValue = this.filter.value;

        if (filterValue === "active") {
            todos = todos.filter((todo) => !todo.completed);
        };

        if (filterValue === "completed") {
            todos = todos.filter((todo) => todo.completed);
        };

        todos.forEach((todo) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${todo.completed ? "done" : ""}">${todo.text}</span>
                <div>
                    <button class="toggle-btn" data-id="${todo.id}">✓</button>
                    <button class="delete-btn" data-id="${todo.id}">✕</button>
                </div>
            `;

            this.list.appendChild(li);
        });
    };

    toggleTheme() {
        document.body.classList.toggle("dark");
    };
};

document.addEventListener("DOMContentLoaded", () => new Todo());