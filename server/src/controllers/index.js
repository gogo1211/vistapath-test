const cases = require('./cases')

module.exports = (app) => {
  app.use('/cases', cases)
}
