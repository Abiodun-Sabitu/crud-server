const fs = require(`fs`);
const path = require(`path`);
const { json } = require("stream/consumers");
const allBooksPath = path.join(__dirname, `books.json`);

function logFilePath() {
  console.log(allBooksPath);
}

// function convertToReadable(data) {
//   const convertedData = Buffer.from(data).toString("utf-8");
//   return convertedData;
// }

function getAllBooks() {
  const getContents = fs.readFileSync(allBooksPath, "utf8");
  return JSON.parse(getContents);
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
  fs.writeFileSync(allBooksPath, data);
  console.log(`success`);
}

function addBook(bookToAdd) {
  const books = getAllBooks();
  id = assignBookId(books);
  const newBook = { ...bookToAdd, id };
  books.push(newBook);
  console.log(books);
  updateCatalogue(JSON.stringify(books));
}

const bookToEdit = {
  title: "Ougadougou",
  author: "Brian Christian and Thomas L. Griffiths",
  year: 2017,
  id: 3,
};

function editBook(bookToEdit) {
  const books = getAllBooks();
  const indexOfBookToEdit = books.findIndex(
    (book) => book.id === bookToEdit.id
  );
  //console.log(books[indexOfBookToEdit])
  books[indexOfBookToEdit] = { ...books[indexOfBookToEdit], ...bookToEdit };
  //console.log(books)
  updateCatalogue(JSON.stringify(books));
}

// editBook(bookToEdit)

function deleteBook(bookToBeDeleted) {
  const books = getAllBooks();
  const indexOfBookToRemove = books.findIndex(
    (book) => book.id === bookToBeDeleted.id
  );
  books.splice(indexOfBookToRemove, 1);
  updateCatalogue(JSON.stringify(books))
}

deleteBook(bookToEdit);
