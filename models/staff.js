const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema({
    Nick: String,
    Skin: String,
    DiscordId: String,
    Rol: String
})

const modelStaff = mongoose.model('Staff',StaffSchema);

module.exports = modelStaff;