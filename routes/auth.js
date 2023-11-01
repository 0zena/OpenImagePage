const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', (req, res) => {
    const { name, email, password } = req.body
    
})

module.exports = router