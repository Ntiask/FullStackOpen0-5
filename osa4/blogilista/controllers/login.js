const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')

loginRouter.post('/api/login', async (req, res) => {
    const username = req.body.Username
    const password = req.body.Password
    console.log("USERNAME AND PASS", username, password)
    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    console.log("Found User: ", user)
    console.log("Password eval: ", passwordCorrect)
    console.log('username from request: ', username)
    console.log('password from request: ', req.body)

    if (!(user && passwordCorrect)){
        return res.status(401).json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter