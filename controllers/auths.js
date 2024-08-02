const { user } = require('../models/users')
const { auth } = require('../models/auths')
const  theme_1  = require('../models/theme_1')
const  theme_2  = require('../models/theme_2')
const  theme_3  = require('../models/theme_3')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const secret = process.env.secret
const { v4: uuidv4 } = require('uuid')

const ACCESS_LIFETIME = 10;
const REFRESH_LIFETINE = 60 * 60 * 60 * 24 * 60;

const createToken = (uid, lifetime) => jwt.sign({ uid }, secret, { expiresIn: lifetime })
const createAccess = (uid) => createToken(uid, ACCESS_LIFETIME)
const createRefresh = (uid) => createToken(uid, REFRESH_LIFETINE)

const isPasswordValid = (password) => {
    if(password.length < 8) {
        return false 
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
    return regex.test(password);
}

exports.signup = async (req, res, next) => {
    const { email, password } = req.body
    
    if(!isPasswordValid(password)) {
        return res.status(400).json({ 
            message: 'Пароль не соответствует требованиям безопасности' 
        })
    }
    try {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const authed = await auth.create({
            email: email.toLowerCase(),
            password: hashedPassword,
            uid: uuidv4()
        })
        const createdUser = await user.create({
            uid: authed.uid,
            email: authed.email,
            first_name: req.body.first_name,
            second_name: req.body.second_name,
            patr_name: req.body.patr_name
        });
        const createdTheme_1 = await theme_1.create({
            uid: authed.uid
        });
        
        const createdTheme_2 = await theme_2.create({
            uid: authed.uid
        });
        const createdTheme_3 = await theme_3.create({
            uid: authed.uid
        });
        return res.status(201).send({
            message: 'Пользователь успешно зарегистрирован',
            email: authed.email,
            id1: `для теста 1: ${createdTheme_1.id}`,
            id2: `для теста 2: ${createdTheme_2.id}`,
            id3: `для теста 3: ${createdTheme_3.id}`,
        });
        
    } catch (error) {
        res.status(400).send({ 
            message: 'Пользователь не зарегистрирован, введены неверные данные',
            error: error.message,
        })
    }
}

exports.signin = async (req, res, next) => {
    try {
        const user = await auth.findOne({
            where: {
                email: req.body.email.toLowerCase()
            }
        })
        if (!user) return res.status(404).send({ message: 'Пользователь не найден!' })
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) return res.status(414).send({ message: 'Неверный пароль!' })

        const token = createAccess(user.uid)
        const token_refresh = createRefresh(user.uid)

        await auth.update({AccessToken: token, RefreshToken: token_refresh},
            {where: {uid: user.uid}}
        )
        return res.status(200).json({
            message: 'Успешный вход!',
            uid: user.uid,
            accessToken: token,
            refreshToken: token_refresh,
            email: user.Email,
            name: user.Name
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.changeAccess = async(req, res) => {
    let token_refresh = req.body.headers['x-refresh-token']
    try {
        const { uid } = jwt.verify(token_refresh, secret)
        const currentUser = await auth.findOne({ where: { uid: uid } })
        if(!currentUser) return res.status(404)
        const token = createAccess(currentUser.uid)
        token_refresh = createRefresh(currentUser.uid)
        await auth.update({ AccessToken: token, RefreshToken: token_refresh },
            { where: {uid: currentUser.uid }}
        )
        return res.status(200).send({
            message: "Успешное обновление токена",
            uid: currentUser.uid,
            accessToken: token,
            // refreshToken: token_refresh
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}