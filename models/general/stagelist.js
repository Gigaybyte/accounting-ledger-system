const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const stagelist = sequelize.define('tblstagelist',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    grup: { type: Sequelize.STRING, allowNull: false },
    slno: { type: Sequelize.INTEGER, allowNull:false },
    name: { type: Sequelize.STRING, allowNull: false },
    action: { type: Sequelize.STRING, allowNull: false },
});

module.exports = stagelist;