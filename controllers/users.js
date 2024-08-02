const { user } = require('../models/users')
const { auth } = require('../models/auths')

const getUserByUid = async(req, res) => {
    try {
        const currentUser = await user.findOne({ where: { uid: req.userUid }})
        if(!currentUser) return res.status(404)
        return res.json(currentUser)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports = {
    getUserByUid,
}