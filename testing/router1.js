const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Received!" });
});

router.post("/", (req, res) => {
    console.log('Post Received!')
  res.json({ message: "Received!" });
});

module.exports = router;
