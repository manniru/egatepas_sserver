const express = require("express");
var multer = require("multer");
var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "mannir",
  api_key: "623273829818951",
  api_secret: "cNVQdPbTSZxEQ5MScloznBg6FJc"
});

const router = express.Router();

var upload = multer({ dest: "./uploads/" });

router.post("/", upload.single("file"), function(req, res) {
    console.log('Post to cloudnary')
    /*
  cloudinary.uploader.upload(req.file.path, function(req, res) {
    console.log(res.url); //on uploading, cloudinary sends a url
  });
  */

  res.json({ message: "Received!" });
});

/*
router.get("/", (req, res) => {
  res.json({ message: "Received!" });
});

router.post("/", (req, res) => {
    console.log('Post Received!')
  res.json({ message: "Received!" });
});
*/

module.exports = router;
