const fs = require(`fs`);
const path = require(`path`);
const { json } = require("stream/consumers");
const allBooksPath = path.join(__dirname, `books.json`);

function logFilePath() {
  console.log(allBooksPath);
}

function getAllBooks() {
 try {
   const getContents = fs.readFileSync(allBooksPath, "utf8");
  console.log(JSON.parse(getContents)) 
  return JSON.parse(getContents);
 } catch (error) {
  console.log(error)
  return error
 }
  //  console.log(getContents)
}

function assignBookId(books) {
  const bookId = books.reduce((maxIDSoFar, currentBook) => {
    if (currentBook.id > maxIDSoFar) {
      return currentBook.id;
    } else {
      return maxIDSoFar;
    }
  }, 0);
  return bookId + 1;
}

function updateCatalogue(data) {
  fs.writeFile(allBooksPath, data, (err) => {
    err
      ? console.log(`operation not successful: catalogue wasn't updated `)
      : console.log(`operation successful: catalogue has been refreshed! `);
  });
  // fs.writeFileSync(allBooksPath, data);
  // console.log(`operation successful: catalogue has been refreshed! `);
}

function addBook(bookToAdd) {
  const books = getAllBooks();
  id = assignBookId(books);
  const newBook = { ...bookToAdd, id };
  books.push(newBook);
  console.log(books);
  updateCatalogue(JSON.stringify(books));
}

function editBook(bookToEdit) {
  const books = getAllBooks();
  const indexOfBookToEdit = books.findIndex(
    (book) => book.id === bookToEdit.id
  );
  if (indexOfBookToEdit === -1) {
    console.log(`cannot find the book you want to edit`);
    return;
  }
  //console.log(books[indexOfBookToEdit])
  books[indexOfBookToEdit] = { ...books[indexOfBookToEdit], ...bookToEdit };
  //console.log(books)
  updateCatalogue(JSON.stringify(books));
}


function deleteBook(bookToBeDeleted) {
  const idOfBookToBeDeleted = bookToBeDeleted.id
  console.log(idOfBookToBeDeleted)
  const books = getAllBooks();
  const indexOfBookToRemove = books.findIndex(
    (book) => book.id === idOfBookToBeDeleted
  );
  console.log(indexOfBookToRemove)
  if (indexOfBookToRemove === -1) {
    console.log(`cannot find the book you want to delete`);
    return;
  }
  books.splice(indexOfBookToRemove, 1);
  updateCatalogue(JSON.stringify(books));
}



module.exports = {
logFilePath,
getAllBooks,
addBook,
editBook,
deleteBook
}
