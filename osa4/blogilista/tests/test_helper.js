const Blog = require('../models/blog')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: "Nuts",
    url: "www.example.com",
    likes: 10
  },
  {
    title: 'HTML is easy',
    author: "Nuts",
    url: "www.example.com/2",
    likes: 15
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'this will be removed soon!',
    author: "test",
    url: "testest",
    likes: 99
    })
    
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
