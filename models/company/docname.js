
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const doctype = require('./doctype');
const login = require('../management/login');

const docname = sequelize.define('tbldocname', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    typeid: { type: Sequelize.UUID, allowNull: false },
    docname: { type: Sequelize.STRING, allowNull: false },
    docdesc: { type: Sequelize.TEXT, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false },
});

doctype.hasMany(docname, { foreignKey: 'typeid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
docname.belongsTo(doctype, { foreignKey: 'typeid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

login.hasMany(docname, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
docname.belongsTo(login, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

module.exports = docname;