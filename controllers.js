
const sendJsonResponse = require("./helper");
const run = require("./services");


function handleGetAllBooks(req, res){
    //Get All Books
  try {
      const data = run.getAllBooks();
      if (!data) {
        return sendJsonResponse(res, 400, {
          error: "the book catalogue is missing or has errors",
        });
      }
      if (data.length === 0) {
        return sendJsonResponse(res, 400, {
          message: "No book found, catalogue is empty",
        });
      }

      return sendJsonResponse(res, 200, data);
    } catch (error) {
      return sendJsonResponse(res, 500, { error: error.message });
    }
}

function handleAddBook(req, res){
 let receivedData = "";
    req.on("data", (chunk) => {
      //console.log('chunk', chunk)
      receivedData += chunk.toString();
      //console.log(JSON.parse(receivedData))
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(receivedData);
        if (!data || Object.keys(data).length === 0) {
          return sendJsonResponse(res, 400, {
            error: "Bad request: cannot add empty book",
          });
        }
        const updatedBooks = await run.addBook(data); // wait for book to be added
        return sendJsonResponse(res, 201, {
          message: "Book added successfully",
          books: updatedBooks,
        });
      } catch (error) {
        return sendJsonResponse(res, 500, { error: error.message });
      }
    });
}


function handleEditBook(req, res){
let receivedData = "";
    req.on("data", (chunk) => {
      //console.log('chunk', chunk)
      receivedData += chunk.toString();
      //console.log(JSON.parse(receivedData))
    });
    req.on("end", async () => {
      try {
        const data = JSON.parse(receivedData);
        if (!data || Object.keys(data).length === 0) {
          return sendJsonResponse(res, 400, {
            error: "Bad request:modified book id and details must be provided",
          });
        }
        const updatedCatalogue = await run.editBook(data);
        return sendJsonResponse(res, 201, {
          message: "Book edited successfully",
          books: updatedCatalogue,
        });
      } catch (error) {
        return sendJsonResponse(res, 500, { error: error.message });
      }
    });
}


function handleDeleteBook(req, res){
  let receivedData = "";
    req.on("data", (chunk) => {
     // console.log('chunk', chunk)
      receivedData += chunk.toString();
     // console.log(JSON.parse(receivedData))
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(receivedData);
        if (!data || Object.keys(data).length === 0) {
          return sendJsonResponse(res, 400, {
            error: "Bad request: payload must contain id of the book to be deleted",
          });
        }
        const updatedCatalogue = await run.deleteBook(data); // wait for book to be added
        return sendJsonResponse(res, 200, {
          message: "Book deleted successfully",
          books: updatedCatalogue,
        });
      } catch (error) {
        return sendJsonResponse(res, 500, { error: error.message });
      }
    });
}

module.exports = {
  handleGetAllBooks,
  handleAddBook,
  handleEditBook,
  handleDeleteBook
}