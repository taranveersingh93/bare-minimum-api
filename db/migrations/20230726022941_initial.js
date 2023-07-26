/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('allTasks', function(table) {
    table.increments('id').primary();
    table.string('category');
    table.string('task');
    table.string('seen');
    table.string('saved');
    table.string('completed');
    table.timestamps();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('allTasks')
};
