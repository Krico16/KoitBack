const express = require('express');
const router = express.Router();
const Ranks = require('../models/ranks');
const Transactions = require('../models/transaction');

/* GET home page. */
router.get('/', function (req, res, next) {
    Ranks.find().then(data => {
        res.status(200).json({result: data})
    }).catch(err => {
        res.status(400).json({msg: "Error"})
    })
});

router.get('/:rank', function (req, res, next) {
    Ranks.find({name: req.params.rank}).then(data => {
        res.status(200).json({result: data})
    }).catch(err => {
        res.status(400).json({msg: "Error"})
    })
})

/* POST home page. */
router.post('/', function (req, res, next) {
    const newRank = new Ranks(req.body)
    newRank.save(err => {
        if (err) {
            res.status(201).json({
                result: "Error creando rango"
            })
        } else {
            res.status(200).json({
                result: "rango creado"
            })
        }
    })
})

/* POST transactions */
router.post('/trans', (req, res, next) => {
    const Payment = new Transactions(req.body)
    Payment.save(err => {
        if (err) {
            res.status(201).json({
                result: "Error registrando pago"
            })
        } else {
            res.status(200).json({
                result: "Pago procesado"
            })
        }
    })
})

module.exports = router;
