const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Example route
app.get('/api/books', (req, res) => {
  res.json([
    { id: 1, title: 'The Witcher', author: 'Red Otter', genre: 'Crime', year: 2021 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
  ]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
