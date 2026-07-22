const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

require('./db')
require('./route')(app)

app.listen(3000,() =>{
    console.log('Server is running on port 3000')
})