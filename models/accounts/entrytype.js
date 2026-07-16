
const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');

const entrytype = sequelize.define('tblentrytype',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    label: { type: Sequelize.STRING, allowNull: false},
    name: { type: Sequelize.STRING, allowNull: false},
    desc: { type: Sequelize.STRING, allowNull: false},
    createdby: { type: Sequelize.STRING},
});

module.exports = entrytype;