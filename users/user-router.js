const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("./user-model.js");

// get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// get other users within from same department as the user
router.get("/department", department(), async (req, res, next) => {
  try {
    const { department } = req.user;
    const users = await Users.findByDepartment(department);
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(401).json({
        message: "There are no users currently listed in that department"
      });
    }
  } catch (err) {
    next(err);
  }
});

// use commented out code below to pull user id from the token in the request
// let decoded = jwt.decode(req.headers.authorization);
// console.log(decoded.user.id);

// get user's grades. This endpoint pulls the id in by decoding user info from the token
router.get("/grades", async (req, res, next) => {
  try {
    let decoded = jwt.decode(req.headers.authorization);
    const { id } = decoded.user;

    const grades = await Users.getUserGrades(id);
    if (grades.length > 0) {
      res.status(200).json(grades);
    } else {
      res.status(401).json({ message: "This user has no grades posted" });
    }
  } catch (err) {
    next(err);
  }
});

// custom middleware to check if user is in the correct department
function department() {
  return function(req, res, next) {
    if (req.user && req.user.department) {
      next();
    } else {
      res.status(403).json({
        message: "Must be in a department to access student list"
      });
    }
  };
}

module.exports = router;
