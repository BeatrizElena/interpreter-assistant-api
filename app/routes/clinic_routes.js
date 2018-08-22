// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for doctors
const Clinic = require('../models/clinic')
const Doctor = require('../models/doctor')

// intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/clinics', requireToken, (req, res) => {
  Clinic.find({'owner': req.user._id})
    .then(clinics => {
      // `clinics` will be an array of Mongoose documents
      // to convert each one to a Plain Old JS Object (POJO), we use `.map` to
      // apply `.toObject` to each one
      return clinics.map(clinic => clinic.toObject())
    })
    // respond with status 200 and JSON of the doctors
    .then(clinics => res.status(200).json({ clinics: clinics }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW
// GET /clinics/id
router.get('/clinics/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Clinic.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "clinic" JSON
    .then(clinic => res.status(200).json({ clinic: clinic.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /clinics
router.post('/clinics', requireToken, (req, res) => {
  // set owner of new clinic to be current user
  req.body.clinic.owner = req.user.id

  console.log(req.body)

  Clinic.create(req.body.clinic)
    .then(clinic => {
      console.log(clinic)
      res.status(201).json({ clinic: clinic.toObject() })
    })
    .catch(err => handle(err, res))
})

// // UPDATE
// // PATCH /clinics/id
router.patch('/clinics/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.clinic.owner

  Clinic.findById(req.params.id)
    .then(handle404)
    .then(clinic => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, clinic)

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.clinic).forEach(key => {
        if (req.body.clinic[key] === '') {
          delete req.body.clinic[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return clinic.update(req.body.clinic)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// // DESTROY
// // DELETE /clinics/id
router.delete('/clinics/:id', requireToken, (req, res) => {
  Clinic.findById(req.params.id)
    .then(handle404)
    .then(clinic => {
      // throw an error if current user doesn't own `clinic`
      requireOwnership(req, clinic)
      // delete the clinic ONLY IF the above didn't throw
      clinic.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
