const sendJsonResponse = require("./helper");
const run = require("./services");
require("./helper");

function requestHandler(req, res) {
  //Get All Books
  if (req.url === `/books` && req.method === "GET") {
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

  // Add a Book
  if (req.url === `/books` && req.method === "POST") {
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
}

module.exports = requestHandler;
