const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });
const bodyParser = require('body-parser');
const linksController = require('./controllers/linksController')
const app = express();

const MONGODB_CONNECTION = process.env.DB_CONNECTION_URI 
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.get("/:name",linksController.getRedirected);
app.post("/links/add",linksController.addLink);
app.post("/links/update/:linkId",linksController.editLink);
app.delete("/links/remove/:linkId",linksController.removeLink);
app.use("/", (req, res, next) => {
  res.status(404).send('No webpage found');
});
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
