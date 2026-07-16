const { check, validationResult } = require('express-validator');
const company = require('../models/company/company');

let allmsg = [];

exports.loginvalidator = [
    check('email').notEmpty().withMessage('Email cannot be blank').isEmail().withMessage('Invalid Email Format'),
    check('password').notEmpty().withMessage('Password cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });

            return res.render('accounts/login', {
                pageTitle: 'LUC Online System || Login Page', msg: '', sts: '', data: req.body
            });
        }
        next();
    }
];

exports.newcompaddvalidator = [
    check('companytype').notEmpty().withMessage('Company type cannot be blank'),
    check('legalname').notEmpty().withMessage('Legal name cannot be blank'),
    check('tradingname').notEmpty().withMessage('Trading name cannot be blank'),
    check('registrationnum').notEmpty().withMessage('Registration number cannot be blank'),
    check('fyst').notEmpty().withMessage('Financial year start cannot be blank'),
    check('fyend').notEmpty().withMessage('Financial year end cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.updatecompvalidator = [
    check('editcompid').notEmpty().withMessage('Company type cannot be blank'),
    check('editlegalname').notEmpty().withMessage('Legal name cannot be blank'),
    check('edittradingname').notEmpty().withMessage('Trading name cannot be blank'),
    check('editregistrationnum').notEmpty().withMessage('Registration number cannot be blank'),
    check('editfyst').notEmpty().withMessage('Financial year start cannot be blank'),
    check('editfyend').notEmpty().withMessage('Financial year end cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.newledgeraddvalidator = [
    check('company').notEmpty().withMessage('Company cannot be blank'),
    check('ledgername').notEmpty().withMessage('Ledger name cannot be blank'),
    check('ledgertype').notEmpty().withMessage('Ledger type name cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.delrecordaddvalidator = [
    check('delentryid').notEmpty().withMessage('Record id cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.newcoaaddvalidator = [
    check('allacchead').notEmpty().withMessage('Placed under cannot be blank'),
    check('coaname').notEmpty().withMessage('Head name cannot be blank'),
    check('coanumber').notEmpty().withMessage('Head number name cannot be blank'),
    check('coadesc').notEmpty().withMessage('Head Description cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.updatecoavalidator = [
    check('editallacchead').notEmpty().withMessage('Placed under cannot be blank'),
    check('editcoaname').notEmpty().withMessage('Head name cannot be blank'),
    check('editcoanumber').notEmpty().withMessage('Head number name cannot be blank'),
    check('editcoadesc').notEmpty().withMessage('Head Description cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compbusinessdtls = [
    check('businessnature').notEmpty().withMessage('Nature of business cannot be blankccc'),
    check('totalshares').notEmpty().withMessage('Total bymber of shares cannot be blank'),
    check('authorizecapital').notEmpty().withMessage('Authorized capital cannot be blank'),
    check('regemail').notEmpty().withMessage('Registered e-mail cannot be blank').isEmail().withMessage('Invalid e-mail address format'),
    check('regcontact').notEmpty().withMessage('Registered contact number cannot be blank'),
    check('regaddress').notEmpty().withMessage('Registered address cannot be blank'),
    check('regstate').notEmpty().withMessage('Registered state cannot be blank'),
    check('regpincode').notEmpty().withMessage('Registered pincode cannot be blank'),
    check('regcountry').notEmpty().withMessage('Registered country cannot be blank'),
    check('bizaddress').notEmpty().withMessage('Business address cannot be blank'),
    check('bizstate').notEmpty().withMessage('Business state cannot be blank'),
    check('bizpincode').notEmpty().withMessage('Business pincode cannot be blank'),
    check('bizcountry').notEmpty().withMessage('Business country cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compersonneldtlsadd = [
    check('name').notEmpty().withMessage('Name cannot be blank'),
    check('icpassport').notEmpty().withMessage('IC/Passport cannot be blank'),
    check('dob').notEmpty().withMessage('Date of Birth cannot be blank'),
    check('nationality').notEmpty().withMessage('Nationality cannot be blank'),
    check('percontact').notEmpty().withMessage('Personal contact cannot be blank'),
    check('peremail').notEmpty().withMessage('Personal e-mail cannot be blank').isEmail().withMessage('Invalid e-mail address format'),
    check('resaddress').notEmpty().withMessage('Residential address cannot be blank'),
    check('resstate').notEmpty().withMessage('Residential state cannot be blank'),
    check('respincode').notEmpty().withMessage('Residential pincode cannot be blank'),
    check('rescountry').notEmpty().withMessage('Residential country cannot be blank'),
    check('corraddress').notEmpty().withMessage('Correspondense address cannot be blank'),
    check('corrstate').notEmpty().withMessage('Correspondense state cannot be blank'),
    check('corrpincode').notEmpty().withMessage('Correspondense pincode cannot be blank'),
    check('corrcountry').notEmpty().withMessage('Correspondense country cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compersonneldtlsedit = [
    check('editname').notEmpty().withMessage('Name cannot be blank'),
    check('editicpassport').notEmpty().withMessage('IC/Passport cannot be blank'),
    check('editdob').notEmpty().withMessage('Date of Birth cannot be blank'),
    check('editnationality').notEmpty().withMessage('Nationality cannot be blank'),
    check('editpercontact').notEmpty().withMessage('Personal contact cannot be blank'),
    check('editperemail').notEmpty().withMessage('Personal e-mail cannot be blank').isEmail().withMessage('Invalid e-mail address format'),
    check('editresaddress').notEmpty().withMessage('Residential address cannot be blank'),
    check('editresstate').notEmpty().withMessage('Residential state cannot be blank'),
    check('editrespincode').notEmpty().withMessage('Residential pincode cannot be blank'),
    check('editrescountry').notEmpty().withMessage('Residential country cannot be blank'),
    check('editcorraddress').notEmpty().withMessage('Correspondense address cannot be blank'),
    check('editcorrstate').notEmpty().withMessage('Correspondense state cannot be blank'),
    check('editcorrpincode').notEmpty().withMessage('Correspondense pincode cannot be blank'),
    check('editcorrcountry').notEmpty().withMessage('Correspondense country cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compdirdtlsadd = [
    check('hfvconfigdirectorcompid').notEmpty().withMessage('Company name cannot be blank'),
    check('comppersonel').notEmpty().withMessage('Personnel name cannot be blank'),
    check('dirappointdt').notEmpty().withMessage('Appointment date cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compdirdtlsexit = [
    check('configid').notEmpty().withMessage('Configuration ID cannot be blank'),
    check('exitdt').notEmpty().withMessage('Exit date cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compshareholderdtlsadd = [
    check('hfvconfigshareholdercompid').notEmpty().withMessage('Company name cannot be blank'),
    check('comppersonelshareholder').notEmpty().withMessage('Personnel name cannot be blank'),
    check('totalshare').notEmpty().withMessage('Total shares cannot be blank'),
    check('preferencecash').notEmpty().withMessage('Shares cannot be blank'),
    check('preferenceotherwise').notEmpty().withMessage('Shares cannot be blank'),
    check('ordinarycash').notEmpty().withMessage('Shares cannot be blank'),
    check('ordinaryotherwise').notEmpty().withMessage('Shares cannot be blank'),
    check('otherkindscash').notEmpty().withMessage('Shares cannot be blank'),
    check('otherkindsotherwise').notEmpty().withMessage('Shares cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compshareholderdtlsdel = [
    check('sharehodlerid').notEmpty().withMessage('Configuration ID cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.doctypeadd = [
    check('typename').notEmpty().withMessage('Document type name cannot be blank'),
    check('typedesc').notEmpty().withMessage('Type description cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.doctypeedit = [
    check('editdoctypeid').notEmpty().withMessage('Document type ID cannot be blank'),
    check('edittypename').notEmpty().withMessage('Document type name cannot be blank'),
    check('edittypedesc').notEmpty().withMessage('Type description cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.doctypedel = [
    check('doctypeid').notEmpty().withMessage('Document type ID cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.docnameadd = [
    check('doctype').notEmpty().withMessage('Document type ID cannot be blank'),
    check('docname').notEmpty().withMessage('Document name cannot be blank'),
    check('docdesc').notEmpty().withMessage('Description cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.docnameedit = [
    check('editdocnameid').notEmpty().withMessage('Document name ID cannot be blank'),
    check('editdoctype').notEmpty().withMessage('Document type ID cannot be blank'),
    check('editdocname').notEmpty().withMessage('Document name cannot be blank'),
    check('editdocdesc').notEmpty().withMessage('Description cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.docnamedel = [
    check('docnameid').notEmpty().withMessage('Document name ID cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];

exports.compdocadd = [
    check('compid').notEmpty().withMessage('Company ID cannot be blank'),
    check('docnameid').notEmpty().withMessage('Document name ID cannot be blank'),
    check('docdesc').notEmpty().withMessage('Description cannot be blank'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let allmsg = [];
            errors.array().forEach((val, i) => {
                if (i == errors.array().length - 1) {
                    allmsg.push(val.msg + ".");
                }
                else {
                    allmsg.push(val.msg + ",<br />");
                }
            });
            return res.status(200).send({
                data: {
                    msg: allmsg,
                }, success: false, err: null
            });
        }
        next();
    }
];