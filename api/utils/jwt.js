import jwt from 'jsonwebtoken'

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_1, { expiresIn: maxAge })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    // console.log('req user:', req.user)
    // console.log('authHeader', authHeader)
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_1, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export { authenticateToken, createToken }