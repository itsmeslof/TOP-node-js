const library = [];

const booksContainer = document.querySelector("#list-container");
const modalContainer = document.querySelector("#modalContainer");
const addBookModal = document.querySelector("#addBookModal");
const addBookBtn = document.querySelector("#addBookBtn");

function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;
}

function bookInLibrary(book) {
  return library.some((newBook) => newBook.title === book.title);
}

function clearBooksList() {
  booksContainer.innerHTML = "";
}

function createListItemForBook(book) {
  const listItem = document.createElement("div");
  const title = document.createElement("p");

  const detailsWrapper = document.createElement("div");
  const detailsGroup = document.createElement("div");
  const author = document.createElement("p");
  const pageCount = document.createElement("p");
  const hasRead = document.createElement("p");

  const actionsGroup = document.createElement("div");
  const removeBtn = document.createElement("button");
  const toggleReadBtn = document.createElement("button");

  // Don't forget click events for removeBtn and toggleReadBtn

  title.textContent = book.title;
  author.textContent = book.author;
  pageCount.textContent = `Pages: ${book.pageCount}`;

  const hasReadText = book.hasRead ? "Read" : "Unread";
  hasRead.textContent = `Status: ${hasReadText}`;

  removeBtn.textContent = "Remove From Library";

  listItem.classList.add("list-item");
  title.classList.add("book-title", "white");
  detailsGroup.classList.add("book-details");
  author.classList.add("book-author", "white");
  pageCount.classList.add("page-count", "white");
  hasRead.classList.add("read-badge", "white");

  actionsGroup.classList.add("book-actions");
  removeBtn.classList.add("remove-btn");
  toggleReadBtn.classList.add("toggle-read-btn");

  if (book.hasRead) {
    toggleReadBtn.classList.add("has-read");
    toggleReadBtn.textContent = "Mark As Unread";
  } else {
    toggleReadBtn.classList.add("unread");
    toggleReadBtn.textContent = "Mark As Read";
  }

  detailsGroup.appendChild(author);
  detailsGroup.appendChild(pageCount);
  detailsGroup.appendChild(hasRead);

  detailsWrapper.appendChild(title);
  detailsWrapper.appendChild(detailsGroup);

  actionsGroup.appendChild(toggleReadBtn);
  actionsGroup.appendChild(removeBtn);

  listItem.appendChild(detailsWrapper);
  listItem.appendChild(actionsGroup);

  return listItem;
}

function renderBooksList() {
  clearBooksList();
  library.forEach((book) => {
    const listItem = createListItemForBook(book);
    booksContainer.appendChild(listItem);
  });
}

function addBookToLibrary(book) {
  if (bookInLibrary(book)) {
    alert("Error: book exists!");
    return;
  }

  library.push(book);
  renderBooksList();
}

function populateDefaultData() {
  const books = [
    new Book("The Hobbit", "Idk who wrote this lol", 352, false),
    new Book("The Slof Book", "itsmeslof", 69, true),
  ];

  books.forEach((book) => {
    addBookToLibrary(book);
  });

  renderBooksList();
}

function showAddBookModal() {
  modalContainer.classList.add("visible");
  addBookModal.classList.add("visible");
}

function registerListeners() {
  addBookBtn.addEventListener("click", () => {
    showAddBookModal();
  });

  modalContainer.addEventListener("click", () => {
    // closeAllModals();
    modalContainer.classList.remove("visible");
  });
}

registerListeners();
populateDefaultData();
renderBooksList();
