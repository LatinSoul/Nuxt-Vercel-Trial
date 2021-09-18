/* eslint-disable no-console */
const app = require('express')()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const { v4 } = require('uuid');

// MongoDB connexion
const dbURI = 'mongodb+srv://oliver:socrates@cluster0.ixjbh.mongodb.net/djio?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => { console.log('Successfully connected to DJIO database') })
    .catch((err) => console.log('db conn err:', err))

// Routes
// const routes = require('./routes/routes')

// Middleware resources
app.use(cookieParser())
// app.use(express.json())
// app.use('/api', routes)

app.get('/api', (req, res) => {
    const path = `/api/item/${v4()}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

// app.get('/api/item/:slug', (req, res) => {
//     const { slug } = req.params;
//     res.end(`Item: ${slug}`);
// });

module.exports = app;


// Packages
// const express = require('express')
// const cookieParser = require('cookie-parser')
// const mongoose = require('mongoose')
// Internal Resources
// const authRoutes = require('./routes/authRoutes')
// const userRoutes = require('./routes/userRoutes')
// const projectRoutes = require('./routes/projectRoutes')
// const mailerRoutes = require('./routes/mailerRoutes')

// const app = express()
// MongoDB connexion
// const dbURI = 'mongodb+srv://oliver:socrates@cluster0.ixjbh.mongodb.net/djio?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    // .then((result) => { console.log('Successfully connected to DJIO database') })
    // .catch((err) => console.log('db conn err:', err))

// Middleware resources
// app.use(cookieParser())
// app.use(express.json())
// app.use('/auth', authRoutes)
// app.use('/user', userRoutes)
// // app.use('/project', projectRoutes)
// // app.use('/post', postRoutes)
// app.use('/mailer', mailerRoutes)

// module.exports = {
//     path: '/api',
//     handler: app
// }