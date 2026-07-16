
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const currency = sequelize.define('tblcurrency',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    currency: { type: Sequelize.STRING, allowNull: false}
});

module.exports = currency;