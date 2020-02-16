const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateUser } = require("../middleware/validate.js");

const Users = require("../users/user-model.js");

const { jwtSecret } = require("../config/secret.js");

router.post("/register", validateUser, async (req, res, next) => {
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

router.post("/login", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Missing required username and password fields" });
  }

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

function signToken(user) {
  const payload = {
    user
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
