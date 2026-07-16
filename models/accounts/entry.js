
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const entrytype = require('./entrytype');
const company = require('../company/company');
const login = require('../management/login');

const entry = sequelize.define('tblentry',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    entrytypeid: { type: Sequelize.UUID, allowNull: false},
    entrynum: { type: Sequelize.BIGINT, allowNull: false},
    date: { type: Sequelize.STRING, allowNull: false},
    dr_total: { type: Sequelize.STRING, allowNull: false},
    cr_total: { type: Sequelize.STRING, allowNull: false},
    narration: { type: Sequelize.STRING, allowNull: false},
    doc_path: { type: Sequelize.STRING, allowNull: true},
    sts: {type: Sequelize.STRING, allowNull: true},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

entrytype.hasMany(entry,{foreignKey: 'entrytypeid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entry.belongsTo(entrytype,{foreignKey: 'entrytypeid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(entry,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entry.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});






module.exports = entry;