// require('dotenv').config()
// import MongoClient from 'mongodb'
const {MongoClient} = require('mongodb')

let cachedDd = null

export const dbConnect = async () => {
    if (cachedDd) {
        console.log('Use existing connection!')
        return Promise.resolve(cachedDd)
    } else {
        return MongoClient.connect(process.env.MONGODB_URI, {
            native_parser: true,
            useUnifiedTopology: true
        }).then((client) => {
            const db = client.db(process.env.DB_NAME)
            console.log('New db connection')
            cachedDd = db
            return cachedDd
        }).catch((err) => {
            console.log('Mongo connection error')
            console.log(err)
        })
    }
}