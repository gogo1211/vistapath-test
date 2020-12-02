const { Case, Image } = require('../models')

class CaseService {
  constructor() {}

  async getAll() {
    const cases = await Case.findAll({
      include: ['images'],
      order: [['createdAt', 'ASC']]
    })
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
    return this.analyze(item.id)
  }

  async update(id, data) {
    const item = await Case.findByPk(id)
    if (item.status === 'approved') {
      throw new Error('Can not update this case')
    }
    const updatedItem = await item.update(data)
    return this.analyze(updatedItem.id)
  }

  async removeById(id) {
    await Case.destroy({ where: { id } })
  }

  async analyze(id) {
    const item = await Case.findByPk(id, { include: 'images' })

    // review case and update status
    const status = this.random() ? 'rejected' : 'approved'

    const updatedItem = await item.update({ status })
    return updatedItem
  }

  random() {
    return Math.floor(Math.random() * 10) % 3
  }
}

module.exports = CaseService
