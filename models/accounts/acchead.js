
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const company = require('../company/company');
const login = require('../management/login');

const acchead = sequelize.define('tblacchead',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    parent_id: { type: Sequelize.UUID, allowNull: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    companyid: { type: Sequelize.UUID, allowNull: false },
    lvl: { type: Sequelize.INTEGER, allowNull: false},
    headname: { type: Sequelize.STRING, allowNull: false},
    headnumber: { type: Sequelize.STRING, allowNull: false},
    show_pnl: { type: Sequelize.BOOLEAN, allowNull:false},
    show_bs: { type: Sequelize.BOOLEAN, allowNull:false},
    headdesc: { type: Sequelize.STRING, allowNull:false},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

acchead.hasMany(acchead,{ foreignKey: 'parent_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
acchead.belongsTo(acchead,{as: "heads", foreignKey: 'parent_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

company.hasMany(acchead,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
acchead.belongsTo(company,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(acchead,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
acchead.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});


module.exports = acchead;