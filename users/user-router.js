const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("./user-model.js");

// get all users
router.get("/", async (req, res, next) => {
  try {
    // how to decode user.id from token so that you can only fetch or post data for one user
    // let decoded = jwt.decode(req.headers.authorization);
    // console.log(decoded.user.id);
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/department", department("math"), async (req, res, next) => {
  try {
    // how to decode user.id from token so that you only fetch or post data for one user
    // let decoded = jwt.decode(req.headers.authorization);
    // console.log(decoded.user.id);
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

function department(catagory) {
  return function(req, res, next) {
    if (
      req.user &&
      res.user.department &&
      req.user.department.toLowerCase() === catagory
    ) {
      next();
    } else {
      res.status(403).json({
        message: "Must be in the math department to access math student list"
      });
    }
  };
}

module.exports = router;
