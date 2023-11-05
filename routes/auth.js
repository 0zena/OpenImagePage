const express = require('express')
const router = express.Router()

const path = require('path')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));

const mySQL = require('mysql')

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
    
    dataBase.query(`INSERT INTO userregister (Username, Email, Password) VALUES ( '${name}', '${email}', '${password}' )`)
    res.send("sent")
})

module.exports = router