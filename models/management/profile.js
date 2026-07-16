const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const profile = sequelize.define('tblprofile',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: {type: Sequelize.UUID, allowNull: true},
    tenantname: { type: Sequelize.STRING, allowNull: false},
    logo: { type: Sequelize.STRING, allowNull: false},
    favicon: { type: Sequelize.STRING, allowNull: false},
    systemicon: { type: Sequelize.STRING, allowNull: false},
    tenantsname: { type: Sequelize.STRING, allowNull: false},
    cprighttxt: { type: Sequelize.STRING, allowNull: false},
    cprighturl: { type: Sequelize.STRING, allowNull: false},
    href: { type: Sequelize.STRING, allowNull: false}
});

module.exports = profile;