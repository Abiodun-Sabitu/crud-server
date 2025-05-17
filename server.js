//import http module
const http = require("http")
const handler = require('./requestHandler')

const PORT = 8000
const HOSTNAME = "localhost"

const server = http.createServer(handler)

server.listen(PORT, HOSTNAME, ()=>{
    console.log(`server is now running on http://${HOSTNAME}:${PORT}`)
})
