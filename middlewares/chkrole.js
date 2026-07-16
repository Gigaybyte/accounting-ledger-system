const Sequelize = require('sequelize');

const route = require('../models/management/route');
const routeroleconfig = require('../models/management/routeroleconfig');

module.exports = (req, res, next) => {
    try {
        console.log("Checking role for user:", {
            userID: req.body.userID,
            username: req.body.username,
            role: req.body.role,
            route: req.originalUrl.split("?").shift(),
            method: req.method,
        });
    } catch (error) {
        console.error("Error logging user info in chkrole middleware:", error);
    }
    routeroleconfig.findAll({
        where:{role_id:req.body.role},
        include: [{model:route, where:{route:req.originalUrl.split("?").shift(),method:req.method}, require: true}]
    }).then(result=>{
        var x = result;
        if(result.length>0){
            next();
        }else{
            res.status(200).render('accounts/login', {pageTitle : 'LUC Online System || Login Page',msg:'403! Unauthorized Access.',sts:'ERROR',data:req.body});
        }
    });
    
}