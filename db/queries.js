const knex = require('./knex'); // the connection!

module.exports = {
  getAll() {
    return knex('notification').orderBy('created', 'desc');
  },
  createNotification(notification) {
    return knex('notification').insert(notification, '*');
  }
}
