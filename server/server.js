const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5004;
const router = require("./routes/route");

app.use(cors());
app.use("/", router);
mongoose.connect("mongodb://localhost:27017/myapp");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
