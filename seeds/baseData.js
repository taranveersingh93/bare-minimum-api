/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('allTasks').del()
  await knex('allTasks').insert([
    {
      task: "I'm not sure about this category but here it is.",
      seen: "false",
      category: 'Work',
      saved: "false",
      completed: "false"
    },
    {
      task: "I'm sure about this.",
      seen: "false",
      category: 'Cleaning',
      saved: "true",
      completed: "false"
    },
  ]);
};
