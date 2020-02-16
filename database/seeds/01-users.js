const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "student1",
      password: bcrypt.hashSync("password", 10),
      department: "history"
    },
    {
      username: "student2",
      password: bcrypt.hashSync("password", 10),
      department: "math"
    },
    {
      username: "student3",
      password: bcrypt.hashSync("password", 10),
      department: "Science"
    }
  ]);
};
