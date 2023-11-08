const express = require('express')
const router = express.Router()

const path = require('path')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));

const mySQL = require('mysql');

const dataBase = mySQL.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

router.post('/register', (req, res) => {
  const name = req.body.username
  const email = req.body.email 
  const password = req.body.password

  const sqlQ = `SELECT Email FROM users WHERE Email = ?`
  dataBase.query(sqlQ, [email], (error, results) => {

    if (error) { 
      console.log('Database error:', error)
      res.status(500).json({error: 'Database error'})
    } 
    if (results.length > 0) { 
      res.status(400).json({error: 'User with this email already exists'})
    } else { 
      dataBase.query(`CALL RegisterUser('${name}', '${email}', '${password}')`)
      res.status(200).json({message: 'User registered'})
    }
  })
})

router.post('/signin', (req, res) => {
  const login = req.body.login
  const password = req.body.password
  const sqlL = `SELECT Username, Email FROM users WHERE Email = ? AND Password = ?`
  
  dataBase.query(sqlL, [login, password], (error, results) => {
    if (error) { 
      console.log('Database error:', error)
      res.status(500).json({error: 'Database error'}) 
    }
    if (results.length > 0) {
      var response =  results
      res.status(200).json({message: response})
    } else {
      res.status(400).json({error: 'Failed, email or password are incorrect'})
    }
  })
}) 

module.exports = router