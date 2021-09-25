// require('dotenv').config()
import { dbConnect } from '../lib/db'

// let people = [{ name: 'Patrick' }, { name: 'Sandy' }, { name: 'Bob' }]

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        const db = await dbConnect()
        const collection = db.collection('users')
        const users = await collection.find({}).toArray()
        res.status(200).json({ users })
    } else if (req.method === 'POST') {
        const {email} = req.body
        res.status(200).json({email})
    } else if (req.method === 'PUT') {
        const { person, index } = req.body
        people[index] = person
        res.status(200).json(people)
    } else if (req.method === 'DELETE') {
        const { index } = req.body
        people = people.filter(function (_, i) { return i !== index })
        res.status(200).json(people)
    }
}