import User from './models/User'
import dbConnect from './dbConnect'

const hello = async (req, res) => {
    await dbConnect()
    const body = req.body
    const email = 'oc@gmail.com'
    try {
        const user = await User.findOne({ email })
        // console.log('uid:', user._id)
        // const token = createToken(user._id)
        // res.cookie('user', user, { httpOnly: true })
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
        // json({ user: user._id, msg: bodyEmail })
    } catch (err) {
        // const errors = errorHandler(err)
        res.status(400).json({ err })
    }
}

export default hello