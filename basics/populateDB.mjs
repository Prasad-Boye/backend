import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "goodReads.db");

const populateDB = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const insertBooksQuery = `
      INSERT OR IGNORE INTO book (title, author, genre, year)
      VALUES 
        ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 1960),
        ('1984', 'George Orwell', 'Dystopian', 1949),
        ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 1925),
        ('Pride and Prejudice', 'Jane Austen', 'Romance', 1813),
        ('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 1951);
    `;

    await db.exec(insertBooksQuery);
    console.log("Database populated with initial data.");
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
  }
};

populateDB();
