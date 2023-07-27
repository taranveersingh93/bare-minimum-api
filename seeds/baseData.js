/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const allTasks = require('.././Data/allTasks');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('allTasks').del()
  await knex('allTasks').insert(allTasks);
};
