const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkToken = (req, res) => {
  console.log('req.user', req.user)
  res.json(req.exp)
}

const dataController = {
  async create (req, res, next) {
    try {
      const user = await User.create(req.body)
      console.log(req.body)
      // console.log(user)
      // token will be a string
      const token = createJWT(user)
      // console.log(user)
      // send back the token as a string
      // which we need to account for
      // in the client
      res.locals.user = user
      res.locals.token = token
      next()
    } catch (e) {
      console.log('you got a database problem')
      console.log(e)
      res.status(400).json(e)
    }
  },
  async login (req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) throw new Error()
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) throw new Error()
      res.locals.user = user
      res.locals.token = createJWT(user)
      next()
    } catch (e){
      console.log(e)
      res.status(400).json('Bad Credentials')
    }
  }
}

const apiController = {
  auth (req, res) {
    res.json(res.locals.token)
  }
}

module.exports = {
  checkToken,
  dataController,
  apiController
}

/* -- Helper Functions -- */

function createJWT (user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}