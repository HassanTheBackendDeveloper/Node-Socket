/** import custom moduels */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const socket = require("socket.io");

/** import cor modules */
const path = require("path");

/** express instance */
const app = express();

/** middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/** route */
app.get("/", (req, res) => {
  // Path to the frontend directory
  const frontendPath = path.join(__dirname, "../../frontend");

  // Path to the index.html file
  const indexPath = path.join(frontendPath, "index.html");

  res.sendFile(indexPath);
});

/** export app instance */
module.exports = { app };
