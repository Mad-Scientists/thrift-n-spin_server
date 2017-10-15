
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('notification', function(table){
      table.increments('id').primary()
      table.string('message', 140)
      table.enu('type', ['change_machine_empty', 'broken_machine', 'other']).notNullable()
      table.dateTime('created').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('notification')
};
