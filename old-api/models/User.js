const mongoose = require('mongoose')
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

const User = mongoose.model('user', userSchema)

export default User