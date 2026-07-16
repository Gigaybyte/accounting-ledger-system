
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const login = require('../management/login');
const company = require('./company');
const compersonneldtls = require('../company/compersonneldtls');

const tblcompshareholderdtls = sequelize.define('tblcompshareholderdtls', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    tenantid: { type: Sequelize.UUID, allowNull: false },
    companyid: { type: Sequelize.UUID, allowNull: false },
    personnelid: { type: Sequelize.UUID, allowNull: false },
    totalshare: { type: Sequelize.BIGINT, allowNull: false },
    preferencecash: { type: Sequelize.BIGINT, allowNull: false },
    preferenceotherwise: { type: Sequelize.BIGINT, allowNull: false },
    ordinarycash: { type: Sequelize.BIGINT, allowNull: false },
    ordinaryotherwise: { type: Sequelize.BIGINT, allowNull: false },
    otherkindscash: { type: Sequelize.BIGINT, allowNull: false },
    otherkindsotherwise: { type: Sequelize.BIGINT, allowNull: false },
    createdby: { type: Sequelize.UUID, allowNull: false },
});

company.hasMany(tblcompshareholderdtls, { foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
tblcompshareholderdtls.belongsTo(company, { foreignKey: 'companyid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

compersonneldtls.hasMany(tblcompshareholderdtls, { foreignKey: 'personnelid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
tblcompshareholderdtls.belongsTo(compersonneldtls, { foreignKey: 'personnelid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

login.hasMany(tblcompshareholderdtls, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
tblcompshareholderdtls.belongsTo(login, { foreignKey: 'createdby', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });

module.exports = tblcompshareholderdtls;