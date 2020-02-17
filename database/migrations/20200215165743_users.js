exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
      .string("username", 128)
      .notNullable()
      .unique();
    tbl.string("password", 128).notNullable();
    tbl.string("department", 128);
  });

  await knex.schema.createTable("grades", tbl => {
    tbl.increments("id");
    tbl.string("grade", 22).notNullable();
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("grades");
  await knex.schema.dropTableIfExists("users");
};
