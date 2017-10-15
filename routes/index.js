const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')
const twilio = require('twilio')
require('dotenv').config()

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN)

function validMessage(notification) {
  if(!notification.message) {
    return true
  }
  if(notification.message) {
    const hasMessage = typeof notification.message == 'string'
    const hasLength = notification.message.length <= 140
    return hasLength && hasMessage
  }
}

const types = ['change_machine_empty', 'broken_machine', 'other']
function validType(notification) {
  return types.find(type => {
    return type == notification.type
  })
}

function validNotification(notification) {
  return validMessage(notification) && validType(notification)
}

router.get('/', (req, res) => {
  queries.getAll().then(notifications => {
    res.json(notifications)
  })
})

router.post('/', (req, res, next) => {
  if(validNotification(req.body)) {
    queries.createNotification(req.body).then(notification => {
        return client.messages.create({
          body: `Type: ${notification.type} Message: ${notification.message}`,
          to: process.env.TO_NUMBER,  // Add Official Number to .env
          from: process.env.TWILIO_NUMBER // Leave this one alone.
        }).then((message) => {
          res.json({message: 'Success!'})
        })
    }).catch(error => {
      res.status(500)
      next(error)
    })
  } else {
    res.status(500)
    next(new Error('Invalid Notification'))
  }
})

module.exports = router
