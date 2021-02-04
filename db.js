const moongose = require("mongoose");

const conUrl = "mongodb+srv://pruebas:sadmen123@koit.cs6r1.mongodb.net/Koit?retryWrites=true&w=majority";

const conn = () => {
    try {
        moongose.connect(conUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.info("Connected to db")
        }).catch(()=>{
            console.error("Db connection failed")
        })
    }catch (e) {
        console.error("Connection error")
    }
}


module.exports = conn;