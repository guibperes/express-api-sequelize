const express = require('express')
require('express-async-errors')

const { routes } = require('./routes')

const server = express()

server.use(express.json())
server.use(routes)

async function start() {
  try {
    server.listen(5000, () => console.log('Server is running on port 5000'))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
start()
