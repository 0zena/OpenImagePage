const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mySQL = require('mysql')
const cookieParser = require('cookie-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.json())
router.use(cookieParser())

const saltRounds = 10

const dataBase = mySQL.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

router.post('/register', async (req, res) => {
  const salt =  await bcrypt.genSalt(saltRounds)
  const sqlQ = `SELECT Email FROM users WHERE Email = ?`

  const name = req.body.username
  const email = req.body.email 
  const password = await bcrypt.hash(req.body.password, salt)


  dataBase.query(sqlQ, [email], (error, results) => {
    if (error) { 
      res
        .status(500)
        .json({ error: 'Database error' })
    } 
    if (results.length > 0) { 
      res
        .status(400)
        .json({ error: 'User with this email already exists' })
    } else { 
      dataBase.query(`CALL RegisterUser('${name}', '${email}', '${password}')`)

      res
        .status(200)
        .json({ message: 'Register succesfully'})
    }
  })
})

router.post('/signin', async (req, res) => {
  const sqlL = `SELECT Username, Email, Password FROM users WHERE Email = ?`

  const login = req.body.login
  const password = req.body.password

  dataBase.query(sqlL, [login], async (error, results) => {
    if (error) { 
      console.log('Database error:', error)
      res
      .status(500)
      .json({ error: 'Database error' }) 
    }
    if (results.length > 0) {
      const hashedPassword = results[0].Password
      const passwordMatch = await bcrypt.compare(password, hashedPassword)

      if (passwordMatch) {
        const token = jwt.sign({ username: results[0].Username, email: results[0].Email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res
          .cookie('user-auth', token, {httpOnly: true})
          .status(200)
          .json({ 
            token: token,
            message: 'Login successful', 
            user: results[0].Email 
          })
      } else {
        res
          .status(400)
          .json({ error: 'Failed, email or password are incorrect' })
      }
    } else {
      res
        .status(400)
        .json({ error: 'Failed, email or password are incorrect' })
    }
  })
})

module.exports = router