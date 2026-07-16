const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const country = sequelize.define('tblcountry',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false},
    ext: { type: Sequelize.STRING, allowNull: false},
    alpha2: { type: Sequelize.CHAR(2), allowNull: false},
    alpha3: { type: Sequelize.CHAR(3), allowNull: false}
});

module.exports = country;