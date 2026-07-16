const Sequelize = require('sequelize');
const sequelize = require('../../utils/dbconnector');
const country = require('../general/country');
const docchecklist = require('../general/docchecklist');
const stagelist = require('../general/stagelist');

const agent = sequelize.define('tblagent',{
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true},
    agentid: { type: Sequelize.STRING, allowNull: false},
    stageid: {type: Sequelize.UUID, allowNull: false},
    reqyear: {type: Sequelize.INTEGER, allowNull: false},
    reqtype: {type: Sequelize.STRING, allowNull: false},
    compname: {type: Sequelize.STRING, allowNull: false},
    compregnum: {type: Sequelize.STRING, allowNull: false},
    compwebsite: {type: Sequelize.STRING, allowNull: true},
    sp1: {type: Sequelize.STRING, allowNull: false},
    sp1id: {type: Sequelize.STRING, allowNull: false},
    sp2: {type: Sequelize.STRING, allowNull: true},
    sp2id: {type: Sequelize.STRING, allowNull: true},
    officeemail: {type: Sequelize.STRING, allowNull: false},
    officenumber: {type: Sequelize.STRING, allowNull: false},
    officealtnumber: {type: Sequelize.STRING, allowNull: true},
    officecountry: {type: Sequelize.UUID, allowNull: false},
    multioffice: {type: Sequelize.BOOLEAN, allowNull: false},
    secofficecountry: {type: Sequelize.UUID, allowNull: true},
    secofficeemail: {type: Sequelize.STRING, allowNull: true},
    secofficephone: {type: Sequelize.STRING, allowNull: true},
    hearluc: {type: Sequelize.STRING(1000), allowNull: false},
    introducername: {type: Sequelize.STRING, allowNull: true},
    introduceremail: {type: Sequelize.STRING, allowNull: true},
    owntype:  {type: Sequelize.STRING, allowNull: false},
    ownername: {type: Sequelize.STRING, allowNull: false},
    ownerphone: {type: Sequelize.STRING, allowNull: false},
    owneremail: {type: Sequelize.STRING, allowNull: false},
    ownercntyres: {type: Sequelize.UUID, allowNull: false},
    aprtname: {type: Sequelize.STRING, allowNull: false},
    blockno: {type: Sequelize.STRING, allowNull: false},
    floorno: {type: Sequelize.STRING, allowNull: false},
    city: {type: Sequelize.STRING, allowNull: false},
    postalcode: {type: Sequelize.INTEGER, allowNull: false},
    province: {type: Sequelize.STRING, allowNull: false},
    rescountry: {type: Sequelize.UUID, allowNull: false},
    iddoc: {type: Sequelize.UUID, allowNull: false},
    iddocupld: {type: Sequelize.STRING, allowNull: false},
    addluniv: {type: Sequelize.BOOLEAN, allowNull: false},
    insname1: {type: Sequelize.STRING, allowNull: true},
    pic1: {type: Sequelize.STRING, allowNull: true},
    picemail1: {type: Sequelize.STRING, allowNull: true},
    insname2: {type: Sequelize.STRING, allowNull: true},
    pic2: {type: Sequelize.STRING, allowNull: true},
    picemail2: {type: Sequelize.STRING, allowNull: true},
    insname3: {type: Sequelize.STRING, allowNull: true},
    pic3: {type: Sequelize.STRING, allowNull: true},
    picemail3: {type: Sequelize.STRING, allowNull: true},
    compregcertupld: {type: Sequelize.STRING, allowNull: false},
    compprofileupld: {type: Sequelize.STRING, allowNull: false},
    computilbill: {type: Sequelize.UUID, allowNull: false},
    computilbillupld: {type: Sequelize.STRING, allowNull: false},
    bankbenname: {type: Sequelize.STRING, allowNull: false},
    bankacnum: {type: Sequelize.STRING, allowNull: false},
    bankname: {type: Sequelize.STRING, allowNull: false},
    bankcountry: {type: Sequelize.UUID, allowNull: false},
    swiftcode: {type: Sequelize.STRING, allowNull: true},
    bankaddress: {type: Sequelize.STRING(1000), allowNull: false},
    sts: {type: Sequelize.STRING, allowNull: false},
    comments: {type: Sequelize.STRING, allowNull: true},
    createdby: { type: Sequelize.STRING, allowNull: false},
});

stagelist.hasMany(agent,{ foreignKey: 'stageid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(stagelist,{foreignKey: 'stageid', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(agent,{ foreignKey: 'officecountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(country,{as: "officecnty", foreignKey: 'officecountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(agent,{ foreignKey: 'secofficecountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(country,{as: "secofficecnty", foreignKey: 'secofficecountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(agent,{ foreignKey: 'ownercntyres', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(country,{as: "owncntyres", foreignKey: 'ownercntyres', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(agent,{ foreignKey: 'rescountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(country,{as: "rescnty", foreignKey: 'rescountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

country.hasMany(agent,{ foreignKey: 'bankcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(country,{as: "bankcnty", foreignKey: 'bankcountry', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

docchecklist.hasMany(agent,{ foreignKey: 'iddoc', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(docchecklist,{as: "iddocs", foreignKey: 'iddoc', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

docchecklist.hasMany(agent,{ foreignKey: 'computilbill', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
agent.belongsTo(docchecklist,{as: "comutilbill", foreignKey: 'computilbill', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

module.exports = agent;
