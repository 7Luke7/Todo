const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.use(express.json());

const todoTextSchema = new mongoose.Schema({
  text: String,
});

const text = mongoose.model("todoText", todoTextSchema);

router.get("/todoItems", (req, res) => {
  text.find({}, (err, foundItems) => {
    res.send(foundItems);
  });
});

router.post("/add", (req, res) => {
  text.create({ text: req.body.inpText });

  res.send("todo added!");
});

router.delete("/todoItems/:id", (req, res) => {
  const id = req.params.id;

  text.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log("Something went wrong!");
    } else {
      res.send("Item removed successfully.");
    }
  });
});

router.delete("/clearItems", (req, res) => {
  text.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Items are successfully cleared.");
    }
  });
});

module.exports = router;
