const Sequelize = require('sequelize');

const profile = require('../models/management/profile');

module.exports = (req, res, next) => {

    profile.findAll({where:{tenantid:req.body.tenantID,}}).then(result=>{
        req.body.profile = {
            tenantname:result[0].dataValues.tenantname,
            logo:result[0].dataValues.logo,
            favicon:result[0].dataValues.favicon,
            systemicon:result[0].dataValues.systemicon,
            tenantsname:result[0].dataValues.tenantsname,
            cprighttxt:result[0].dataValues.cprighttxt,
            cprighturl:result[0].dataValues.cprighturl,
            href:result[0].href
        };
        next();
    });
    
}