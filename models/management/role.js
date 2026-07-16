
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const role = sequelize.define('tblrole',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    rolename: { type: Sequelize.STRING, allowNull: false},
    createdby: { type: Sequelize.STRING}
});

module.exports = role;