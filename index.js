const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');

// FILES UPLOADED MIDDLE WARES
const fileUpload = require('express-fileupload');
var multer = require('multer');


const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db);
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

const app = express();

app.enable('trust proxy');
app.use(express.static('build'));
app.use(bodyParser.json());



if (process.env.CORS) {
  app.use(cors());
}
/*
// app.use(fileUpload());
// app.use(multer({dest:'./uploads/'}));
app.use(fileUpload({
  // useTempFiles : true,
  // tempFileDir : '/Users/mannir/GitHub/egatepass/uploads/',
  safeFileNames: true,
  preserveExtension: true
}));
*/

app.use('/api/users', require('./users'));
app.use('/uploads', require('./uploads'));

// app.use('/upload', require('./testing/upload'));
// app.use('/uploads1', require('./testing/uploads1'));
// app.use('/images', require('./testing/images'));
app.use('/cloudinary1', require('./testing/cloudinary1'));
// app.use('/multer1', require('./testing/multer1'));
// app.use('/file1', require('./testing/file1'));
// app.use('/blob1', require('./testing/blob1'));

// app.use('/upload', require('./upload'));

/*
app.use('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;
  // console.log(imageFile)

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.jpg`});
  });

})
*/
/*
app.post('/upload', function(req, res) {
  console.log(+new Date())
  console.log(req.files.foo); // the uploaded file object

  res.json({ message: 'Reecieved!' });
});
*/
/*
app.post('/upload', function(req, res) {
  console.dir(req.files);
});
*/
// app.post('/upload', function(req, res) {
//   // if (!req.files){
//   //   return res.status(400).send('No files were uploaded.');
//   // }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;

//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('uploads/filename.jpg', function(err) {
//   if (err){
//     return res.status(500).send(err);
//   }

//   res.send('File uploaded!');
// });
// app.post('/upload', function(req, res) {
//   console.log('/upload')
//   console.log(req.files.name); // the uploaded file object
// });



app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

const port = process.env.PORT || 1313;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const io = socket(server);
let online = 0;

io.on('connection', (socket) => {
  online++;
  console.log(`Socket ${socket.id} connected.`);
  console.log(`Online: ${online}`);
  io.emit('visitor enters', online);

  socket.on('add', data => socket.broadcast.emit('add', data));
  socket.on('update', data => socket.broadcast.emit('update', data));
  socket.on('delete', data => socket.broadcast.emit('delete', data));

  socket.on('disconnect', () => {
    online--;
    console.log(`Socket ${socket.id} disconnected.`);
    console.log(`Online: ${online}`);
    io.emit('visitor exits', online);
  });
});
