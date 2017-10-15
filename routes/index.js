const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')
const twilio = require('twilio');
require('dotenv').config()


const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

router.get('/', (req, res) => {
  queries.getAll().then(notifications => {
    res.json(notifications)
  })
})

router.post('/', (req, res, next) => {
  queries.createNotification(req.body).then(notifications => {
    client.messages.create({
    body: `Type: ${notifications[0].type} Message: ${notifications[0].message}`,
    to: '+19709855659',  // Add Official Number to .env
    from: process.env.TWILIO_NUMBER // Leave this one alone.
    })
  .then((message) => console.log(message.sid, message));
      res.json('Success!')
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Failure..."})
  })
})

module.exports = router
