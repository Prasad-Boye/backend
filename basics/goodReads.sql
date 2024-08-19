CREATE TABLE IF NOT EXISTS book (
  book_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  year INTEGER,
  UNIQUE(title, author)
);


-- Insert initial data
INSERT INTO book (title, author, genre, year)
VALUES 
  ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 1960),
  ('1984', 'George Orwell', 'Dystopian', 1949),
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 1925),
  ('Pride and Prejudice', 'Jane Austen', 'Romance', 1813),
  ('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 1951);
