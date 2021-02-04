const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    nick: String,
    transData: {
        type: mongoose.Mixed
    }
})

const transModel = mongoose.model('transaction',transactionSchema);
module.exports = transModel