const express = require('express');
const router = express.Router();
const user = require('../models/access')
const {auth} = require('../middle/auth')

/* GET home page. */
router.post('/', function (req, res, next) {
    let token = req.cookies.auth;
    user.findByToken(token, (err, usuario) => {
        if (err) return res(err);
        if (usuario) {
            res.status(400).json({
                error: true,
                message: "Tu sesión sigue abierta"
            });
        } else {
            user.findOne({'nick': req.body.nick}, function (err, usuario) {
                if (!usuario) {
                    res.status(401).json({
                        isAuth: false,
                        message: "Error de autenticación"
                    })
                }
                usuario.comparePassword(req.body.psw, (err, match) => {
                    if(err){
                        return res.status(402).json({
                            message: "Error"
                        })
                    }
                    if (!match) {
                        res.status(403).json({
                            isAuth: false,
                            message: "Contraseña incorrecta"
                        })
                    }
                    usuario.generateToken((err, usuario) => {
                        if (err) return json.status(404).send(err)
                        res.cookie('auth', usuario.token).json({
                            isAuth: true,
                            id: usuario._id,
                            nick: usuario.nick
                        })
                    })
                })
            })
        }
    })
});

router.post('/register', (req, res, next) => {
    const newUser = new user(req.body)

    newUser.save((err, doc) => {
        if (err) {
            res.status(400).json({
                success: false
            });
            console.error(err)
        } else {
            res.status(200).json({
                success: true,
                user: doc
            })
        }
    })
})
module.exports = router;
