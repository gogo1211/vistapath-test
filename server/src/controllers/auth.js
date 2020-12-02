const Router = require('express-promise-router')

const sleep = require('../utils/sleep')
const AuthService = require('../services/auth')

const router = new Router()
const AuthServiceInstance = new AuthService()

router.post('/', async (req, res) => {
  const { email, password } = req.body
  const isAuthenticated = await AuthServiceInstance.authenticate(
    email,
    password
  )
  if (isAuthenticated) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: 'Email or password incorrect' })
  }
})

module.exports = router
