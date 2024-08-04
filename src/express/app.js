const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const upload = multer({ dest: path.join(__dirname, '../assets/images') });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.post('/upload', upload.single('image'), (req, res) => {
  const fs = require('fs');
  const oldPath = req.file.path;
  const newPath = path.join(req.file.destination, 'base.png');

  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    res.redirect('/');
    mainWindow.webContents.send('update-image', 'assets/images/base.png');
  });
});

module.exports = app;
