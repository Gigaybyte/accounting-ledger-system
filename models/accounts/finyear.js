
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const company = require('../company/company');

const finyear = sequelize.define('tblfinyear',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    companyid: { type: Sequelize.UUID, allowNull: false },
    finyearname: { type: Sequelize.STRING, allowNull: false},
    yrstdt: { type: Sequelize.DATEONLY, allowNull: false},
    yrendt: { type: Sequelize.DATEONLY, allowNull:false},
});

company.hasMany(finyear,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
finyear.belongsTo(company,{foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = finyear;