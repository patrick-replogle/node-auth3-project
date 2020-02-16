const Users = require("../users/user-model.js");

module.exports = {
  validateUser
};

function validateUser(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.department) {
    return res
      .status(400)
      .json({
        message: "Missing required username, password and department fields"
      });
  } else {
    next();
  }
}
