
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const login = require('../management/login');
const company = require('./company');
const country = require('../general/country');

const compbusinessdtls = sequelize.define('tblcompbusinessdtls',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    companyid: { type: Sequelize.UUID, allowNull: false },
    businessnature: { type: Sequelize.STRING, allowNull: false },
    totalshares: { type: Sequelize.STRING, allowNull: false },
    authorizecapital: { type: Sequelize.STRING, allowNull: false },
    regemail: { type: Sequelize.STRING, allowNull: false },
    regcontact: { type: Sequelize.STRING, allowNull: false },
    regaddress: { type: Sequelize.TEXT, allowNull: false },
    regstate: { type: Sequelize.STRING, allowNull: false },
    regpincode: { type: Sequelize.STRING, allowNull: false },
    regcountry: { type: Sequelize.UUID, allowNull: false },
    bizaddress: { type: Sequelize.TEXT, allowNull: false },
    bizstate: { type: Sequelize.STRING, allowNull: false },
    bizpincode: { type: Sequelize.STRING, allowNull: false },
    bizcountry: { type: Sequelize.UUID, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false},
});

company.hasMany(compbusinessdtls,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compbusinessdtls.belongsTo(company,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(compbusinessdtls,{foreignKey: 'regcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compbusinessdtls.belongsTo(country,{foreignKey: 'regcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(compbusinessdtls,{foreignKey: 'bizcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compbusinessdtls.belongsTo(country,{foreignKey: 'bizcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(compbusinessdtls,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compbusinessdtls.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = compbusinessdtls;