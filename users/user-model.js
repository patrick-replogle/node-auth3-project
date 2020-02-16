const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db("users").select("id", "usersname", "password");
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
