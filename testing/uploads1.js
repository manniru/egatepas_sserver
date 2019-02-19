var express = require('express')
const router = express.Router();
var multer  = require('multer')
// var upload = multer()
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
  }); 
 
  router.post('/', upload.none(), function (req, res, next) {
  // req.body contains the text fields
  console.log(req.body)
  res.json({ message: "Received!" });

})

module.exports = router;
