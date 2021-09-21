// const { createToken } = require('../utils/jwt')
// const errorHandler = require('../utils/errorHandler')
// const User = require('../models/User')
import jwt from 'jsonwebtoken'
// const mongoose = require('mongoose')

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useFindAndModify: false,
            useCreateIndex: true,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}


// MongoDB connexion
const dbURI = 'mongodb+srv://oliver:socrates@cluster0.ixjbh.mongodb.net/djio?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => { console.log('Successfully connected to DJIO database') })
    .catch((err) => console.log('db conn err:', err))

// User
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your first name or nickname'],
        lowercase: true,
        // validate: [isEmail, 'Please enter a valid email']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your last name'],
        lowercase: true,
        // validate: [isEmail, 'Please enter a valid email']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Password must be be at least 6 character/digits length']
    }
})
// In model() function below, the 'user' (1st arg) is the singular of the collection name in the mongodb. Mongo db uses it as the single unit of the same name collection.
// thus, if the collection name is 'users' in Mongo db, the user arg here should be named 'user' 

// Encrypt password before creating a user in Mongo (Mongoose Hooks) 
// 1st arg = hook name (check Mongoose doc for hooks)
// 2nd arg = next (typical function to call when using hooks to let the program move on to the next thing to do)
// Note: since we are using a function that does sthg BEFORE we save sthg in the db, we don't have any other arg inside the 2nd function (which will only contain the next function arg) arg
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema)

// jwt
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_1, { expiresIn: maxAge })
}

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers.authorization
//     const token = authHeader && authHeader.split(' ')[1]
//     // console.log('req user:', req.user)
//     // console.log('authHeader', authHeader)
//     if (token == null) return res.sendStatus(401)
//     jwt.verify(token, process.env.ACCESS_TOKEN_1, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }
// errH
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

module.exports = async (req, res) => {
    
    const { email } = await req.body
    try {
        const user = await User.findOne({ email })
        const token = createToken(user._id)
        res.cookie('user', user, { httpOnly: true })
        res.status(200).send({ token })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).send({ errors })
    }
    // res.status(200).json({ status: email })
}