const {
  handleGetAllBooks,
  handleAddBook,
  handleEditBook,
  handleDeleteBook,
} = require("./controllers");
const sendJsonResponse = require("./helper");

function requestHandler(req, res) {
  if (req.url === "/books" && req.method === "GET") {
    handleGetAllBooks(req, res);
  } else if (req.url === "/books" && req.method === "POST") {
    handleAddBook(req, res);
  } else if (req.url === "/books" && req.method === "PUT") {
    handleEditBook(req, res);
  } else if (req.url === "/books" && req.method === "DELETE") {
    handleDeleteBook(req, res);
  } else {
    return sendJsonResponse(res, 404, {
      error: `No endpoint matches the route: ${req.method} ${req.url}`,
    });
  }
}

module.exports = requestHandler;
