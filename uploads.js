const express = require("express");
var multer  = require('multer');
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})
var upload = multer({ storage: storage });
// var upload = multer({ dest: __dirname + '/public/uploads/' });
var type = upload.single('file');

router.post('/', type, function (req, res) {
    console.log(+new Date())
    console.log(req.body);
    console.log(req.file);
    res.json({ message: "Received!" });
    console.log('receive in blob')
 });

module.exports = router;