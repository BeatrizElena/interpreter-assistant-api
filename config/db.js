'use strict'

// creating a base name for the mongodb
const mongooseBaseName = 'ready-interpreter-api'
const mongooseHerokuName = 'heroku_7f9l1c7n:435qbfqqb0ka80i24l26sm0gkg@ds125912.mlab.com:25912/heroku_7f9l1c7n'

// create the mongodb uri for development and test
const database = {
  development: `mongodb://${mongooseHerokuName}-development`,
  test: `mongodb://localhost/${mongooseBaseName}-test`
}

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.MONGODB_URI || localDb

module.exports = currentDb
