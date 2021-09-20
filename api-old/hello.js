const express = require('express')

const app = express()
app.use(express.json())
// app.use(express.urlencoded())


// It is important that the full path is specified here
app.post('/api/hello', function (req, res) {
    const { info } = req.body
    res
        .status(200)
        .json({ info })
        .end()
})

export default app
