const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.secret

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if(!token) return res.status(403).send({ message: 'Токен не предоставлен' })
    jwt.verify(token, secret, function(err, decoded) {
        if(err) return res.status(401).send({ message: 'Не авторизоавн' })
        req.userUid = decoded.uid
        next()
    })
}

const authJwt = {
    verifyToken
}

module.exports = authJwt