import dbConnect from './dbConnect'
import User from './models/User'
import errorHandler from './utils/errorHandler'

export default async (req, res) => {
    await dbConnect()
    // const query = req.query
    const { email, username } = req.body
    try {
        const user = await User.findOne({ email })
        // console.log('uid:', user._id)
        // const token = createToken(user._id)
        // res.cookie('user', user, { httpOnly: true })
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ user: user._id, email, username })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({ errors })
    }
}

// export default hello