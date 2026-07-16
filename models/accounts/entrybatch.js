
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const entry = require('./entry');
const login = require('../management/login');

const entrybatch = sequelize.define('tblentrybatch', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    batchid: { type: Sequelize.UUID, allowNull: false },
    entryid: { type: Sequelize.UUID, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false },
});

entry.hasMany(entrybatch, { foreignKey: 'entryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
entrybatch.belongsTo(entry, { foreignKey: 'entryid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

login.hasMany(entrybatch, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
entrybatch.belongsTo(login, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });


module.exports = entrybatch;