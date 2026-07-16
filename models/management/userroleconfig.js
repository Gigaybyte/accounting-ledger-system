const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const login = require('./login');
const role = require('./role');

const userroleconfig = sequelize.define('tbluserroleconfig',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    user_id: {type: Sequelize.UUID, allowNull: false},
    role_id: {type: Sequelize.UUID,allowNull: false}
});

login.hasMany(userroleconfig,{foreignKey: 'user_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
userroleconfig.belongsTo(login,{foreignKey: 'user_id'});

role.hasMany(userroleconfig,{foreignKey: 'role_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
userroleconfig.belongsTo(role,{foreignKey: 'role_id'});

module.exports = userroleconfig;