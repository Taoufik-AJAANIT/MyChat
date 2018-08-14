const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = require("../models/user.js")
var check = {}

router.get('/', (req , res) =>
{
    
    res.render('index', {title : 'Login',errors :false,success :false})
})

router.post('/', (req , res) =>
{
      user.user.findOne({email:req.body.email,password : req.body.password},(err,result) =>{
          check.email = result.email
      })

     if (check)
     {
         req.session.id = req.body.email
         
     }
     console.log(check)
})

router.get('/regester', (req , res) =>
{
    res.render('index', {title : 'regester',errors :false,success:false})
}) 

router.post('/regester', (req , res) =>
{
    req.check('firstname','first name is required !').notEmpty()
    req.check('lastname','last name is required !').notEmpty()
    req.check('email','email is required !').notEmpty()
    req.check('email','please enter an email valide ! !').isEmail()
    req.check('password','password is required ! !').notEmpty()
    req.check('password','passwords does not match !').equals(req.body.password2)

    var errors = req.validationErrors()
    if(errors)
    res.render('index', {title : 'regester',errors :errors,success:false})
    else {
        // var newUser {req.body.firstname}
        var firstname = req.body.firstname
        var lastname = req.body.lastname
        var email = req.body.email
        var password = req.body.password
        var newUser = new user.user({firstname,lastname,email,password})
        newUser.save((err) =>{
            if (err)  res.render('index', {title : 'regester',errors :err})
            else res.render('index', {title : 'Login',errors :false,success :'account created with success pls login to start'})
        })
    }
})



module.exports = router