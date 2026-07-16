
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const route = sequelize.define('tblroute',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    route: { type: Sequelize.STRING, allowNull: false},
    method: { type: Sequelize.STRING, allowNull: false},
    createdby: { type: Sequelize.STRING}
});

module.exports = route;