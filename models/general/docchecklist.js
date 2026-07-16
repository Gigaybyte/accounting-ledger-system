const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const docchecklist = sequelize.define('tbldocchecklist',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    grup: { type: Sequelize.STRING, allowNull: false },
    slno: { type: Sequelize.INTEGER, allowNull:false },
    name: { type: Sequelize.STRING, allowNull: false },
    example_url: { type: Sequelize.STRING, allowNull: true },
});

module.exports = docchecklist;