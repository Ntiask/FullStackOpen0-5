const testRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users.js')

testRouter.post('/api/test/delete', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    return response.status(201).json({note: "Database Cleared"})
})

testRouter.get('/api/test/delete', async (request, response) => {
    return response.status(201).json({note: "Test API is running"})
})

module.exports = testRouter