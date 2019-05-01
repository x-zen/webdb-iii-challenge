
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable()
      .unique();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
