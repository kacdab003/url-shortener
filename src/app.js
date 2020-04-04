const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });
const bodyParser = require('body-parser');
const linksController = require('./controllers/linksController')
const app = express();

const MONGODB_CONNECTION = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PWD}@cluster0-zeeqn.mongodb.net/test?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.get("/:name",linksController.getRedirected);
app.post("/links/add",linksController.addLink);
// app.use("/", (req, res, next) => {
//   res.status(404).send('No webpage found');
// });
mongoose
  .connect(MONGODB_CONNECTION)
  .then(result => {
    app.listen(PORT, () => {
      console.log("Running on " + PORT);
      
      
    });
  })
  .catch(err => {
    console.log("An error occured", err);
  });
