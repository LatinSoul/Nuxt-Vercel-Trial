const mongoose = require('mongoose')

// const dbURI = 'mongodb+srv://oliver:socrates@cluster0.ixjbh.mongodb.net/djio?retryWrites=true&w=majority'
const dbURI = process.env.MONGODB_URI
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
const dbConn = mongoose.connect(dbURI, dbOptions)
    .then((result) => { console.log('Successfully connected to DJIO database') }) // eslint-disable-line no-console
    .catch((err) => console.log('db conn err:', err)) // eslint-disable-line no-console

export default dbConn