const { Book, BookCreateValidator, BookUpdateValidator } = require('../models')

/**
 * Validar o id
 * Validar o body
 * Chamar a função no model
 * Verificar se tem algum erro
 * Retornar resposta de sucesso
 *
 * DRY - Don't Repeat Yourself
*/

async function create(req, res) {
  try {
    await BookCreateValidator.validate(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(400).json(error)
  }

  const result = await Book.create(req.body)

  if (result.error) {
    return res.status(result.error.status).json(result.error.data)
  }

  return res.json(result.content)
}

async function updateById(req, res) {
  try {
    await BookUpdateValidator.validate(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(400).json(error)
  }

  const result = await Book.updateById(req.params.id, req.body)

  if (result.error) {
    return res.status(result.error.status).json(result.error.data)
  }

  return res.json(result.content)
}

async function deleteById(req, res) {
  const result = await Book.deleteById(req.params.id)

  if (result.error) {
    return res.status(result.error.status).json(result.error.data)
  }

  return res.json(result.content)
}

async function findAll(req, res) {
  const result = await Book.findAll()

  return res.json(result.content)
}

async function findById(req, res) {
  const result = await Book.findById(req.params.id)

  if (result.error) {
    return res.status(result.error.status).json(result.error.data)
  }

  return res.json(result.content)
}

module.exports = {
  BookController: {
    create,
    updateById,
    deleteById,
    findAll,
    findById
  }
}
