const Yup = require('yup')

const db = require('../database')

/**
 * id: int (auto increment, primary key)
 * name: string (not null, min=4, max=40)
 * description: string (min=4, max=255)
 * pages: int (not null min=1)

  CREATE TABLE book(
    id serial primary key,
    name varchar(40) not null,
    description varchar(255),
    pages integer not null
  );

  Error Object:
  {
    error: {// Retorno de erros
      status: 404,
      data: {
        timestamp: new Date().toISOString(),
        error: 'Not Found',
        message: 'Cannot find book with provided id'
      }
    },
    content: {} // Dados do objeto com sucesso
  }
**/

const BookIdValidator = Yup.object().shape({
  id: Yup.number().integer().required()
})

const BookCreateValidator = Yup.object().shape({
  name: Yup.string().required().min(4).max(40),
  description: Yup.string().min(4).max(255),
  pages: Yup.number().integer().required().min(1)
})

const BookUpdateValidator = Yup.object().shape({
  name: Yup.string().min(4).max(40),
  description: Yup.string().min(4).max(255),
  pages: Yup.number().integer().min(1)
})

const CREATE_QUERY = `
  INSERT INTO book (name, description, pages)
  VALUES ($1, $2, $3)
  RETURNING id, name, description, pages;
`

const UPDATE_BY_ID_QUERY = `
  UPDATE book SET
    name = $1,
    description = $2,
    pages = $3
  WHERE id = $4
  RETURNING id, name, description, pages;
`

const DELETE_BY_ID_QUERY = `
  DELETE FROM book
  WHERE id = $1;
`

const FIND_ALL_QUERY = `
  SELECT id, name, description, pages
  FROM book;
`

const FIND_BY_ID_QUERY = `
  SELECT id, name, description, pages
  FROM book
  WHERE id = $1;
`

async function create({ name, description, pages }) {
  try {
    const { rows } = await db.query(CREATE_QUERY, [name, description, pages])
    const book = rows[0]

    return {
      content: {
        id: book.id,
        name: book.name,
        description: book.description || '',
        pages: book.pages
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        status: 500,
        data: {
          timestamp: new Date().toISOString(),
          error: 'Internal Server Error',
          message: 'Internal Server Error, contact the dev'
        }
      }
    }
  }
}

async function updateById(id, bookData) {
  try {
    const result = await findById(id)

    if (result.error) {
      return result
    }

    const { name, description, pages } = { ...result.content, ...bookData }

    const { rows } = await db.query(UPDATE_BY_ID_QUERY, [name, description, pages, id])
    const updatedBook = rows[0]

    return {
      content: {
        id: updatedBook.id,
        name: updatedBook.name,
        description: updatedBook.description || '',
        pages: updatedBook.pages
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        status: 500,
        data: {
          timestamp: new Date().toISOString(),
          error: 'Internal Server Error',
          message: 'Internal Server Error, contact the dev'
        }
      }
    }
  }
}

async function deleteById(id) {
  try {
    const result = await findById(id)

    if (result.error) {
      return result
    }

    await db.query(DELETE_BY_ID_QUERY, [id])

    return {
      content: {
        deleted: true
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        status: 500,
        data: {
          timestamp: new Date().toISOString(),
          error: 'Internal Server Error',
          message: 'Internal Server Error, contact the dev'
        }
      }
    }
  }
}

async function findAll() {
  try {
    const { rows } = await db.query(FIND_ALL_QUERY)

    const content = rows.map(book => ({
      id: book.id,
      name: book.name,
      description: book.description || '',
      pages: book.pages
    }))

    return { content }
  } catch (error) {
    console.log(error)
    return {
      content: []
    }
  }
}

async function findById(id) {
  try {
    const { rows } = await db.query(FIND_BY_ID_QUERY, [id])
    const book = rows[0]

    if (!book) {
      return {
        error: {
          status: 404,
          data: {
            timestamp: new Date().toISOString(),
            error: 'Not Found',
            message: 'Cannot find book with provided id'
          }
        }
      }
    }

    return {
      content: {
        id: book.id,
        name: book.name,
        description: book.description || '',
        pages: book.pages
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        status: 500,
        data: {
          timestamp: new Date().toISOString(),
          error: 'Internal Server Error',
          message: 'Internal Server Error, contact the dev'
        }
      }
    }
  }
}

module.exports = {
  BookIdValidator,
  BookCreateValidator,
  BookUpdateValidator,
  Book: {
    create,
    updateById,
    deleteById,
    findAll,
    findById
  }
}
