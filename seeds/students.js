
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'rowValue1', cohorts_id: 3},
        {name: 'rowValue2', cohorts_id: 1},
        {name: 'rowValue3', cohorts_id: 2}
      ]);
    });
};
