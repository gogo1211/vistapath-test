const auth = require('./auth')
const cases = require('./cases')
const images = require('./images')

module.exports = (app) => {
  app.use('/auth', auth)
  app.use('/cases', cases)
  app.use('/images', images)
}
