const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateRegister,
  validateLogin
} = require("../middleware/validate.js");

const Users = require("../users/user-model.js");

const { jwtSecret } = require("../config/secret.js");

// register a new user
router.post("/register", validateRegister, async (req, res, next) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    const newUser = await Users.add(user);

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// user login route
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);

      res.status(200).json({
        message: `Welcome ${user.username}!`,
        user_id: user.id,
        token
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});

// create token helper function
function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
