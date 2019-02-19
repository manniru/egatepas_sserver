const express = require("express");
const router = express.Router();
const RateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const stringCapitalizeName = require("string-capitalize-name");

var ImageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String
});

// const User = mongoose.model("user", UserSchema);
var ImageSchema = mongoose.model("ImageSchema ", ImageSchema);

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs
  delayMs: 0, // Disable delaying - full speed until the max limit is reached
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      msg: `You made too many requests. Please try again after ${minutes} minutes.`
    });
  }
});

// READ (ALL)
router.get("/", (req, res) => {
  User.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post("/", postLimiter, (req, res) => {
    console.log(+ new Date())
    /*
    var imgData = fs.readFileSync("/Users/mannir/GitHub/egatepass/uploads/sample.jpg");
    var Image = new ImageSchema({ data: imgData, contentType: "image/png" });
    Image.save(function(err, image) {
        console.log('image', image)
    });
    */

  res.json({ message: "Image Saved!" });
});

router.get("/images/:givenImageName", function(req, res, next) {
  ImageSchema.findOne({ name: req.params.givenImageName }, function(
    err,
    image
  ) {
    if (err) return next(err);
    res.contentType(image.contentType);
    res.send(image.data);
  });
});

module.exports = router;
