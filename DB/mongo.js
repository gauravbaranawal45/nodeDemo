const mongoose = require("mongoose");
// require("dotenv").config();
// var mongoDBErrors = require("mongoose-mongodb-errors");

// mongoose.plugin(mongoDBErrors);
mongoose.Promise = global.Promise;

// console.log(process.env.MONGOURI);
mongoose
  .connect(
    "mongodb+srv://baranawalgaurav120:rlL3Jri6Fvkfp6j2@cluster0.1kkuk.mongodb.net/nodedemo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
