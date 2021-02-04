const mongoose = require("mongoose");

const rankSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    sh_desc: String,
    lg_desc: String,
    m_price: {
        type: Number,
        required: true
    },
    p_price: {
        type: Number,
        required: true
    },
    image: String,
    has_discount: {
        type: Boolean,
        default: false
    },
    disc_per: {
        type: Number,
        default: 0
    }
})

const modelRank = mongoose.model('Rank', rankSchema);

module.exports = modelRank;