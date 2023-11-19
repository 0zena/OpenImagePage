const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));

const mySQL = require('mysql');

const dataBase = mySQL.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

router.post('/register', async (req, res) => {
  const salt =  await bcrypt.genSalt(saltRounds)

  const name = req.body.username
  const email = req.body.email 
  const password = await bcrypt.hash(req.body.password, salt)

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

router.post('/signin', async (req, res) => {
  const login = req.body.login
  const password = req.body.password
  
  const sqlL = `SELECT Username, Email, Password FROM users WHERE Email = ?`

  dataBase.query(sqlL, [login], async (error, results) => {
    if (error) { 
      console.log('Database error:', error)
      res.status(500).json({error: 'Database error'}) 
    }
    if (results.length > 0) {
      const hashedPassword = results[0].Password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful', user: results[0] });
      } else {
        res.status(400).json({ error: 'Failed, email or password are incorrect' });
      }
    } else {
      res.status(400).json({ error: 'Failed, email or password are incorrect' });
    }
  });
}) 

module.exports = router