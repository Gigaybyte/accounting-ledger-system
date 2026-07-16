
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const companytype = sequelize.define('tblcompanytype',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    typename: { type: Sequelize.STRING, allowNull: false },
    color: { type: Sequelize.STRING, allowNull: false },
});

module.exports = companytype;