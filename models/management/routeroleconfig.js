const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const route = require('./route');
const role = require('./role');

const routeroleconfig = sequelize.define('tblrouteroleconfig',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    route_id: {type: Sequelize.UUID, allowNull: false},
    role_id: {type: Sequelize.UUID,allowNull: false}
});

route.hasMany(routeroleconfig,{foreignKey: 'route_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
routeroleconfig.belongsTo(route,{foreignKey: 'route_id'});

role.hasMany(routeroleconfig,{foreignKey: 'role_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
routeroleconfig.belongsTo(role,{foreignKey: 'role_id'});

module.exports = routeroleconfig;