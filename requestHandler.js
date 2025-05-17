const run= require('./services')


function requestHandler(req, res) {
 if (req.url === `/books` && req.method === 'GET'){
  return run.getAllBooks()
 }
 if (req.url === `/books` && req.method === 'POST'){
    return run.addBook(req, res)
 }

}

module.exports = requestHandler;
