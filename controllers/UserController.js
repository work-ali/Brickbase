const User = require("../models/User");
let controller = {};

controller.get = async (req, res) => {
  if (req.params.id) {
    User.findById(req.params.id, "-password")
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({
          msg: "Internal error accured"
        });
      });
  } else {
    res.status(400).json({
      msg: "invalid params!"
    });
  }
};

controller.create = async (req, res) => {
  // we can use express middleware to validate user fields
  User.create(req.body)
    .then(user => {
      try {
        user = user.toObject();
      } catch (e) {}
      delete user.password;
      res.status(200).json({
        msg: "user created successfully!",
        user
      });
    })
    .catch(err => {
      res.status(400).json({
        msg: "Internal error accured",
        err
      });
    });
};

controller.update = async (req, res) => {};

controller.remove = async (req, res) => {};

module.exports = controller;
