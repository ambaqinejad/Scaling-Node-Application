const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const userRouter = require("./routes/user");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userRouter);

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

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Can not connect to mongodb");
  });
