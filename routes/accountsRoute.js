const express = require("express");
const path = require("path");

const accountsController = require("../controllers/accountsController");

const chktoken = require("../middlewares/chktoken");

const chkrole = require("../middlewares/chkrole");

const menus = require("../middlewares/menus");

const profile = require("../middlewares/profile");

// const isAuthorize = require('../middlewares/is-authorize');

// const sessionlocale = require('../middlewares/sessionlocals');

const expvalidator = require("../validators/expvalidator");

const route = express.Router();

// route.get('/register', accountsController.getregister);

// route.post('/register', expvalidator.registervalidator, accountsController.postregister);

route.get("/login", accountsController.getlogin);

route.post("/login", expvalidator.loginvalidator, accountsController.postlogin);

route.get("/logout", accountsController.getlogout);

route.get("/getcountries", accountsController.getcountries);

// route.get('/passwordreset', accountsController.getpasswordreset);

// route.post('/passwordreset',expvalidator.passwordresetvalidator, accountsController.postpasswordreset);

// route.get('/passwordrecovery', accountsController.getpasswordrecovery);

// route.post('/passwordrecovery',expvalidator.passwordrecoveryvalidator,accountsController.postpasswordrecovery);

route.get("/dashboard",chktoken,chkrole,menus,profile,accountsController.getdashboard);


// User management routes changes starts from here
route.get("/usermanage",chktoken,chkrole,menus,profile,accountsController.getusermanage);

route.get("/getallusers",chktoken, accountsController.getallusers);
route.post("/toggleuserstatus",chktoken, accountsController.toggleuserstatus);
route.get("/getuserbyid", chktoken, accountsController.getuserbyid);
route.get("/getallroles", chktoken, accountsController.getroles);
route.post("/updateuser",chktoken, accountsController.updateuser);
route.get("/checkusername", chktoken, accountsController.checkUsername);
route.post("/createuser", chktoken, accountsController.createuser);


route.get("/", accountsController.getlogin);

module.exports = route;
