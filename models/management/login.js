
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const login = sequelize.define('tbllogin',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    firstname: { type: Sequelize.STRING, allowNull: false},
    lastname: { type: Sequelize.STRING, allowNull: false},
    profilepic: { type: Sequelize.STRING, allowNull: false},
    username: { type: Sequelize.STRING, validate:{ isEmail:true }, allowNull: false},
    password: { type: Sequelize.STRING, allowNull: false},
    isactive : { type: Sequelize.BOOLEAN, allowNull: false,defaultValue: true},
    email_validation: { type: Sequelize.BOOLEAN, allowNull: false},
    otp: { type: Sequelize.INTEGER},
    otpdatetimestamp: { type: Sequelize.DATE},
    createdby: { type: Sequelize.STRING}
});

module.exports = login;