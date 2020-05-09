const { Router } = require('express')

const { BookController } = require('./controllers')

const routes = Router()

// Book
routes.post('/books', BookController.create)
routes.get('/books', BookController.findAll)
routes.get('/books/:id', BookController.findById)
routes.delete('/books/:id', BookController.deleteById)
routes.put('/books/:id', BookController.updateById)

module.exports = { routes }
