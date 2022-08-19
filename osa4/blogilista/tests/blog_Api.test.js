const mongoose = require('mongoose')
const supertest = require('supertest')
const { string, help } = require('yargs')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/users')

const api = supertest(app)

const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')


beforeEach(async () => {
    const user = {
      username : "testi",
      name : "testaaja",
      password : "pr2jk"
    }
    const u = new User(user)
    u.save()

    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added ', async () => {
    const newblog = {
        title:"Testi1231212515ggggg",
        author:"0505995008",
        url:"eaekgaegnaoegoaengoane",
        likes:5
    }
  
    await api
      .post('/api/blogs')
      .send(newblog)
      .set({Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3R0aSIsImlkIjoiNjJkNjU5MTNhNTNjNzk3NmRjN2UyZjRjIiwiaWF0IjoxNjU4MjI3Njg4LCJleHAiOjE2NTgyMzEyODh9.0mv0y7g1NiRrPdWdmLXn8_eubApAGccm2Kp8MdaFtFg"})
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles.length).toBe(helper.initialBlogs.length +1)
    expect(titles).toContain(
      'Testi1231212515ggggg'
    )
  })


test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('HTML is easy')
  })

test('ID is defined on database objects', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]._id).toBeDefined()
})

test('likes to be defined as 0 when empty', async () => {
    const newblog = {
        title:"Test likes to be 0",
        author:"Matti kehveli",
        url:"eaekgaegnaoegoaengoane",
    }
  
    const res = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs/'+ res.body._id)
    
    expect(response.body.likes).toBe(0)
  })

  test('400 when no title or url', async () => {
    const newblog = {
        author:"Matti kehveli",
        url: 'testi.com',
        likes: 15
    }

    const res = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(400)

    const newblog2 = {
        title: "testi",
        author:"Matti kehveli",
        likes: 15
    }

    const res2 = await api
      .post('/api/blogs')
      .send(newblog2)
      .expect(400)

  })

  test('ID can be modified by PUT', async () => {
    const newblog = {
        title:"TEST PUT",
        author:"Matti kehveli",
        url:"eaekgaegnaoegoaengoane",
        likes: 100
    }

    const newblog2 = {
      title:"TEST PUT",
      author:"Matti kehveli",
      url:"eaekgaegnaoegoaengoane",
      likes: 102
    }

    const res = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.put('/api/blogs/'+ res.body._id).send(newblog2)
    
    expect(response.body.likes).toBe(102)
  })


afterAll(() => {
  mongoose.connection.close()
})