const express = require('express')

const app = express()
// const bodyParser = require('body-parser');
app.use(express.json())
app.use(express.urlencoded())


// It is important that the full path is specified here
app.post('/api/hello', function (req, res) {
    const { info } = req.body
    // console.log(info)
    res
        .status(200)
        .send({ info })
        .end()
})

export default app
