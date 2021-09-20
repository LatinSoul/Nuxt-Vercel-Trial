const express = require('express')
const app = express()
// const cookieParser = require('cookie-parser')
// const mongoose = require('mongoose')
const { v4 } = require('uuid');

// // MongoDB connexion
// const dbURI = 'mongodb+srv://oliver:socrates@cluster0.ixjbh.mongodb.net/djio?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
//     .then((result) => { console.log('Successfully connected to DJIO database') })
//     .catch((err) => console.log('db conn err:', err))

// Routes
// const routes = require('./routes/authRoutes')

// Auth requirements
// const { createToken } = require('./utils/jwt')
// const errorHandler = require('./utils/errorHandler')
// const User = require('./models/User')
// const login = require('./auth/login')


// Middleware resources
// app.use(cookieParser())
app.use(express.json())
// app.use('/api/auth', routes)

app.get('/api', (req, res) => {
    const path = `/api/item/${v4()}`
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})

app.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params
    res.end(`Item: ${slug}`)
})

app.get('/api/test', (req, res) => {
    const { test } = req.body
    res.end(`${test} from route: /api/test`)
})

module.exports = app;