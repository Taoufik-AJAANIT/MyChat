const express = require('express')
const router = express.Router()
const sessions = require('express-session')

router.get('/', (req , res) =>
{
    if(!req.session)
    {
        res.render('index',{title : 'Login',errors: "Please sign in First !"})
    }
    else
    {
        res.render('home')
    }
    
})

module.exports = router