const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", require("./routes/route"));

//for not found route
app.use((req, res, next) => {
  console.log("aaaawww", req.originalUrl);
  req.status = 404;
  const error = new Error("Routes not found.");
  next(error);
});

//error handler
if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message,
    });
  });
}
app.use((error, req, res, next) => {
  // console.log("aaaa", error);
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack,
  });
});

module.exports = app;
