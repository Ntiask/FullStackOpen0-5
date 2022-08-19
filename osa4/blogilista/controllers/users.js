const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/api/users', async (request, response) => {
  let allUsers = await User.find({})
  allUsers = allUsers.map(user => user.username)
  const username = request.body.username 
  const name = request.body.name
  const password  = request.body.password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (allUsers.includes(username) || password.length < 3){
    response.status(400).send({error: 'Username is allready taken or password was too short'})
  } else{

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
}})


usersRouter.get('/api/users', async (req,res) => {
  const all = await User.find({}).populate('blogs', {title: 1, likes: 1})
  res.status(201).json(all)
})

usersRouter.get('/api/users/:id', async (req,res) => {
  const all = await User.findById(req.params.id).populate('blogs', {title: 1, likes: 1})
  res.status(201).json(all)
})


module.exports = usersRouter