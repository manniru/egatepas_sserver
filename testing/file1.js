const express = require("express");
const router = express.Router();
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })
var upload = multer({ storage: storage });

// router.post('/', upload.none(), function (req, res, next) {
//     // req.body contains the text fields
//     console.log('file1')
// res.json({ message: "Received!" });
// })
router.post('/', upload.array('photos', 12), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.json({ message: "Received!" });
  })

module.exports = router;
