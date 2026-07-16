
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const company = require('../company/company');
const docname = require('./docname');
const login = require('../management/login');

const compdoc = sequelize.define('tblcompdoc', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    compid: { type: Sequelize.UUID, allowNull: false },
    docnameid: { type: Sequelize.UUID, allowNull: false },
    version: { type: Sequelize.INTEGER, allowNull: false },
    docurl: { type: Sequelize.TEXT, allowNull: false },
    docdesc: { type: Sequelize.TEXT, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false },
});

company.hasMany(compdoc, { foreignKey: 'compid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
compdoc.belongsTo(company, { foreignKey: 'compid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

docname.hasMany(compdoc, { foreignKey: 'docnameid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
compdoc.belongsTo(docname, { foreignKey: 'docnameid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

login.hasMany(compdoc, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
compdoc.belongsTo(login, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

module.exports = compdoc;