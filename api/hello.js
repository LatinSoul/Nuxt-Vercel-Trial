// MongoDB connexion
const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://oliver:socrates@cluster0.ixjbh.mongodb.net/djio?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => { console.log('Successfully connected to DJIO database') }) // eslint-disable-line no-console
    .catch((err) => console.log('db conn err:', err)) // eslint-disable-line no-console
// Hello serverless function
const hello = (req, res) => {
    res.status('200').json({ message: 'back to export default' });
}

export default hello