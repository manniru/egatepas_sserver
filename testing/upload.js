const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Received!" });
});

router.post("/", (req, res) => {
  console.log(+ new Date())
  // var data = getIcon(req.params.w);
  console.log(req.params)
  /*
    var img = new Buffer(data, 'base64');
    console.log(img)

   res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': img.length
   });
   res.end(img);
   */
   res.json({ message: "Received!" });

});

module.exports = router;
