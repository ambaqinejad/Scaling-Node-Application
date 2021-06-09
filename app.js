const express = require("express");
const mongoose = require("mongoose");
const cluster = require("cluster");
const os = require("os");

const User = require("./models/user");

if (cluster.isMaster) {
  console.log(`Master cluster with pid: ${process.pid}`);
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    cluster.fork();
  });
} else {
  console.log(`Worker cluster with pid: ${process.pid}`);
  main();
}

function main() {
  const app = express();
  app.get("/", (req, res, next) => {
    User.findById("60c0994c4090255798976ba6")
      .then((user) => {
        console.log("process: " + process.pid);
        // console.log(user);
        res.send(user)
        // console.log(request);
        // return User.updateOne({ _id: user._id }, { refrence: request });
      }).
    //   .then((info) => {
    //     console.log(info);
    //   })
      catch((err) => {
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
      const PORT = process.env.PORT || 3000;
      console.log("Server connected to mongodb.");
      //   addDummyUser();

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log("Can not connect to mongodb");
    });
}

function addDummyUser() {
  new User({
    username: "ambaqinejad",
    refrence: 0,
  })
    .save()
    .then(() => {
      console.log("User created successfully.");
    })
    .catch((err) => {
      console.log("Can not add user.");
    });
}
