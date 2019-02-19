const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const app = express();

if (process.env.CORS) {
    app.use(cors());
  }

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/uploads', upload.single('file-to-upload'), (req, res) => {
  res.redirect('/');
});

app.listen(1313);