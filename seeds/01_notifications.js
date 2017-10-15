exports.seed = function(knex, Promise) {
return knex.raw('delete from notification; alter sequence notification_id_seq restart with 4')
  .then(function () {
      const someNotifications = [{
        id: 1,
        type: 'change_machine_empty'
      },
      {
        id: 2,
        message: 'here is a message from the second notificaiton.',
        type: 'broken_machine'
      },
      {
        id: 3,
        message: 'here is a message from the third notification',
        type: 'other'
      }]
      return knex('notification').insert(someNotifications)
    })
};
