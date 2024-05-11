// script.js

const form = document.getElementById("todo-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const todoList = document.getElementById("todo-list");

// Load TODOs from localStorage
const todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${todo.title}</h3><p>${todo.description}</p>`;
    todoList.appendChild(li);
  });
}

renderTodos();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  if (title === "" || description === "") return;
  todos.push({ title, description });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  titleInput.value = "";
  descriptionInput.value = "";
});
