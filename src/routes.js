const { Router } = require('express')

const { Validations } = require('./middlewares')
const { BookController } = require('./controllers')

const routes = Router()

// Book
routes.post('/books', BookController.create)
routes.get('/books', BookController.findAll)
routes.get('/books/:id', Validations.validateId, BookController.findById)
routes.delete('/books/:id', Validations.validateId, BookController.deleteById)
routes.put('/books/:id', Validations.validateId, BookController.updateById)

module.exports = { routes }
