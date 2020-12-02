const Router = require('express-promise-router')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const CaseService = require('../services/cases')

const router = new Router()
const CaseServiceInstance = new CaseService()

const DIR = './public/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    console.log(fileName)
    cb(null, uuidv4() + '-' + fileName)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

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

router.post('/', upload.array('images', 10), async (req, res) => {
  const { data, annotations } = req.body
  const { name, note } = JSON.parse(data)
  if (!name) {
    res.status(400).json({ error: 'Bad Request: Name is required' })
    return
  }
  const item = await CaseServiceInstance.create({
    name,
    note,
    files: req.files.map(({ filename }) => filename),
    annotations
  })
  res.status(200).json(item)
})

router.put('/:id', upload.array('new-images', 10), async (req, res) => {
  const { data, annotations } = req.body
  const item = await CaseServiceInstance.update(req.params.id, {
    ...JSON.parse(data),
    files: req.files.map(({ filename }) => filename),
    annotations
  })
  res.status(200).json(item)
})

router.delete('/:id', async (req, res) => {
  await CaseServiceInstance.removeById(req.params.id)
  return res.status(200).json({ success: true })
})

module.exports = router
