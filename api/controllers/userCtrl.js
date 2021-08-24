require('dotenv').config()
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.user_get = (req, res) => {
    const user = req.cookies['user']
    // res.json({ user: user })
    res.status(200).json({ user: user })
}
// module.exports.user_post = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const user = await User.create({ email, password })
//         res.status(201).json({ user: user._id })
//     } catch (err) {
//         const errors = errorHandler(err)
//         res.status(400).json({ errors })
//     }
// }
// module.exports.user_put = async (req, res) => {
//     // const { id } = req.params.id
//     // const { firstname, lastname, email, password } = req.body
//     try {
//         const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true })
//         res.status(201).json({ user })
//     } catch (err) {
//         const errors = errorHandler(err)
//         res.status(400).json({ errors })
//     }
// }
// module.exports.user_del = async (req, res) => {
//     const { id } = req.params.id
//     try {
//         const user = await User.findOneAndDelete({ _id: id }, { new: true })
//         res.status(201).json({ user })
//     } catch (err) {
//         const errors = errorHandler(err)
//         res.status(400).json({ errors })
//     }
// }
// module.exports.user_patch = (req, res) => {
// const { id } = req.params.id
//     try {
//         const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true })
//         res.status(201).json({ user })
//     } catch (err) {
//         const errors = errorHandler(err)
//         res.status(400).json({ errors })
//     }
// }

// module.exports.user_put = async (req, res) => {
//     const { firstname, lastname, email, password } = req.body
//     const { id } = req.params.id
//     const id = "60f6ab0f729d6a29d0228750"
//     try {
//         const user = await User.findOneAndUpdate({ _id: id }, { firstname: firstname, lastname: lastname, email: email }, { new: true })
//         res.status(201).json({ user })
//     } catch (err) {
//         const errors = errorHandler(err)
//         res.status(400).json({ errors })
//     }
// }
// module.exports.user_patch = (req, res) => {
//     const user = req.cookies['user']
//     res.json({ user: user })
// }