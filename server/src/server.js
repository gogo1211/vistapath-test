const express = require('express')
const app = express()
const cors = require('cors')

const controllers = require('./controllers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

controllers(app)

module.exports = app
