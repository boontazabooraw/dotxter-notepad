const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = path.join(__dirname, 'data', 'text.txt');

app.use(express.static('public'));
app.use(express.json()); // Enable JSON body parsing

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Serving text file
app.get('/file-content', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Read error:', err);
      return res.status(500).send('Failed to read file');
    }
    res.send(data);
  });
});

//Updating
app.post('/update-file', (req, res) => {
  const { content } = req.body;
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Write error:', err);
      return res.status(500).send('Failed to write file');
    }
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
