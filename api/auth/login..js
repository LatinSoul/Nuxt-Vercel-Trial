// module.exports = (req, res) => {
//     res.send(`This response would send information about teams. equivalent to app.get('/teams/data')`);
// };

// Auth required files
// const jwt = require('jsonwebtoken')
// const { createToken } = require('../utils/jwt')
// const errorHandler = require('../utils/errorHandler')
// const User = require('../models/User')

module.exports = (req, res) => {
    // console.log('triggering auth login function')
    const { email } = req.body
    // try {
    //     const user = await User.findOne({ email })
    //     // console.log('uid:', user._id)
    //     const token = createToken(user._id)
    //     res.cookie('user', user, { httpOnly: true })
    //     res.status(200).json({ token })
    // } catch (err) {
    //     const errors = errorHandler(err)
    //     res.status(400).json({ errors })
    // }
    res.status(200).json({ status: email })
}