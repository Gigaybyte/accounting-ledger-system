
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const companytype = require('./companytype');
const currency = require('../general/currency');
const login = require('../management/login');

const company = sequelize.define('tblcompany',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    typeid: { type: Sequelize.UUID, allowNull: false },
    legalname: { type: Sequelize.STRING, allowNull: false},
    tradingname: { type: Sequelize.STRING, allowNull: false},
    registrationnum: { type: Sequelize.STRING, allowNull: true},
    financialyearstart: { type: Sequelize.STRING, allowNull: true},
    financialyearend: { type: Sequelize.STRING, allowNull: true},
    maincurrency: { type: Sequelize.UUID, allowNull: false},
    multiplecurrency: { type: Sequelize.BOOLEAN, allowNull: true},
    sts: {type: Sequelize.STRING, allowNull: true},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

companytype.hasMany(company,{foreignKey: 'typeid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
company.belongsTo(companytype,{foreignKey: 'typeid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

currency.hasMany(company,{foreignKey: 'maincurrency', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
company.belongsTo(currency,{foreignKey: 'maincurrency', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(company,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
company.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = company;