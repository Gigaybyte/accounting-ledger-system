
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const entry = require('./entry');
const login = require('../management/login');

const entrydoc = sequelize.define('tblentrydoc',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    entryid: { type: Sequelize.UUID, allowNull: false},
    recvouchdocurl: { type: Sequelize.TEXT, allowNull: false},
    supportdocurl: { type: Sequelize.TEXT, allowNull: false},
    createdby: { type: Sequelize.UUID, allowNull: false},
});

entry.hasMany(entrydoc,{foreignKey: 'entryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entrydoc.belongsTo(entry,{foreignKey: 'entryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

login.hasMany(entrydoc,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
entrydoc.belongsTo(login,{foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = entrydoc;