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
    const row = await Case.findByPk(id, { include: 'images' })
    return row
  }

  async create(data) {
    const newCase = await Case.create(data)
    return newCase
  }

  async removeById(id) {
    await Case.destroy({ where: { id } })
  }
}

module.exports = CaseService
