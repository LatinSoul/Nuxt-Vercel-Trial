import User from './models/User'
import dbConnect from './dbConnect'

const auth = async (req, res) => {
    await dbConnect()
    const email = 'oc@gmail.com'
    try {
        const user = await User.findOne({ email })
        // console.log('uid:', user._id)
        // const token = createToken(user._id)
        // res.cookie('user', user, { httpOnly: true })
        res.status(200).json({ user: user._id })
    } catch (err) {
        // const errors = errorHandler(err)
        res.status(400).json({ err })
    }
}

export default auth