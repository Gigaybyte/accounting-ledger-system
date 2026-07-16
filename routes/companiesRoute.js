const express = require('express');

const path = require('path');

const companiesController = require('../controllers/companiesController');

const chktoken = require('../middlewares/chktoken');

const chkrole = require('../middlewares/chkrole');

const profile = require('../middlewares/profile');

const menus = require('../middlewares/menus');

const expvalidator = require("../validators/expvalidator");

const route = express.Router();

// Access Roles: [Secretary]
route.get('/company', chktoken, chkrole, menus, profile, companiesController.getcompany);
// Access Roles: [Secretary]
route.get('/companybyid', chktoken, chkrole, menus, profile, companiesController.getcompanybyid);
//Access Roles : [AccAdmin, Teller, Secretary]
route.get('/finyearbycompid', chktoken, chkrole, companiesController.getfinyearbycompid);
// Access Roles: [Secretary]
route.post('/addnewcomp', chktoken, chkrole, expvalidator.newcompaddvalidator, companiesController.postnewcompadd);
// Access Roles: [Secretary]
route.post('/updtcomp', chktoken, chkrole, expvalidator.updatecompvalidator, companiesController.postupdatecomp);
// Access Roles: [Secretary]
route.post('/deletecomp', chktoken, chkrole, companiesController.postdelcomp);
// Access Roles: [Secretary]
route.post('/compbusinessdtls', chktoken, chkrole, expvalidator.compbusinessdtls, companiesController.postcompbusinessdtls);
// Access Roles: [Secretary]
route.get('/compbusinessdtlsbycompid', chktoken, chkrole, companiesController.getcompbusinessdtlsbycompid);
// Access Roles: [Secretary]
route.get('/compersonneldtlsbytenantid', chktoken, chkrole, companiesController.getcompersonneldtlsbytenantid);
// Access Roles: [Secretary]
route.get('/compersonneldtlsbyid', chktoken, chkrole, companiesController.getcompersonneldtlsbyid);
// Access Roles: [Secretary]
route.post('/compersonneldtlsadd', chktoken, chkrole, expvalidator.compersonneldtlsadd, companiesController.postcompersonneldtlsadd);
// Access Roles: [Secretary]
route.post('/compersonneldtlsedit', chktoken, chkrole, expvalidator.compersonneldtlsedit, companiesController.postcompersonneldtlsedit);
// Access Roles: [Secretary]
route.post('/compersonneldtlsdel', chktoken, chkrole, companiesController.postcompersonneldtlsdel);
// Access Roles: [Secretary]
route.get('/compdirdtlsbycompid', chktoken, chkrole, companiesController.getcompdirdtlsbycompid);
// Access Roles: [Secretary]
route.post('/compdirdtlsadd', chktoken, chkrole, expvalidator.compdirdtlsadd, companiesController.postcompdirdtlsadd);
// Access Roles: [Secretary]
route.post('/compdirdtlsexit', chktoken, chkrole, expvalidator.compdirdtlsexit, companiesController.postcompdirdtlsexit);
// Access Roles: [Secretary]
route.get('/compshareholderdtlsbycompid', chktoken, chkrole, companiesController.getcompshareholderdtlsbycompid);
// Access Roles: [Secretary]
route.post('/compshareholderdtlsadd', chktoken, chkrole, expvalidator.compshareholderdtlsadd, companiesController.postcompshareholderdtlsadd);
// Access Roles: [Secretary]
route.post('/compshareholderdtlsdel', chktoken, chkrole, expvalidator.compshareholderdtlsdel, companiesController.postcompshareholderdtlsdel);
// Access Roles: [Secretary]
route.get('/doctype', chktoken, chkrole, companiesController.getdoctype);
// Access Roles: [Secretary]
route.get('/doctypebyid', chktoken, chkrole, companiesController.getdoctypebyid);
// Access Roles: [Secretary]
route.post('/doctypeadd', chktoken, chkrole, expvalidator.doctypeadd, companiesController.postdoctypeadd);
// Access Roles: [Secretary]
route.post('/doctypeupdt', chktoken, chkrole, expvalidator.doctypeedit, companiesController.postdoctypeupdt);
// Access Roles: [Secretary]
route.post('/doctypedel', chktoken, chkrole, expvalidator.doctypedel, companiesController.postdoctypedel);
// Access Roles: [Secretary]
route.get('/docname', chktoken, chkrole, companiesController.getdocname);
// Access Roles: [Secretary]
route.get('/docnamebyid', chktoken, chkrole, companiesController.getdocnamebyid);
// Access Roles: [Secretary]
route.post('/docnameadd', chktoken, chkrole, expvalidator.docnameadd, companiesController.postdocnameadd);
// Access Roles: [Secretary]
route.post('/docnameupdt', chktoken, chkrole, expvalidator.docnameedit, companiesController.postdocnameupdt);
// Access Roles: [Secretary]
route.post('/docnamedel', chktoken, chkrole, expvalidator.docnamedel, companiesController.postdocnamedel);
// Access Roles: [Secretary]
route.get('/compdoc', chktoken, chkrole, companiesController.getcompdoc);
// Access Roles: [Secretary]
route.post('/compdocadd', chktoken, chkrole, expvalidator.compdocadd, companiesController.postcompdocadd);

route.get('/coa', chktoken, chkrole, menus, profile, companiesController.getaccheads);

route.get('/coadata', chktoken, chkrole, companiesController.getaccheaddata);

route.post('/addnewcoa', chktoken, chkrole, expvalidator.newcoaaddvalidator, companiesController.postnewcoaadd);

route.post('/updatecoa', chktoken, chkrole, expvalidator.updatecoavalidator, companiesController.postupdatecoa);

route.post('/deletecoa', chktoken, chkrole, companiesController.postdelcoa);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgers', chktoken, chkrole, menus, profile, companiesController.getledger);

route.get('/ledgerbyid', chktoken, chkrole, companiesController.getledgerbyid);

route.get('/allledgerbygrupname', chktoken, chkrole, companiesController.getallledgerbygrupname);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgerbygrupname', chktoken, chkrole, companiesController.getledgerbygrupname);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgerbygrupnamepay', chktoken, chkrole, companiesController.getledgerbygrupnamepay);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgerdata', chktoken, chkrole, companiesController.getledgerdata);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgersraw', chktoken, chkrole, companiesController.getledgerraw);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgerrawbycompid', chktoken, chkrole, companiesController.getledgerrawbycompid);

route.get('/ledgersrawnoncb', chktoken, chkrole, companiesController.getledgerrawnoncb);

route.get('/ledgerrawnoncbbycompid', chktoken, chkrole, companiesController.getledgerrawnoncbbycompid);

route.get('/ledgersrawcb', chktoken, chkrole, companiesController.getledgerrawcb);

route.get('/ledgerbycompid', chktoken, chkrole, companiesController.getledgerbycompid);

route.get('/ledgerbycompidcash', chktoken, chkrole, companiesController.getledgerbycompidcash);

route.get('/taxcodes', chktoken, chkrole, companiesController.gettaxcodes);

route.post('/addnewledgers', chktoken, chkrole, expvalidator.newledgeraddvalidator, companiesController.postaddnewledgers);

route.post('/deleteledger', chktoken, chkrole, companiesController.postdelledgers);

route.get('/ledgerbycompidfull', chktoken, chkrole, companiesController.getledgerbycompidfullist);

route.post('/delrecord', chktoken, chkrole, expvalidator.delrecordaddvalidator, companiesController.postdelrecord);

//Access Roles : [AccAdmin, Teller]
route.get('/importdata', chktoken, chkrole, menus, profile, companiesController.getimportdata);

//Access Roles : [AccAdmin, Teller]
route.post('/importdata', chktoken, chkrole, menus, profile, companiesController.postimportdata);

//Access Roles : [AccAdmin, Teller]
route.post('/viewimportdata', chktoken, chkrole, companiesController.postviewimportdata);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgerrawbnkbycompid', chktoken, chkrole, companiesController.getledgerrawbnkbycompid);

route.post('/realize', chktoken, chkrole, companiesController.postrealize);

route.post('/cashrealize', chktoken, chkrole, companiesController.postcashrealize);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgerstatement', chktoken, chkrole, companiesController.getledgerstatement);

//Access Roles : [AccAdmin, Teller]
route.get('/ledgerstatementbydtrange', chktoken, chkrole, companiesController.getledgerstatementbydtrange);

route.get('/entrystatement', chktoken, chkrole, companiesController.getentrystatement);

route.get('/entrystatementbatch', chktoken, chkrole, companiesController.getentrystatementbatch);

route.post('/ledgerentry', chktoken, chkrole, companiesController.postledgerentry);

route.post('/editledgerentry', chktoken, chkrole, companiesController.posteditledgerentry);

route.get('/cashbook', chktoken, chkrole, menus, profile, companiesController.getcashbook);

//Access Roles : [AccAdmin, Teller]
route.get('/bankrec', chktoken, chkrole, menus, profile, companiesController.getbankrec);

route.post('/viewbankdebitdata', chktoken, chkrole, companiesController.postviewbankdebitdata);

route.post('/viewbankcreditdata', chktoken, chkrole, companiesController.postviewbankcreditdata);

route.post('/chkledgersdata', chktoken, chkrole, companiesController.postchkledgersdata);

route.post('/chkledgerspaydata', chktoken, chkrole, companiesController.postchkledgerspaydata);

route.post('/bnkrealize', chktoken, chkrole, companiesController.postbnkrealize);

route.post('/realizebulk', chktoken, chkrole, companiesController.postrealizebulk);

route.post('/combinerealize', chktoken, chkrole, companiesController.postcombinerealize);

route.get('/cashrec', chktoken, chkrole, menus, profile, companiesController.getcashrec);

route.post('/cashrecentry', chktoken, chkrole, companiesController.postcashrecentry);

route.get('/bankpay', chktoken, chkrole, menus, profile, companiesController.getbankpay);

route.get('/bankpayallledgers', chktoken, chkrole, companiesController.getbankpayallledgers);

route.get('/bankrecallledgers', chktoken, chkrole, companiesController.getbankrecallledgers);

route.get('/cashpay', chktoken, chkrole, menus, profile, companiesController.getcashpay);

route.post('/cashpayentry', chktoken, chkrole, companiesController.postcashpayentry);

route.get('/reports', chktoken, chkrole, menus, profile, companiesController.getreports);

route.get('/coalbreport', chktoken, chkrole, companiesController.getcoalbreport);

route.get('/mistransreport', chktoken, chkrole, companiesController.getmistransreport);

route.get('/pnlreport', chktoken, chkrole, companiesController.getpnlreport);

route.get('/tbreport', chktoken, chkrole, companiesController.gettbreport);

route.get('/bsreport', chktoken, chkrole, companiesController.getbsreport);

route.get('/entrydtls', chktoken, chkrole, menus, profile, companiesController.getentrydtls);

route.get('/entrydtlsall',chktoken,chkrole, companiesController.getallentrydtls);

module.exports = route
