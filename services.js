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
  //console.log(JSON.parse(getContents)) 
  return JSON.parse(getContents);
 } catch (error) {
  //console.log('ff',error)
  throw error; 
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
  return new Promise((resolve, reject) => {
    fs.writeFile(allBooksPath, data, (err) => {
      if (err) {
        console.log(`operation not successful: catalogue wasn't updated`);
        return reject(err);
      }
      console.log(`operation successful: catalogue has been refreshed!`);
      resolve(getAllBooks());
    });
  });
}

function addBook(bookToAdd) {
  const books = getAllBooks();
  id = assignBookId(books);
  const newBook = { ...bookToAdd, id };
  books.push(newBook);
  //console.log(books);
 return updateCatalogue(JSON.stringify(books));
}

function editBook(bookToEdit) {
  const books = getAllBooks();
  const indexOfBookToEdit = books.findIndex(
    (book) => book.id === bookToEdit.id
  );
  if (indexOfBookToEdit === -1) {
    console.log(`cannot find the book you want to edit`);
    throw new Error(`cannot find the book you want to edit`)
    
  }
  //console.log(books[indexOfBookToEdit])
  books[indexOfBookToEdit] = { ...books[indexOfBookToEdit], ...bookToEdit };
  //console.log(books)
 return updateCatalogue(JSON.stringify(books));
}


function deleteBook(bookToBeDeleted) {
  const idOfBookToBeDeleted = bookToBeDeleted.id
 // console.log(idOfBookToBeDeleted)
  const books = getAllBooks();
  const indexOfBookToRemove = books.findIndex(
    (book) => book.id === idOfBookToBeDeleted
  );
  //console.log(indexOfBookToRemove)
  if (indexOfBookToRemove === -1) {
    console.log(`cannot find the book you want to delete`);
    throw new Error(`cannot find the book you want to delete`)
  }
  books.splice(indexOfBookToRemove, 1);
  return updateCatalogue(JSON.stringify(books));
}



module.exports = {
logFilePath,
getAllBooks,
addBook,
editBook,
deleteBook
}
