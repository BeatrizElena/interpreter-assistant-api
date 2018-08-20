const mongoose = require('mongoose')
const fs = require('fs')
const dbAdress = require('../config/db')

// const User = require('../app/models/user.js')
const Doctor = require('../app/models/doctor.js')

mongoose.Promise = global.Promise
mongoose.connect(dbAdress, {
  useMongoClient: true
})

const db = mongoose.connection

const done = () => db.close()

const parseDoctors = () => {
  return new Promise((resolve, reject) => {
    const doctors = []
    const parse = require('csv').parse
    const parser = parse({ columns: true })

    const input = fs.createReadStream('data/doctors.csv')
    input.on('error', e => reject(e))

    parser.on('readable', () => {
      let record
      while (record = parser.read()) { // eslint-disable-line 
        doctors.push(record)
      }
    })

    parser.on('error', e => reject(e))
    parser.on('finish', () => resolve(items))
    input.pipe(parser)
    return doctors
  })
}

parseDoctors()
  .then((doctors) => {
      console.log(doctors)
    doctors.map(doctor => {
      Doctor.create({
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        title: doctor.title,
        phone: doctor.phone
      })
    })
    return doctors
  })

  .then(doctors => {
    console.log(`Created ${doctors.length} doctors!`)
  })
  .catch(console.error)
  .then(done)
