const Router = require('express-promise-router')

const CaseService = require('../services/cases')

const router = new Router()
const CaseServiceInstance = new CaseService()

router.get('/', async (req, res) => {
  const cases = await CaseServiceInstance.getAll()
  return res.status(200).json(cases)
})

router.get('/:id', async (req, res) => {
  const item = await CaseServiceInstance.getById(req.params.id)

  if (item) {
    res.status(200).json(item)
  } else {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/', async (req, res) => {
  const { name, note } = req.body
  if (!name) {
    res.status(400).json({ error: 'Bad Request: Name is required' })
    return
  }
  const item = await CaseServiceInstance.create({
    name,
    note
  })
  res.status(200).json(item)
})

router.put('/:id', async (req, res) => {
  const item = await CaseServiceInstance.update(req.params.id, req.body)
  res.status(200).json(item)
})

router.delete('/:id', async (req, res) => {
  await CaseServiceInstance.removeById(req.params.id)
  return res.status(200).json({ success: true })
})

module.exports = router
