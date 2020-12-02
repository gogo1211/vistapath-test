const Router = require('express-promise-router')
const path = require('path');

const router = new Router()

router.get('/view/:file', async (req, res) => {
  const { file } = req.params
  return res.sendFile(path.join(__dirname, `../../public/${file}`))
})

module.exports = router
