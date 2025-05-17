const sendJsonResponse = require("./helper");
const run = require("./services");
require("./helper");

function requestHandler(req, res) {
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
  if (req.url === `/books` && req.method === "POST") {
    return run.addBook(req);
    
  }
}

module.exports = requestHandler;
