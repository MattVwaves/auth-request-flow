const express = require('express')
const jwt = require('jsonwebtoken')
secret = process.env.JWT_SECRET

const router = express.Router()

const mockUser = {
  username: 'authguy',
  password: 'mypassword',
  profile: {
    firstName: 'Chris',
    lastName: 'Wolstenholme',
    age: 43
  }
}

router.post('/login', (req, res) => {
  const token = jwt.sign(mockUser.username, secret)
  res.json({ token })
})

router.get('/profile', (req, res) => {
  const header = req.headers['authorization']
  // console.log(header)
  const token = header.split(' ')[1]
  console.log(token)
  try {
    const validToken = jwt.verify(token, secret)
    res.status(200).json(mockUser.profile)
  } catch (error) {
    res.status(400).json({ Error: 'Invalid token detected!' })
  }
})

module.exports = router
