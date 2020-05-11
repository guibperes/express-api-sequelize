const { Response } = require('../../libs');
const { Book } = require('./model');

const create = async (req, res) =>
  Response.send(res, await Book.create(req.body));

const updateById = async (req, res) =>
  Response.send(res, await Book.updateById(req.params.id, req.body));

const deleteById = async (req, res) =>
  Response.send(res, await Book.deleteById(req.params.id));

const findAll = async (req, res) => Response.send(res, await Book.findAll());

const findById = async (req, res) =>
  Response.send(res, await Book.findById(req.params.id));

module.exports = {
  BookController: {
    create,
    updateById,
    deleteById,
    findAll,
    findById,
  },
};
