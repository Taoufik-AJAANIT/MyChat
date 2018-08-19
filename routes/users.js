const express = require('express')
const router = express.Router()
const user = require("../models/user.js")

router.get('/', (req , res) =>
{
    if(!req.session.email)
    {
        var errors = [{msg :"Please sign in First !" }]
        res.render('index',{title : 'Login',errors:errors,success:false })
        
    }
    else
    { 
        user.user.findOne({email : req.session.email},(errors,results) =>{
            
            
            res.render('index',{title : 'home',errors:false,success:false,data:results})
            
        })
        
        
    }
    
})

router.get('/logout', (req,res) =>{
    req.session.email = false ,
    res.redirect('/')
})

module.exports = router