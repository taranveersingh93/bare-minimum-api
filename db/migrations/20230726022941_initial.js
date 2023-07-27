/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('allTasks', function(table) {
    table.increments('id').primary();
    table.string('category');
    table.string('task');
    table.boolean('seen');
    table.boolean('saved');
    table.boolean('completed');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('allTasks')
};
