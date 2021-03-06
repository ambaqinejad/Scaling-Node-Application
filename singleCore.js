const express = require("express");
const mongoose = require("mongoose");
const cache = require("memory-cache");

const User = require("./models/user");

const app = express();
const memCache = new cache.Cache();

app.get("/", (req, res, next) => {
  User.findById("60c0994c4090255798976ba6")
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
});



mongoose
  .connect("'mongodb://localhost:27017/node-scaling", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 3001;
    console.log("Server connected to mongodb.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Can not connect to mongodb");
  });
