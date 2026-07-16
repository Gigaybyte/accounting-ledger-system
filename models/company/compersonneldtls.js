
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const login = require('../management/login');
const country = require('../general/country');

const compersonneldtls = sequelize.define('tblcompersonneldtls',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    icpassport: { type: Sequelize.STRING, allowNull: false },
    dob: { type: Sequelize.DATEONLY, allowNull: false },
    nationality: { type: Sequelize.UUID, allowNull: false },
    percontact: { type: Sequelize.STRING, allowNull: false },
    peremail: { type: Sequelize.STRING, allowNull: false },
    occupation: { type: Sequelize.STRING, allowNull: true },
    offcontact: { type: Sequelize.STRING, allowNull: true },
    offemail: { type: Sequelize.STRING, allowNull: true },
    resaddress: { type: Sequelize.TEXT, allowNull: false },
    resstate: { type: Sequelize.STRING, allowNull: false },
    respincode: { type: Sequelize.STRING, allowNull: false },
    rescountry: { type: Sequelize.UUID, allowNull: false },
    corraddress: { type: Sequelize.TEXT, allowNull: false },
    corrstate: { type: Sequelize.STRING, allowNull: false },
    corrpincode: { type: Sequelize.STRING, allowNull: false },
    corrcountry: { type: Sequelize.UUID, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false},
});

country.hasMany(compersonneldtls,{foreignKey: 'nationality', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compersonneldtls.belongsTo(country,{as: "ncountry", foreignKey: 'nationality', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(compersonneldtls,{foreignKey: 'rescountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compersonneldtls.belongsTo(country,{as: "rcountry", foreignKey: 'rescountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(compersonneldtls,{foreignKey: 'corrcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compersonneldtls.belongsTo(country,{as: "ccountry", foreignKey: 'corrcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(compersonneldtls,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
compersonneldtls.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = compersonneldtls;