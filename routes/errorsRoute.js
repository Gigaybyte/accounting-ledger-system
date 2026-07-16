const express = require('express');

const path = require('path');

const route = express.Router();

route.get('/401',(req,res,next)=>{
    res.status(401).render('errors/401');
})

route.get('/404',(req,res,next)=>{
    res.status(404).render('errors/404');
})

module.exports = route
