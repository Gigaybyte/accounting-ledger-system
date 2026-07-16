
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const entrytype = require('./entrytype');
const ledger = require('./ledger');
const login = require('../management/login');

const entryledgeropbal = sequelize.define('tblentryledgeropbal',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    ledgerid: { type: Sequelize.UUID, allowNull: false},
    opdate: { type: Sequelize.DATEONLY, allowNull: false},
    opbal: { type: Sequelize.DECIMAL(15,2), allowNull: false},
    isfirst: { type: Sequelize.BOOLEAN, allowNull: false},
    opbaltype: { type: Sequelize.STRING, allowNull: false},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

ledger.hasMany(entryledgeropbal,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryledgeropbal.belongsTo(ledger,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(entryledgeropbal,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryledgeropbal.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = entryledgeropbal;