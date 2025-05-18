const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json()); // Enable JSON body parsing

//Serving
app.get('/file-content', (req, res) => {
    fs.readFile(path.join(__dirname, 'text.txt'), 'utf8', (err, data) => {
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
    fs.writeFile(path.join(__dirname, 'text.txt'), content, (err) => {
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
