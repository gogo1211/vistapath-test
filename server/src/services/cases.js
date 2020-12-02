const { Case, Image } = require('../models')

class CaseService {
  constructor() {}

  async getAll() {
    const cases = await Case.findAll({
      include: ['images'],
      order: [['createdAt', 'ASC']]
    })
    await this.sleep(2000)
    return cases
  }

  async getById(id) {
    const item = await Case.findByPk(id, { include: 'images' })
    return item
  }

  async create(data) {
    const { name, note, files, annotations } = data
    const item = await Case.create({ name, note })

    await Image.bulkCreate(
      files.map((file, index) => ({
        case: item.id,
        link: file,
        annotation: annotations[index]
      }))
    )

    // analyze case
    await this.analyze(item.id)

    return this.getById(item.id)
  }

  async update(id, data) {
    const { name, note, images, files, annotations } = data
    const item = await Case.findByPk(id)

    if (item.status === 'approved') {
      throw new Error('Can not update this case')
    }

    await Image.destroy({ where: { case: id } })
    await Image.bulkCreate(images)
    await Image.bulkCreate(
      files.map((file, index) => ({
        case: item.id,
        link: file,
        annotation: annotations[index]
      }))
    )
    await item.update({ name, note })

    // analyze case
    await this.analyze(item.id)

    return this.getById(item.id)
  }

  async removeById(id) {
    await Case.destroy({ where: { id } })
  }

  async analyze(id) {
    const item = await Case.findByPk(id, { include: 'images' })

    // review case and update status
    const status = this.random() ? 'rejected' : 'approved'

    await item.update({ status })
  }

  random() {
    return Math.floor(Math.random() * 10) % 3
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

module.exports = CaseService
