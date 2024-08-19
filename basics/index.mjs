import express from "express";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"; // Import body-parser

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "goodReads.db");
const app = express();
app.use(express.json());
let db = null; // Declare the db variable

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

const connectToDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Drop the book table if it exists
    // const dropBookTableQuery = `
    //   DROP TABLE IF EXISTS book;
    // `;
    // await db.exec(dropBookTableQuery);

    // Create the book table with a unique constraint on title and author
    const createBookTableQuery = `
      CREATE TABLE IF NOT EXISTS book (
        book_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT,
        year INTEGER,
        UNIQUE(title, author)
      );`;
    await db.exec(createBookTableQuery);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
  }
};

connectToDB();

app.get("/books", async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

app.post('/books/', async (request, response) => {
  const bookDetails = request.body;
  const { title, author, genre, year } = bookDetails;

  if (!title || !author || !year) {
    return response.status(400).send({ error: "Missing required fields: title, author, or year" });
  }

  try {
    const pushBook = `
      INSERT INTO book (title, author, genre, year)
      VALUES (?, ?, ?, ?);
    `;
    const dbResponse = await db.run(pushBook, [title, author, genre, year]);
    const bookId = dbResponse.lastID;
    response.status(201).send({ bookId: bookId });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});
