const cases = require('./cases')
const images = require('./images')

module.exports = (app) => {
  app.use('/cases', cases)
  app.use('/images', images)
}
