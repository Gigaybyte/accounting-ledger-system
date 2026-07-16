
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const entry = require('./entry');
const ledger = require('./ledger');
const login = require('../management/login');

const entryitem = sequelize.define('tblentryitem',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    entryid: { type: Sequelize.UUID, allowNull: false},
    entryslno: { type: Sequelize.TEXT, allowNull: false},
    ledgerid: { type: Sequelize.UUID, allowNull: false},
    amount: { type: Sequelize.DECIMAL(15,2), allowNull: false},
    desc: {type: Sequelize.TEXT, allowNull: false},
    transtype: {type: Sequelize.CHAR(2), allowNull: false},
    taxcodeid: {type: Sequelize.UUID, allowNull: false},
    recon_sts: {type: Sequelize.STRING, allowNull: false},
    recon_dt: {type: Sequelize.DATEONLY, allowNull: true},
    recon_amnt: {type: Sequelize.DECIMAL(15,2), allowNull: true},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

entry.hasMany(entryitem,{foreignKey: 'entryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryitem.belongsTo(entry,{foreignKey: 'entryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

ledger.hasMany(entryitem,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryitem.belongsTo(ledger,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(entryitem,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entryitem.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});


module.exports = entryitem;