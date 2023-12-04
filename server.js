const express = require('express')
const mySQL = require('mysql')
const app = express()
const port = 3000
const path = require('path')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

dotenv.config({path: './.env'})

const dataBase = mySQL.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

app.use('/static', express.static('static'))
app.use('/views', express.static('views'));
app.use('/auth', require('./routes/auth'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/login', authToken, (req, res) => {
  if(!authToken) {
    res.sendFile(path.join(__dirname, '/views/signin.html'))
  }
  res.sendFile(path.join(__dirname, '/views/user-profile.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/register.html'))
})

app.listen(port, () => {
  console.log(`Hosting port: ${port}`)
})

function authToken(req, res, next) {
  const cookies = req.headers.cookie;
  
  if (!cookies) {
    return res.status(401).send('Unauthorized')
  }

  const cookieArray = cookies.split(';').map(cookie => cookie.trim().split('='));
  const tokenPair = cookieArray.find(cookie => cookie[0] === 'user-auth');

  if (!tokenPair) {
    return res.status(401).send('Unauthorized')
  }

  const token = tokenPair[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err)
      return res.status(401).send('Unauthorized')
    }
    req.user = user;
    next()
  })
  return true
}

dataBase.connect( (error) => {
  let msg = error ? "FAILED" : "CONNECTED"
  console.log(`SQL: ${msg}`)
})
