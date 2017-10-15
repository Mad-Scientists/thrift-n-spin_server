const knex = require('./knex') 

module.exports = {
  getAll() {
    return knex('notification').orderBy('created', 'desc')
  },
  createNotification(notification) {
    return knex('notification').insert(notification, '*').then(notifications => {
      return notifications[0]
    })
  }
}
