exports.seed = async function(knex) {
  await knex("grades").truncate();
  await knex("users").truncate();
};
