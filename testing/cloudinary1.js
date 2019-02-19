const express = require("express");
const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
// var upload = multer({ dest : '../public/uploads'}).single('file');
var upload = multer({ storage: storage }).single('file');


var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "mannir",
  api_key: "623273829818951",
  api_secret: "cNVQdPbTSZxEQ5MScloznBg6FJc"
});

router.post("/", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err)
      return res.end("Error");
    }
    console.log(req);
    res.end("file uploaded");

    cloudinary.uploader.upload(req.file.path, function(result) {
      console.log(result);
      /*
      //create an urembo product
      var photo = new Photo();
      photo.name = req.body.name;
      // photo.picture = result.url;
      // photo.place = req.body.place;
      // photo.city = req.body.city;
      //save the product and check for errors
      photo.save(function(err, photos) {
        if (err) res.send(err);
        res.json({ message: "photographed place created." });
        console.log(photos);
      });
      */
    });
    
  });
});

// router.post('/', upload.single('img'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//       console.log(req.file);
//     res.json({ message: "Received!" });
// })

/*
router.post('/', upload.none(), function (req, res, next) {
    // req.body contains the text fields
    console.log(req.body);

    res.json({ message: "Received!" });

  })
  */

module.exports = router;
