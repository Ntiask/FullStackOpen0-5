const personsRouter = require('./controllers/persons')
app.use('/api/notes', personsRouter)

//ohjelmisto koodi
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('sbody', function (req, res) { return JSON.stringify(req['body'])})
morgan.token('rbody', function (req, res) { return JSON.stringify(res['body'])})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :sbody'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

 

  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

    next(error)
  }
  app.use(errorHandler)
    
  //OK
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })