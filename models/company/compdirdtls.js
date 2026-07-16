
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const login = require('../management/login');
const company = require('./company');
const compersonneldtls = require('../company/compersonneldtls');

const tblcompdirdtls = sequelize.define('tblcompdirdtls',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    companyid: { type: Sequelize.UUID, allowNull: false },
    personnelid: { type: Sequelize.UUID, allowNull: false },
    appointdt: { type: Sequelize.DATEONLY, allowNull: false },
    exitdt: { type: Sequelize.DATEONLY, allowNull: true },
    sts: { type: Sequelize.BOOLEAN, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false},
});

company.hasMany(tblcompdirdtls,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
tblcompdirdtls.belongsTo(company,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

compersonneldtls.hasMany(tblcompdirdtls,{foreignKey: 'personnelid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
tblcompdirdtls.belongsTo(compersonneldtls,{foreignKey: 'personnelid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(tblcompdirdtls,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
tblcompdirdtls.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = tblcompdirdtls;