exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "student1",
      password: "password",
      department: "history"
    },
    {
      username: "student2",
      password: "password",
      department: "math"
    },
    {
      username: "student3",
      password: "password",
      department: "Science"
    }
  ]);
};
