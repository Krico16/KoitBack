const express = require('express');
const router = express.Router();
const paralel = require('async')
const Player = require("../models/staff");

/* GET staff listing. */
router.get('/1', function (req, res, next) {
    Player.find({ Rol: 'FOUNDER' }).then(data => {
        res.status(200).json({
            result: data
        })
    }).catch(err => {
        console.error("Error tomando datos")
    })
});

router.get('/2', function (req, res, next) {
    Player.find({ Rol: 'ADMIN' }).then(data => {
        res.status(200).json({
            result: data
        })
    }).catch(err => {
        console.error("Error tomando datos")
    })
});

router.get('/3', function (req, res, next) {
    Player.find({ Rol: 'MOD' }).then(data => {
        res.status(200).json({
            result: data
        })
    }).catch(err => {
        console.error("Error tomando datos")
    })
});

router.get('/4', function (req, res, next) {
    Player.find({ Rol: 'BUILDER' }).then(data => {
        res.status(200).json({
            result: data
        })
    }).catch(err => {
        console.error("Error tomando datos")
    })
});

router.get('/5', function (req, res, next) {
    Player.find({ Rol: 'HELPER' }).then(data => {
        res.status(200).json({
            result: data
        })
    }).catch(err => {
        console.error("Error tomando datos")
    })
});

router.get('/a', function (req, res, next) {
    const ListaFounders = Player.find({ Rol: 'FOUNDER' });
    const ListaAdmins = Player.find({ Rol: 'ADMIN' });

    const data = {
        founders: ListaFounders.exec.bind(ListaFounders),
        admins: ListaAdmins.exec.bind(ListaAdmins)
    }
    paralel.parallel(data, (err, succ) => {
        if (err) {
            console.error("Error leyendo datos")
        } else {
            res.status(200).json({
                result: succ
            })
        }
    })

})

/* CREATE staff listing. */
router.post('/', function (req, res, next) {
    const nick = req.body.nick;
    const skin = req.body.skin;
    const dId = req.body.did;
    const rol = req.body.rol;

    const usuario = {
        Nick: nick,
        Skin: skin,
        DiscordId: dId,
        Rol: rol
    }

    const newPlayer = Player(usuario);
    newPlayer.save(err => {
        if (err) {
            res.status(201).json({
                result: "Error creando jugador"
            })
        } else {
            res.status(200).json({
                result: "Jugador creado"
            })
        }
    })

})

module.exports = router;