const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const menu = require('./menu');
const role = require('./role');

const menuroleconfig = sequelize.define('tblmenuroleconfig',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    menu_id: {type: Sequelize.UUID, allowNull: false},
    role_id: {type: Sequelize.UUID,allowNull: false}
});

menu.hasMany(menuroleconfig,{foreignKey: 'menu_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
menuroleconfig.belongsTo(menu,{foreignKey: 'menu_id'});

role.hasMany(menuroleconfig,{foreignKey: 'role_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
menuroleconfig.belongsTo(role,{foreignKey: 'role_id'});

module.exports = menuroleconfig;