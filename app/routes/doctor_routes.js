// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for doctors
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
// router.get('/doctors', requireToken, (req, res) => {
//   Doctor.find({'owner': req.user._id}).populate('doctorReference')

router.get('/doctors', (req, res) => {
  Doctor.find()
    .then(doctors => {
      // `doctors` will be an array of Mongoose documents
      // convert each document in the array to a Plain Old JS Object (POJO), by:
      // using `.map` and then apply `.toObject` to each one
      return doctors.map(doctor => doctor.toObject())
    })
    // respond with status 200 and JSON of the doctors
    .then(doctors => res.status(200).json({ doctors: doctors }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW (ById)
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/doctors/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Doctor.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "doctor" JSON
    .then(doctor => res.status(200).json({ doctor: doctor.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /doctors
router.post('/doctors', requireToken, (req, res) => {
  // set owner of new doctor to be current user
  console.log(req.body)
  req.body.doctor.owner = req.user.id

  Doctor.create(req.body.doctor)
    .then(doctor => {
      res.status(201).json({ doctor: doctor.toObject() })
    })
    .catch(err => handle(err, res))
})

// // UPDATE
// // PATCH /doctors/id
router.patch('/doctors/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.doctor.owner

  Doctor.findById(req.params.id)
    .then(handle404)
    .then(doctor => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, doctor)

      // if client sends empty strings for parameters that it does
      // not want to update, then delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.doctor).forEach(key => {
        if (req.body.doctor[key] === '') {
          delete req.body.doctor[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return doctor.update(req.body.doctor)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// // DESTROY
// // DELETE /doctors/id
router.delete('/doctors/:id', requireToken, (req, res) => {
  Doctor.findById(req.params.id)
    .then(handle404)
    .then(doctor => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, doctor)
      // delete the example ONLY IF the above didn't throw
      doctor.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
