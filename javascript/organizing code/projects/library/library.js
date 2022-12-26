let library = [];

const booksContainer = document.querySelector("#list-container");
const modalContainer = document.querySelector("#modalContainer");
const alertContainer = document.querySelector("#alert");
const alertText = document.querySelector("#alert .alert-message");
const addBookModal = document.querySelector("#addBookModal");
const addBookBtn = document.querySelector("#addBookBtn");
const addBookFormData = {
  form: document.querySelector("#addBookForm"),
  titleField: document.querySelector("#addBookForm #titleField"),
  authorField: document.querySelector("#addBookForm #authorField"),
  pageCountField: document.querySelector("#addBookForm #pageCountField"),
  hasReadSelectField: document.querySelector(
    "#addBookForm #hasReadSelectField"
  ),
};

function showAlert(alertType, alertMessage) {
  alertContainer.classList.add("visible", alertType);
  alertText.textContent = alertMessage;

  setTimeout(() => {
    alertContainer.classList.remove("visible");
  }, 5000);
}

function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;
}

function bookInLibrary(book) {
  return library.some((newBook) => newBook.title === book.title);
}

function removeBook(book) {
  if (!bookInLibrary(book)) {
    showAlert(
      "error",
      `Cannot remove book ${book.title} as it does not exist.`
    );
    return;
  }

  library = library.filter((_book) => _book.title !== book.title);
  showAlert("success", `${book.title} removed!`);
  renderBooksList();
}

function toggleRead(book) {
  const bookRef = book;
  bookRef.hasRead = !book.hasRead;
  renderBooksList();
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

  removeBtn.onclick = () => removeBook(book);
  toggleReadBtn.onclick = () => toggleRead(book);

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
  if (!library.length) {
    const noBooksMessage = document.createElement("p");
    noBooksMessage.textContent = "There are no books in the library :(";
    noBooksMessage.classList.add("no-books-message");

    booksContainer.appendChild(noBooksMessage);

    return;
  }
  library.forEach((book) => {
    const listItem = createListItemForBook(book);
    booksContainer.appendChild(listItem);
  });
}

function addBookToLibrary(book) {
  if (bookInLibrary(book)) {
    showAlert("error", `"${book.title}" already exists in the library.`);
    return;
  }

  library.push(book);
  showAlert("success", `"${book.title}" has been added to the library.`);
  renderBooksList();
}

function populateDefaultData() {
  const books = [
    new Book("The Hobbit", "Idk who wrote this", 304, false),
    new Book("The Slof Book", "itsmeslof", 100, true),
  ];

  books.forEach((book) => {
    addBookToLibrary(book);
  });

  renderBooksList();
}

function closeAllModals() {
  modalContainer.classList.remove("visible");
  addBookModal.classList.remove("visible");
}

function showAddBookModal() {
  modalContainer.classList.add("visible");
  addBookModal.classList.add("visible");
}

function registerListeners() {
  addBookBtn.addEventListener("click", () => {
    showAddBookModal();
  });

  addBookFormData.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = addBookFormData.titleField.value;
    const author = addBookFormData.authorField.value;
    const pageCount = addBookFormData.pageCountField.value;
    const hasRead = addBookFormData.hasReadSelectField.value;

    addBookFormData.form.reset();

    const newBook = new Book(title, author, pageCount, hasRead);
    addBookToLibrary(newBook);

    closeAllModals();
    renderBooksList();
  });

  addBookModal.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalContainer.addEventListener("click", () => {
    closeAllModals();
  });
}

registerListeners();
populateDefaultData();
renderBooksList();
