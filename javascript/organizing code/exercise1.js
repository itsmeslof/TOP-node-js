// Exercise

// Write a constructor for making “Book” objects. We will revisit this in the project at the end of this lesson. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.

// Put a function into the constructor that can report the book info like so:

// theHobbit.info() // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"

// Note: It is almost always best to return things rather than putting console.log() directly into the function. In this case, return the info string and log it after the function has been called:

// console.log(theHobbit.info());

/// ///////////////////////////////////////// ///

function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;

  this.info = function _() {
    const isReadMessage = isRead ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${isReadMessage}`;
  };
}

const book = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(book.info());
