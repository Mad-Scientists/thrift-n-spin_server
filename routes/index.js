const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')


router.get('/', (req, res) => {
  queries.getAll().then(notifications => {
    res.json(notifications)
  })
})

router.post('/', (req, res, next) => {
  queries.createNotification(req.body).then(notifications => {
    console.log('send text here');
    res.json('Success!')
}).catch(error => {
  console.log(error);
  res.status(500).json({message: "Failure..."})
})
})

module.exports = router
