
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const company = require('../company/company');
const acchead = require('./acchead');
const taxcode = require('../company/taxcode');
const finyear = require('../accounts/finyear');

const login = require('../management/login');

const ledger = sequelize.define('tblledger',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    companyid: { type: Sequelize.UUID, allowNull: false },
    headid: { type: Sequelize.UUID, allowNull: false },
    ledgername: { type: Sequelize.STRING, allowNull: false},
    op_finyear: { type: Sequelize.UUID, allowNull: false},
    opbal: { type: Sequelize.DECIMAL(15,2), allowNull: false},
    opbal_dt: { type: Sequelize.DATEONLY, allowNull: false},
    opbal_type: { type: Sequelize.CHAR(2), allowNull: false},  // Balance type Def: CREDIT = cr; DEBIT = dr;
    ledgertype: { type: Sequelize.INTEGER, allowNull: false},  //Type Def: CASH=1; BANK=2; NOT APPLICABLE = 0;
    reconciliation: {type: Sequelize.BOOLEAN, allowNull: false},
    tax_code : {type: Sequelize.UUID, allowNull: false},
    ledgerdesc: { type: Sequelize.STRING, allowNull: true},
    archieved: { type: Sequelize.BOOLEAN, allowNull:false},
    sts: {type: Sequelize.STRING, allowNull: false},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

company.hasMany(ledger,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
ledger.belongsTo(company,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

acchead.hasMany(ledger,{foreignKey: 'headid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
ledger.belongsTo(acchead,{foreignKey: 'headid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

finyear.hasMany(ledger,{foreignKey: 'op_finyear', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
ledger.belongsTo(finyear,{foreignKey: 'op_finyear', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

taxcode.hasMany(ledger,{foreignKey: 'tax_code', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
ledger.belongsTo(taxcode,{foreignKey: 'tax_code', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(ledger,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
ledger.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = ledger;