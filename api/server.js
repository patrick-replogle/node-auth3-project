const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/user-router.js");
const restricted = require("../auth/restricted-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, userRouter);

server.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message: "Something went wrong. Try again later"
  });
});

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
