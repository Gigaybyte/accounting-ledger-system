
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const login = require('../management/login');

const taxcode = sequelize.define('tbltaxcode',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    companyid: { type: Sequelize.UUID, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    rate: { type: Sequelize.DECIMAL(5,2), allowNull: false},
    collection_ledger: { type: Sequelize.UUID, allowNull: true },
    paid_ledger: { type: Sequelize.UUID, allowNull: true },
    createdby: { type: Sequelize.UUID, allowNull: false},
});

login.hasMany(taxcode,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
taxcode.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = taxcode;