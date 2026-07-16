
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const entryitem = require('./entryitem');
const ledger = require('./ledger');
const login = require('../management/login');

const entryitemdoc = sequelize.define('tblentryitemdoc',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    entryitemid: { type: Sequelize.UUID, allowNull: false},
    ledgerid: { type: Sequelize.UUID, allowNull: false},
    recvouchdocurl: { type: Sequelize.TEXT, allowNull: false},
    supportdocurl: { type: Sequelize.TEXT, allowNull: false},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

entryitem.hasMany(entryitemdoc,{foreignKey: 'entryitemid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryitemdoc.belongsTo(entryitem,{foreignKey: 'entryitemid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

ledger.hasMany(entryitemdoc,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryitemdoc.belongsTo(ledger,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(entryitemdoc,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryitemdoc.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = entryitemdoc;