const express = require('express');
const path = require('path');

const generalController = require('../controllers/generalController');

const chktoken = require('../middlewares/chktoken');

const chkrole = require('../middlewares/chkrole');

const profile = require('../middlewares/profile');

const menus = require('../middlewares/menus');

const expvalidator = require("../validators/expvalidator");

const route = express.Router();


route.get('/filedownload', chktoken, generalController.getfiledownload);


module.exports = route
