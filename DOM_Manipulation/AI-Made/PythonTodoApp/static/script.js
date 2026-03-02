document.addEventListener("DOMContentLoaded", () => {
  const todoItems = document.querySelectorAll(".todo-item");

  // Add staggered animation delay to list items
  todoItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Optional: Add client-side interactions if needed
  // For example, focusing the input on page load
  const taskInput = document.querySelector('input[name="title"]');
  if (taskInput) {
    taskInput.focus();
  }
});
