var environment = process.env.NODE_ENV || 'development'
var knexConfig = require('../knexfile')
var config = knexConfig[environment]
var knex = require('knex')
var knexConnection = knex(config)

module.exports = knexConnection
