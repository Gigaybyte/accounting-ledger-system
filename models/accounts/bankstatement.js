
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const ledger = require('./ledger');
const entry = require('./entry');
const login = require('../management/login');

const bankstatement = sequelize.define('tblbankstatement',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    ledgerid: { type: Sequelize.UUID, allowNull: false },
    entrynumber: {type: Sequelize.BIGINT, allowNull: false},
    transdate: { type: Sequelize.DATEONLY, allowNull: false },
    transdesc: { type: Sequelize.TEXT, allowNull: false },
    amount: { type: Sequelize.DECIMAL(15,2), allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false },
    balance: { type: Sequelize.DECIMAL(15,2), allowNull: false },
    realized: {type: Sequelize.BOOLEAN, allowNull: false },
    realizedentryid: { type: Sequelize.UUID, allowNull: true },
    createdby: { type: Sequelize.UUID, allowNull: false},
});

ledger.hasMany(bankstatement,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
bankstatement.belongsTo(ledger,{foreignKey: 'ledgerid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

entry.hasMany(bankstatement,{foreignKey: 'realizedentryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
bankstatement.belongsTo(entry,{foreignKey: 'realizedentryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(bankstatement,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
bankstatement.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});


module.exports = bankstatement;