const Router = require('express-promise-router')

const { Case, Image } = require('../models')

const router = new Router()

router.get('/', async (req, res) => {
  const cases = await Case.findAll({
    include: ['images'],
    order: [['createdAt', 'ASC']]
  })
  return res.status(200).json(cases)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const row = await Case.findByPk(id, { include: 'images' })

  if (row) {
    res.status(200).json(row)
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
  const newCase = await Case.create({
    name,
    note
  })
  res.status(200).json(newCase)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await Case.destroy({ where: { id } })
  return res.status(200).json({ success: true })
})

module.exports = router
