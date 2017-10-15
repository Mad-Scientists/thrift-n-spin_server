const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')
const twilio = require('twilio');
require('dotenv').config()


const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

function validNotification(notification) {
  if(!notification.message){
    return true
  }
  if(notification.message){
    const hasMessage = typeof notification.message == 'string'
    const hasLength = notification.message.length <= 140
    return hasLength && hasMessage
  }
}



router.get('/', (req, res) => {
  queries.getAll().then(notifications => {
    res.json(notifications)
  })
})

router.post('/', (req, res, next) => {
  console.log(req.body.message);
  if(validNotification(req.body.message)) {
    queries.createNotification(req.body).then(notifications => {
    if(notifications[0].message) {
      if(validNotification(notifications[0])){
        client.messages.create({
        body: `Type: ${notifications[0].type} Message: ${notifications[0].message}`,
        to: '+19709855659',  // Add Official Number to .env
        from: process.env.TWILIO_NUMBER // Leave this one alone.
        })
      .then((message) => console.log(message.sid, message));
          res.json('Success!')
      }
    }
    }).catch(error => {
      console.log(error);
      res.status(500).json({message: "Failure..."})
    })
  }
})

module.exports = router
