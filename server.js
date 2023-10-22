//#region const
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:3000')
//#endregion

app.use('/static', express.static('static'))
app.use('/views', express.static('views'));

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
  console.log(`Hosting port ${port}`)
})
