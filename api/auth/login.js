const express = require('express')
const app = express()

const { createToken } = require('../utils/jwt')
// const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')

function errorHandler(err) {
    // console.log(err.message, err.code)
    const errors = { email: '', password: '' }
    // validating unique user registration
    // this check comes first, as if the email is already in use, there is no need to validate it at first place!
    if (err.code === 11000) {
        errors.email = 'Email already registered.'
        return errors
    }
    // validating inputs errors 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    } else {
        errors.null = `User doesn't exist`
    }
    return errors
}

app.post('/login', async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        const token = createToken(user._id)
        res.cookie('user', user, { httpOnly: true })
        res.status(200).send({ token })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).send({ errors })
    }
    // res.status(200).json({ user })
    // res.status(200).json({ status: email })
})

module.exports = app;