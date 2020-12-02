const sleep = require('../utils/sleep')

class AuthService {
  constructor() {}

  async authenticate(email, password) {
    await sleep(2000)
    return email === 'admin@medlab.com' && password === '123456789'
  }
}

module.exports = AuthService
