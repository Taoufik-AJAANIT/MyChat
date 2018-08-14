const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const sessions = require('express-session')
const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users.js')
const path = require('path')
const expressValidator = require('express-validator')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// serv static files
app.use(express.static(path.join(__dirname, 'public')));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express validator
app.use(expressValidator())

// express session
app.use(sessions({secret:'max',saveUninitialized : false ,resave :false}))

// setUp routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// connection to db :
mongoose.connect('mongodb://localhost:27017/Mychat');

// Port setUp
app.listen(8888, () =>{
    console.log('lestenning on port 3000 ...')
})


