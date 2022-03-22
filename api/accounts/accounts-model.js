const db = require('../../data/db-config')

const getAll = async () => {
  return db('accounts')
}

const getById = async (id) => {
  const account = await db('accounts').where('id', id)
  return account[0]
}

const create = async (account) => {
  const accId = await db('accounts').insert(account)
  return getById(accId)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = async (id) => {
  await db('accounts').where('id', id).del()
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}