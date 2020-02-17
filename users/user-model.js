const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  findByDepartment,
  getUserGrades
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findByDepartment(department) {
  return db("users").where("department", department);
}

function getUserGrades(id) {
  return db("grades")
    .select("grades.grade", "grades.user_id")
    .join("users", "users.id", "grades.user_id")
    .where("user_id", id);
}
