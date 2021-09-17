// refactoring auth routes into routes.js
// const { Router } = require('express')
const routes = require('express').Router()
// Utils
const { createToken } = require('../utils/jwt')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
// Auth Routes
routes.post('/auth/register', async (req, res) => {
    // console.log('firing register_post from authCtrl.js')
    const { email, password } = req.body
    try {
        const user = await User.create({ email, password })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({ errors })
    }
})
routes.post('/auth/login', async (req, res) => {
    // console.log('triggering auth login function')
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        // console.log('uid:', user._id)
        const token = createToken(user._id)
        res.cookie('user', user, { httpOnly: true })
        res.status(200).json({ token })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({ errors })
    }
})
routes.get('/auth/logout', (req, res) => {
    // should we remove user info from the cookie?
    res.status(200).json({ status: 'OK' })
})
// Test route
routes.post('/auth/test', (req, res) => {
    const test = req.body.test
    res.status(200).json({ status: test })
})

module.exports = routes