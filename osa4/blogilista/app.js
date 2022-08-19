const http = require('http')
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/testapi')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

// Cross site and Json parser
app.use(cors())
app.use(express.json())

//User identification
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

// Logger
app.use(middleware.requestLogger)


app.use(blogsRouter)
app.use(usersRouter)
app.use(loginRouter)

if (process.env.NODE_ENV === 'development') {
    app.use(testRouter)
  }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app