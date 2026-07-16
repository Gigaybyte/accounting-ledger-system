
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const login = require('../management/login');

const doctype = sequelize.define('tbldoctype', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    typename: { type: Sequelize.STRING, allowNull: false },
    typedesc: { type: Sequelize.TEXT, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false },
});

login.hasMany(doctype, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
doctype.belongsTo(login, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

module.exports = doctype;