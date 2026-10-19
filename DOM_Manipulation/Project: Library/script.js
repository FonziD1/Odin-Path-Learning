const myLibrary = [];

function Book(title, author, genre, pages, read, cover = "") {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
  this.cover = cover;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "Read" : "Not Read"}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const theHobbit = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  "Fantasy",
  310,
  true,
  "images/hobbit.jpg",
);

const theLordOfTheRings = new Book(
  "The Lord of the Rings",
  "J.R.R. Tolkien",
  "Fantasy",
  1178,
  true,
  "images/lotr.jpg",
);

const theSilmarillion = new Book(
  "The Silmarillion",
  "J.R.R. Tolkien",
  "Fantasy",
  365,
  true,
  "images/silmarillion.jpg",
);

const Mistborn = new Book(
  "Mistborn: The Final Empire",
  "Brandon Sanderson",
  "Fantasy",
  541,
  true,
  "images/mistborn.jpg",
);

const Dune = new Book(
  "Dune",
  "Frank Herbert",
  "Science Fiction",
  412,
  false,
  "images/dune.jpg",
);

const theNameOfTheWind = new Book(
  "The Name of the Wind",
  "Patrick Rothfuss",
  "Fantasy",
  662,
  false,
  "images/name-of-the-wind.jpg",
);

addBookToLibrary(theHobbit);
addBookToLibrary(theLordOfTheRings);
addBookToLibrary(theSilmarillion);
addBookToLibrary(Mistborn);
addBookToLibrary(Dune);
addBookToLibrary(theNameOfTheWind);

let searchTerm = "";
let statusFilter = "all";

function matchesFilters(book) {
  const term = searchTerm.toLowerCase();

  const matchesText =
    book.title.toLowerCase().includes(term) ||
    book.author.toLowerCase().includes(term) ||
    (book.genre || "").toLowerCase().includes(term) ||
    String(book.pages).includes(term);

  const matchesStatus =
    statusFilter === "all" ||
    (statusFilter === "read" && book.read) ||
    (statusFilter === "not-read" && !book.read);

  return matchesText && matchesStatus;
}

function render() {
  console.table(myLibrary);

  if (typeof document === "undefined") return;

  const bookContainer = document.getElementById("book-container");
  if (!bookContainer) return;

  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    if (!matchesFilters(book)) return;

    const card = document.createElement("div");
    card.classList.add("book-card");

    const coverHtml = book.cover
      ? `<div class="book-cover-wrap">
           <img src="${book.cover}" alt="${book.title} cover" class="book-cover-img" loading="lazy">
         </div>`
      : `<div class="book-cover-wrap book-cover-placeholder">
           <span class="placeholder-icon">📖</span>
           <span class="placeholder-title">${book.title}</span>
         </div>`;

    card.innerHTML = `
      ${coverHtml}
      <div class="book-card-content">
        <div class="book-card-header">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">by ${book.author}</p>
        </div>
        <div class="book-details">
          ${book.genre ? `<span class="book-genre">${book.genre}</span>` : ""}
          <span class="book-pages">${book.pages} pages</span>
          <span class="status-badge ${book.read ? "read" : "not-read"}">
            ${book.read ? "✓ Read" : "✕ Not Read"}
          </span>
        </div>
        <div class="card-actions">
          <button class="toggle-read-btn" data-index="${index}">
            Mark as ${book.read ? "Unread" : "Read"}
          </button>
          <button class="delete-book-btn" data-index="${index}">Delete</button>
        </div>
      </div>
    `;

    // Toggle Read Button
    const toggleBtn = card.querySelector(".toggle-read-btn");
    toggleBtn.addEventListener("click", () => {
      book.read = !book.read;
      render();
    });

    // Delete Book Button
    const deleteBtn = card.querySelector(".delete-book-btn");
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      render();
    });

    bookContainer.appendChild(card);
  });
}

// DOM Initialization & Event Listeners
if (typeof document !== "undefined") {
  function init() {
    const searchInput = document.getElementById("search-input");
    const statusSelect = document.getElementById("status-filter");

    searchInput?.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim();
      render();
    });

    statusSelect?.addEventListener("change", (e) => {
      statusFilter = e.target.value;
      render();
    });

    let toggleFormBtn = document.getElementById("toggle-form-btn");
    const addBookForm = document.getElementById("add-book-form");
    const cancelBtn = document.getElementById("cancel-btn");

    if (addBookForm) {
      // Ensure the form is hidden by default on load
      addBookForm.classList.add("hidden");

      // If the toggle button isn't in HTML, automatically create it
      if (!toggleFormBtn) {
        toggleFormBtn = document.createElement("button");
        toggleFormBtn.type = "button";
        toggleFormBtn.id = "toggle-form-btn";
        toggleFormBtn.className = "toggle-form-btn";
        toggleFormBtn.textContent = "+ Add a Book";
        addBookForm.parentNode.insertBefore(toggleFormBtn, addBookForm);
      }

      // Toggle Add Book form visibility
      toggleFormBtn.addEventListener("click", () => {
        addBookForm.classList.toggle("hidden");
        const isHidden = addBookForm.classList.contains("hidden");
        toggleFormBtn.textContent = isHidden ? "+ Add a Book" : "− Close Form";
      });

      // Cancel / close form
      cancelBtn?.addEventListener("click", () => {
        addBookForm.classList.add("hidden");
        toggleFormBtn.textContent = "+ Add a Book";
      });

      // Handle form submit
      addBookForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const genre = document.getElementById("genre").value.trim();
        const pages = Number(document.getElementById("pages").value);
        const read = document.getElementById("read").checked;
        const coverInput = document.getElementById("cover");
        const cover = coverInput ? coverInput.value.trim() : "";

        if (!title || !author || !pages) return;

        const newBook = new Book(title, author, genre, pages, read, cover);
        addBookToLibrary(newBook);

        addBookForm.reset();
        addBookForm.classList.add("hidden");
        toggleFormBtn.textContent = "+ Add a Book";

        render();
      });
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
} else {
  render();
}
