const user = require('../models/access');

let auth = (req, res, next) => {
    let token = req.cookies.auth;
    user.findByToken(token, (err, usuario) => {
        if (err) throw err;
        if (!usuario) {
            return res.json({
                message: "Usuario no encontrado"
            })

            req.token = token;
            req.user = usuario;
            next();
        }
    })
}

module.exports = {auth}