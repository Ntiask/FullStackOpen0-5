const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/api/blogs', async (request, response) => {
    blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
    })

blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  blogs = await Blog.findById(id).populate('user', {username: 1, name: 1})
  response.json(blogs)
  })

  blogsRouter.post('/api/blogs', async (request, response) => {
    const title = request.body.title
    const url = request.body.url
    const token = request.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    if (title === undefined || url === undefined) {
      response.status(400).end()
    } else {
    
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(200).json(blog)
  }
  })

  blogsRouter.delete('/api/blogs/:id', async (req,res) => {
    const token = req.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    console.log(blog.user.toString(), user._id.toString())

    if (blog.user.toString() === user._id.toString()){
    const result = await Blog.findByIdAndDelete(req.params.id)
    res.status(201).json(result)
    } else if (user._id.toString() === '62d7abe724b44a8b1862943b') {
      const result = await Blog.findByIdAndDelete(req.params.id)
      res.status(201).json({status: 'Delete Completed!  Hello Admin!'})
    } else {
    res.status(401).json({error: 'Unauthorized Delete'})
  }
  })

  blogsRouter.put('/api/blogs/:id', async (request, response) => {
    /* BELOW CODE FOR AUTHENTICATION IF NEEDED IN FUTURE
    const user = await User.findOne({username: request.body.user})
    const blog = await Blog.findById(request.params.id)
    const bloguser = blog.user.toString()
    const userid = user._id.toString()
    if (userid !== bloguser) {
        response.status(401).json({error: 'Unauthorized PUT'})
    }
    else {*/
    const object = 
    {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes:request.body.likes
    }
    const results = await Blog.findByIdAndUpdate(request.params.id, object, { new: true })
    response.status(201).json(results)
    //}
})
  
  module.exports = blogsRouter