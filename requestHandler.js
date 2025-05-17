const run= require('./services')


function requestHandler(req, res) {
 if (req.url === `/books` && req.method === 'GET'){
  return run.getAllBooks(req, res)
 }
 if (req.url === `/books` && req.method === 'POST'){
    return run.addNewBook(req, res)
 }
}

module.exports = requestHandler;
