exports.seed = function(knex, Promise) {
  return knex("grades").insert([
    {
      grade: "A",
      user_id: 1
    },
    {
      grade: "B",
      user_id: 1
    },
    {
      grade: "B",
      user_id: 2
    },
    {
      grade: "C",
      user_id: 2
    },
    {
      grade: "A",
      user_id: 2
    },
    {
      grade: "A",
      user_id: 3
    }
  ]);
};
