const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const itemchecklist = sequelize.define('tblitemchecklist',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    grup: { type: Sequelize.STRING, allowNull: false },
    slno: { type: Sequelize.INTEGER, allowNull:false },
    name: { type: Sequelize.STRING, allowNull: false },
    desc: { type: Sequelize.STRING, allowNull: false },
});

module.exports = itemchecklist;