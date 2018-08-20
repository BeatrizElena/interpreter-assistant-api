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
  // res.send("here's the doctors route for GET")
  Doctor.find().populate('postedBy')
    .then(doctors => {
      // `doctors` will be an array of Mongoose documents
      // to convert each one to a Plain Old JS Object (POJO), we use `.map` to
      // apply `.toObject` to each one
      return doctors.map(doctor => doctor.toObject())
    })
    // respond with status 200 and JSON of the doctors
    .then(doctors => res.status(200).json({ doctors: doctors }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
// router.get('/examples/:id', requireToken, (req, res) => {
//   // req.params.id will be set based on the `:id` in the route
//   Example.findById(req.params.id)
//     .then(handle404)
//     // if `findById` is succesful, respond with 200 and "example" JSON
//     .then(example => res.status(200).json({ example: example.toObject() }))
//     // if an error occurs, pass it to the handler
//     .catch(err => handle(err, res))
// })

// // CREATE
// // POST /examples
// router.post('/examples', requireToken, (req, res) => {
//   // set owner of new example to be current user
//   req.body.example.owner = req.user.id

//   Example.create(req.body.example)
//     // respond to succesful `create` with status 201 and JSON of new "example"
//     .then(example => {
//       res.status(201).json({ example: example.toObject() })
//     })
//     // if an error occurs, pass it off to our error handler
//     // the error handler needs the error message and the `res` object so that it
//     // can send an error message back to the client
//     .catch(err => handle(err, res))
// })

// // UPDATE
// // PATCH /examples/5a7db6c74d55bc51bdf39793
// router.patch('/examples/:id', requireToken, (req, res) => {
//   // if the client attempts to change the `owner` property by including a new
//   // owner, prevent that by deleting that key/value pair
//   delete req.body.example.owner

//   Example.findById(req.params.id)
//     .then(handle404)
//     .then(example => {
//       // pass the `req` object and the Mongoose record to `requireOwnership`
//       // it will throw an error if the current user isn't the owner
//       requireOwnership(req, example)

//       // the client will often send empty strings for parameters that it does
//       // not want to update. We delete any key/value pair where the value is
//       // an empty string before updating
//       Object.keys(req.body.example).forEach(key => {
//         if (req.body.example[key] === '') {
//           delete req.body.example[key]
//         }
//       })

//       // pass the result of Mongoose's `.update` to the next `.then`
//       return example.update(req.body.example)
//     })
//     // if that succeeded, return 204 and no JSON
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(err => handle(err, res))
// })

// // DESTROY
// // DELETE /examples/5a7db6c74d55bc51bdf39793
// router.delete('/examples/:id', requireToken, (req, res) => {
//   Example.findById(req.params.id)
//     .then(handle404)
//     .then(example => {
//       // throw an error if current user doesn't own `example`
//       requireOwnership(req, example)
//       // delete the example ONLY IF the above didn't throw
//       example.remove()
//     })
//     // send back 204 and no content if the deletion succeeded
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(err => handle(err, res))
// })

module.exports = router
