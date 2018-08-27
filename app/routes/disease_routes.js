// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model
const Disease = require('../models/disease')

// intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')
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
// GET /diseases
router.get('/diseases', requireToken, (req, res) => {
  Disease.find()
    .then(doctors => {
      // `doctors` is an array of Mongoose documents that need to be coverted to 
      // Plain Old JS Object (POJO). Use `.map` to apply `.toObject` to each one
      return doctors.map(disease => disease.toObject())
    })
    // respond with status 200 and JSON of the doctors
    .then(diseases => res.status(200).json({ diseases: diseases }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW
// GET /diseases/id
router.get('/diseases/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Disease.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(disease => res.status(200).json({ disease: disease.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /clinics
router.post('/diseases', requireToken, (req, res) => {
  // set owner of new clinic to be current user
  req.body.disease.owner = req.user.id

  console.log(req.body)

  Disease.create(req.body.disease)
    .then(disease => {
      console.log(disease)
      res.status(201).json({ disease: disease.toObject() })
    })
    .catch(err => handle(err, res))
})

// // UPDATE
// // PATCH /diseases/id
router.patch('/diseases/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.disease.owner

  Disease.findById(req.params.id)
    .then(handle404)
    .then(disease => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, disease)

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.disease).forEach(key => {
        if (req.body.disease[key] === '') {
          delete req.body.disease[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return disease.update(req.body.disease)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// // DESTROY
// // DELETE /diseases/id
router.delete('/diseases/:id', requireToken, (req, res) => {
  Disease.findById(req.params.id)
    .then(handle404)
    .then(disease => {
      // throw an error if current user doesn't own `disease`
      requireOwnership(req, disease)
      // delete the disease ONLY IF the above didn't throw
      disease.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
