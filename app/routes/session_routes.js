// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for sessions
const Session = require('../models/session')
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
// GET /sessions
router.get('/sessions', requireToken, (req, res) => {
  // res.send("here's the sessions route for GET")
  Session.find({'owner': req.user._id}).populate('doctorReference')
    // .populate({
    //   path: 'doctorReference',
    //   populate: [{
    //     path: 'clinicReference',
    //     model: 'Clinic'
    //   },
    //   {
    //     path: 'diseaseReference',
    //     model: 'Disease'
    //   }
    // ]
    // })
    .then(sessions => {
      return sessions.map(session => session.toObject())
      // iterate through mySession
        // for each session, grab doctor key (which is a Doctor ID)
        // use the Doctor model to find that Doctor info, and convert it to Object
        // replace the doctor key value with this Object
    })
    // respond with status 200 and JSON of the doctors
    .then(sessions => res.status(200).json({ sessions: sessions }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW
// GET /sessions/id
router.get('/sessions/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Session.findById(req.params.id).populate('doctorReference')
    // .populate({
    //   path: 'doctorReference',
    //   populate: [{
    //     path: 'clinicReference',
    //     model: 'Clinic'
    //   },
    //   {
    //     path: 'diseaseReference',
    //     model: 'Disease'
    //   }
    // ]
    // })
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "session" JSON
    .then(session => {
      requireOwnership(req, session)
      res.status(200).json({ session: session.toObject() })
    })
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /sessions
router.post('/sessions', requireToken, (req, res) => {
  // set owner of new example to be current user
  req.body.session.owner = req.user.id

  Session.create(req.body.session)
    .then(session => {
      requireOwnership(req, session)
      res.status(201).json({ session: session.toObject() })
    })
    .catch(err => handle(err, res))
})

// // UPDATE
// // PATCH /sessions/id
router.patch('/sessions/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.session.owner

  Session.findById(req.params.id).populate('doctorReference')
    // .populate({
    //   path: 'doctorReference',
    //   populate: [{
    //     path: 'clinicReference',
    //     model: 'Clinic'
    //   },
    //   {
    //     path: 'diseaseReference',
    //     model: 'Disease'
    //   }
    // ]
    // })
    // .then(handle404)
    .then(session => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, session)

      // before updating, delete any key/value pair where the value of the field was left empty
      Object.keys(req.body.session).forEach(key => {
        if (req.body.session[key] === '') {
          delete req.body.session[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return session.update(req.body.session)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// // DESTROY
// // DELETE /sessions/id
router.delete('/sessions/:id', requireToken, (req, res) => {
  Session.findById(req.params.id)
    .then(handle404)
    .then(session => {
      // throw an error if current user doesn't own `session`
      requireOwnership(req, session)
      // delete the session ONLY IF the above didn't throw
      session.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
