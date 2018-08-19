const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const sessions = require('express-session')
const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users.js')
const path = require('path')
const expressValidator = require('express-validator')
const socket = require('socket.io')

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

// connection to db : --local--
mongoose.connect('mongodb://localhost:27017/Mychat');

// connection to db : --server --
// const db = mongojs('mongodb://taoufik:ensa@1997@ds121382.mlab.com:21382/taoufik',['users'])

// Port setUp
var server = app.listen(4000, () =>{
    console.log('lestenning on port  4000   ')
})

// sockets begins here ^^
const io = socket(server)

const socketsInfo = []
const usersOnline = []

io.on('connection', socket => {
 
    socket.on('logged', data => {
               
        let indice = usersOnline.findIndex(e => e.email == data.email) 
        if (indice == -1) {

            socketsInfo.push({socketid : socket.id,email : data.email})
            usersOnline.push({firstname : data.firstname,lastname : data.lastname, email:data.email})
            io.sockets.emit('online',{arr : usersOnline})

        }
        else {
            io.sockets.connected[socketsInfo[indice].socketid].emit('logout',data)
            socketsInfo[indice].socketid = socket.id  
        }
    })

    socket.on('msg', data => {
        for (let i = 0 ; i < socketsInfo.length ; i++){

           
            if (socketsInfo[i].email.localeCompare(data.emailTo ) == 0)
            {
                io.sockets.connected[socketsInfo[i].socketid].emit('msg',data)
               
            }
            
        }
    })

    socket.on('typing', data => {
        for (let i = 0 ; i < socketsInfo.length ; i++){
            if (socketsInfo[i].email.localeCompare(data.emailTo ) == 0)
            {
                io.sockets.connected[socketsInfo[i].socketid].emit('typing',data)
               
            }
            
        }

    })

    socket.on('stopTyping', data => {
        for (let i = 0 ; i < socketsInfo.length ; i++){
            if (socketsInfo[i].email.localeCompare(data.emailTo ) == 0)
            {
                io.sockets.connected[socketsInfo[i].socketid].emit('stopTyping',data)
            }
        }
    })

    socket.on('publier', data => {
        // console.log(data.text+data.name)
        io.sockets.emit('publier',data)
    })


    socket.on('disconnect', () =>{
        for (let i = 0 ; i < socketsInfo.length ; i++){
            if (socketsInfo[i].socketid == socket.id){
                socketsInfo.splice(i,1)
                usersOnline.splice(i,1)
                socket.broadcast.emit('online',{arr : usersOnline})
               
            }
            
        }
    
    })   
    
})

