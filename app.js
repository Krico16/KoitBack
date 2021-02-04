let express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require("./db")
const cors = require('cors')

const app = express();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ranksRouter = require('./routes/rangos');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
database();

app.use('/auth', indexRouter);
app.use('/staff', usersRouter);
app.use('/ranks', ranksRouter);
//app.use('/system',infoRouter);

module.exports = app;