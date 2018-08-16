const express = require('express')
const router = express.Router()
const user = require("../models/user.js")

router.get('/', (req, res) => {
    if (!req.session.email) {
        res.render('index', {
            title: 'Login',
            errors: false,
            success: false
        })
    } else res.redirect('/users')


})

router.post('/', (req, res) => {
    req.check('email', 'Email Empty or non valide !!').isEmail()
    req.check('password', 'password is required ! !').notEmpty()

    var errors = req.validationErrors()
    if (errors)
        res.render('index', {
            title: 'Login',
            errors: errors,
            success: false
        })
    else {
        errors = [{
            msg: 'account does not exist  !'
        }]
        user.user.findOne({
            email: req.body.email,
            password: req.body.password
        }, function (err, obj) {
            if (obj) {
                data = obj
                req.session.email = req.body.email
                res.redirect('/users')


            } else res.render('index', {
                title: 'Login',
                errors: errors,
                success: false
            })

        });
    }

})

router.get('/regester', (req, res) => {

    if (!req.session.email) {
        res.render('index', {
            title: 'regester',
            errors: false,
            success: false
        })
    } else res.redirect('/users')
})

router.post('/regester', (req, res) => {
    req.check('firstname', 'first name is required !').notEmpty()
    req.check('lastname', 'last name is required !').notEmpty()
    req.check('email', 'Email Empty or non valide !!').isEmail()
    req.check('password', 'password is required ! !').notEmpty()
    req.check('password', 'passwords does not match !').equals(req.body.password2)

    var errors = req.validationErrors()
    if (errors)
        res.render('index', {
            title: 'regester',
            errors: errors,
            success: false
        })
    else {
        // var newUser {req.body.firstname}
        var firstname = req.body.firstname
        var lastname = req.body.lastname
        var email = req.body.email
        var password = req.body.password
        var newUser = new user.user({
            firstname,
            lastname,
            email,
            password
        })
        var errors = [{
            msg: "Email Alredy Used!!!"
        }]
        newUser.save((err) => {


            if (err) res.render('index', {
                title: 'regester',
                errors: errors,
                success: false
            })
            else res.render('index', {
                title: 'Login',
                errors: false,
                success: 'account created with success pls login to start'
            })
        })
    }
})



module.exports = router