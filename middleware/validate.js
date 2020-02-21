const Users = require("../users/user-model.js");

module.exports = {
  validateRegister,
  validateLogin
};

function validateRegister(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.department) {
    return res.status(400).json({
      message: "Missing required username, password and department fields"
    });
  } else {
    next();
  }
}

function validateLogin(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Missing required username and password fields"
    });
  } else {
    next();
  }
}
