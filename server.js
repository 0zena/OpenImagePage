const express = require('express')
const mySQL = require('mysql')
const app = express()
const port = 3000
const path = require('path')
const dotenv = require('dotenv')

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/signin.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/register.html'))
})

app.listen(port, () => {
  console.log(`Hosting port: ${port}`)
})

dataBase.connect( (error) => {
  let msg = error ? "FAILED" : "CONNECTED"
  console.log(`SQL: ${msg}`)
})