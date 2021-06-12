const User = require("../models/user");

const getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Server Error.",
      });
    });
};

const addUser = (req, res, next) => {
  console.log(req.body);
  new User(req.body)
    .save()
    .then((info) => res.send(info))
    .catch((err) => res.send(err));
};

module.exports = {
  getAllUsers,
  addUser,
};
