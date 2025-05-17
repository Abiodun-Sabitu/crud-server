# Simple Node.js Book CRUD Server

This is a basic HTTP server built using **Node.js core modules**. It implements **CRUD operations** (Create, Read, Update, Delete) on a mock book database stored in a local `books.json` file.

---

## Features

- Built with Node.js `http` and `fs` modules — no external libraries or frameworks
- Simple routing and manual request handling
- CRUD functionality on a flat JSON file (acts as a mock database)
- Accepts JSON payloads for create, update, and delete operations

---

## API Endpoints

| Method | Endpoint   | Description              | Payload Required      |
|--------|------------|--------------------------|------------------------|
| GET    | `/books`   | Retrieve all books       | ❌                     |
| POST   | `/books`   | Add a new book           | ✅ Full book object    |
| PUT    | `/books`   | Update an existing book  | ✅ Full book object    |
| DELETE | `/books`   | Delete a book by `id`    | ✅ Only `id` required  |

> ℹ️ `PUT` and `DELETE` requests require the `id` to be passed in the request body — not in the URL.

---

## Book Object Format

Each book is represented by a JSON object with the following structure:

```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "year": 2021
}
Sample Requests
✅ POST /books
Add a new book:

json
Copy
Edit
{
  "id": 3,
  "title": "New Book",
  "author": "Jane Doe",
  "year": 2022
}
✅ PUT /books
Update an existing book by id:

json
Copy
Edit
{
  "id": 3,
  "title": "Updated Book Title",
  "author": "Jane Doe",
  "year": 2023
}
✅ DELETE /books
Delete a book by id (only id is required):

json
Copy
Edit
{
  "id": 3
}
The server will find and delete the book with the matching id.

Getting Started
Prerequisites
Node.js installed on your machine

Setup
Clone or download this repository.

Ensure books.json exists in the project root with initial content:

json
Copy
Edit
[]
Start the server:

bash
Copy
Edit
node server.js
Visit http://localhost:8000/books to test the API.

Notes
This project is for learning and demonstration purposes.

All data is stored in a flat JSON file — suitable only for prototyping or small demos.

No persistent storage or validations are included beyond basic checks.

License
Free to use for educational purposes.





