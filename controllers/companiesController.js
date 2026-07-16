const uuidv4 = require("uuid");
const moment = require("moment");
const path = require("path");
const ejs = require("ejs");
const { Op, fn, col, where, Transaction, QueryTypes } = require("sequelize");
const { isNull } = require("util");

const sequelize = require("../utils/dbconnector");
const companytype = require("../models/company/companytype");
const country = require("../models/general/country");
const company = require("../models/company/company");
const compbusinessdtls = require("../models/company/compbusinessdtls");
const compersonneldtls = require("../models/company/compersonneldtls");
const compdirdtls = require("../models/company/compdirdtls");
const compshareholderdtls = require("../models/company/compshareholderdtls");
const doctype = require("../models/company/doctype");
const docname = require("../models/company/docname");
const compdoc = require("../models/company/compdocs");
const acchead = require("../models/accounts/acchead");
const ledger = require("../models/accounts/ledger");
const taxcode = require("../models/company/taxcode");
const bankstatement = require("../models/accounts/bankstatement");
const entryledgeropbal = require("../models/accounts/entryledgeropbal");
const entry = require("../models/accounts/entry");
const entrybatch = require("../models/accounts/entrybatch");
const entryitem = require("../models/accounts/entryitem");
const entrydoc = require("../models/accounts/entrydoc");
const entryitemdoc = require("../models/accounts/entryitemdoc");
const currency = require("../models/general/currency");
const finyear = require("../models/accounts/finyear");
const login = require("../models/management/login");
const { json } = require("body-parser");
const e = require("express");
const entrytype = require("../models/accounts/entrytype");
const { Attribute } = require("@sequelize/core");
const {
  attribute,
} = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js");

//-----------------AccAdmin Role Begin ----------------

exports.getcompany = (req, res, next) => {
  let alltypes, alldoctypes, allcurrencies, allcountries;
  companytype
    .findAll({
      order: [["createdAt", "ASC"]],
    })
    .then((types) => {
      alltypes = types;

      company
        .findAll({
          where: {
            tenantid: req.body.tenantID,
          },
          order: [["legalname", "ASC"]],
          include: [{ model: currency, require: true }],
        })
        .then((comps) => {
          let sp = comps.filter((member) => {
            if (
              member.dataValues.typeid == "315c059b-92b8-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          let pp = comps.filter((member) => {
            if (
              member.dataValues.typeid == "315f78cb-92b8-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          let sb = comps.filter((member) => {
            if (
              member.dataValues.typeid == "316434c6-92b8-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          let bhd = comps.filter((member) => {
            if (
              member.dataValues.typeid == "3167e02c-92b8-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          let sdn = comps.filter((member) => {
            if (
              member.dataValues.typeid == "316b8b45-92b8-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          let fc = comps.filter((member) => {
            if (
              member.dataValues.typeid == "31704070-92b8-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          let llp = comps.filter((member) => {
            if (
              member.dataValues.typeid == "3172a654-92b8-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          let clbg = comps.filter((member) => {
            if (
              member.dataValues.typeid == "ebcc4d61-9fcd-11ef-bc9c-bc2411e579d9"
            ) {
              member.dataValues.maincurrency = member.tblcurrency.currency;
              member.dataValues.createdAt = moment(
                member.dataValues.createdAt,
              ).format("DD/MM/YYYY");
              return member.dataValues;
            }
          });

          currency
            .findAll({
              order: [["currency", "ASC"]],
            })
            .then((allcurrs) => {
              allcurrencies = allcurrs.map((element) => {
                return {
                  name: element.currency,
                  id: element.id,
                };
              });

              country
                .findAll({
                  order: [["name", "ASC"]],
                })
                .then((allcnt) => {
                  allcountries = allcnt.map((element) => {
                    return {
                      name: element.name,
                      id: element.id,
                    };
                  });
                  doctype.findAll().then((doctypes) => {
                    alldoctypes = doctypes;

                    res.status(200).render("companies/dashboard", {
                      pageTitle:
                        "Company Management || TVS Online Accounting System",
                      pageName: "Company Manage",
                      msg: "",
                      sts: "",
                      data: {
                        profile: req.body.profile,
                        alltypes: alltypes,
                        alldoctypes: alldoctypes,
                        sp: sp,
                        pp: pp,
                        sb: sb,
                        bhd: bhd,
                        sdn: sdn,
                        fc: fc,
                        llp: llp,
                        clbg: clbg,
                        allcurrencies: allcurrencies,
                        allcountries: allcountries,
                        allmenus: req.body.allmenus,
                      },
                    });
                  });
                });
            });
        });
    });
};

exports.getcompanybyid = (req, res, next) => {
  company
    .findOne({
      where: {
        id: req.query.comp,
      },
    })
    .then((comp) => {
      return res.status(200).send({ data: comp, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getfinyearbycompid = (req, res, next) => {
  let allfinyear;

  finyear
    .findAll({
      where: {
        companyid: req.query.companyid,
      },
      order: [["yrstdt", "DESC"]],
    })
    .then((finyears) => {
      allfinyear = finyears.map((element) => {
        return {
          finyearname: element.finyearname,
          id: element.id,
        };
      });

      return res.status(200).send({
        data: {
          allfinyear: allfinyear,
        },
        success: true,
        err: null,
      });
    });
};

exports.postnewcompadd = (req, res, next) => {
  company
    .findOne({
      where: {
        legalname: req.body.legalname,
        tenantid: req.body.tenantID,
      },
    })
    .then((item) => {
      if (!item) {
        let compid = uuidv4.v4();
        const [stday, stmonth] = req.body.fyst.split("/");
        const styear = moment().format("YYYY");
        const stdate = moment(`${styear}-${stmonth}-${stday}`, "YYYY-MM-DD");

        const [endday, endmonth] = req.body.fyend.split("/");
        const endyear = moment().add(1, "years").format("YYYY");
        const enddate = moment(
          `${endyear}-${endmonth}-${endday}`,
          "YYYY-MM-DD",
        );

        company
          .create({
            id: compid,
            tenantid: req.body.tenantID,
            typeid: req.body.companytype,
            legalname: req.body.legalname,
            tradingname: req.body.tradingname,
            registrationnum: req.body.registrationnum,
            financialyearstart: req.body.fyst,
            financialyearend: req.body.fyend,
            maincurrency: req.body.maincurr,
            multiplecurrency: req.body.chkmulticurr ? 1 : 0,
            sts: 1,
            createdby: req.body.userID,
          })
          .then(() => {
            taxcode
              .create({
                id: uuidv4.v4(),
                tenantid: req.body.tenantID,
                companyid: compid,
                name: "NR",
                rate: 0.0,
                collection_ledger: null,
                paid_ledger: null,
                createdby: req.body.userID,
              })
              .then(() => {
                finyear
                  .create({
                    id: uuidv4.v4(),
                    companyid: compid,
                    finyearname:
                      moment().format("YY") +
                      "-" +
                      moment().add(1, "years").format("YY"),
                    yrstdt: stdate,
                    yrendt: enddate,
                  })
                  .then(() => {
                    let allcoa = [];

                    allcoa.push({
                      id: uuidv4.v4(),
                      parent_id: null,
                      tenantid: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                      companyid: compid,
                      lvl: "0",
                      headname: "ASSET",
                      headnumber: "1000",
                      show_pnl: "0",
                      show_bs: "1",
                      headdesc: "ALL ASSETS",
                      createdby: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                    });

                    allcoa.push({
                      id: uuidv4.v4(),
                      parent_id: null,
                      tenantid: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                      companyid: compid,
                      lvl: "0",
                      headname: "LIABILITY",
                      headnumber: "2000",
                      show_pnl: "0",
                      show_bs: "1",
                      headdesc: "ALL LIABILITIES",
                      createdby: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                    });

                    allcoa.push({
                      id: uuidv4.v4(),
                      parent_id: null,
                      tenantid: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                      companyid: compid,
                      lvl: "0",
                      headname: "EQUITY",
                      headnumber: "3000",
                      show_pnl: "0",
                      show_bs: "1",
                      headdesc: "ALL EQUITIES",
                      createdby: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                    });

                    allcoa.push({
                      id: uuidv4.v4(),
                      parent_id: null,
                      tenantid: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                      companyid: compid,
                      lvl: "0",
                      headname: "REVENUE",
                      headnumber: "4000",
                      show_pnl: "1",
                      show_bs: "0",
                      headdesc: "ALL REVENUES",
                      createdby: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                    });

                    allcoa.push({
                      id: uuidv4.v4(),
                      parent_id: null,
                      tenantid: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                      companyid: compid,
                      lvl: "0",
                      headname: "EXPENSE",
                      headnumber: "5000",
                      show_pnl: "1",
                      show_bs: "0",
                      headdesc: "ALL EXPENSES",
                      createdby: "e23025aa-9596-11ee-a90c-a27c837ebb62",
                    });

                    acchead.bulkCreate(allcoa).then(() => {
                      return res.status(200).send({
                        data: "Company Created Successfully.",
                        success: true,
                        err: null,
                      });
                    });
                  });
              });
          });
      } else {
        return res.status(200).send({
          data: "Legal Name already in existence. Cannot create duplicate value.",
          success: false,
          err: null,
        });
      }
    });
};

exports.postupdatecomp = (req, res, next) => {
  company
    .findOne({
      where: {
        legalname: req.body.editlegalname,
        tenantid: req.body.tenantID,
        id: { [Op.ne]: req.body.editcompid },
      },
    })
    .then((item) => {
      if (!item) {
        company
          .update(
            {
              typeid: req.body.editcompanytype,
              legalname: req.body.editlegalname,
              tradingname: req.body.edittradingname,
              registrationnum: req.body.editregistrationnum,
              financialyearstart: req.body.editfyst,
              financialyearend: req.body.editfyend,
              maincurrency: req.body.editmaincurr,
              multiplecurrency: req.body.editchkmulticurr ? 1 : 0,
              sts: req.body.editsts ? 1 : 0,
            },
            { where: { id: req.body.editcompid } },
          )
          .then(() => {
            return res.status(200).send({
              data: { msg: "Company details updated successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Company leagal name already in existence. Cannot update with duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postdelcomp = (req, res, next) => {
  company
    .destroy({
      where: {
        id: req.body.id,
      },
    })
    .then(() => {
      return res.status(200).send({
        data: { msg: "Company deleted successfully." },
        success: true,
        err: null,
      });
    })
    .catch(function (err) {
      return res.status(200).send({
        data: {
          msg: "One or more items are under this company. Cannot delete.",
        },
        success: false,
        err: null,
      });
    });
};

exports.postcompbusinessdtls = (req, res, next) => {
  compbusinessdtls
    .findOne({
      where: {
        companyid: req.body.businessdtlscompid,
      },
    })
    .then((item) => {
      if (!item) {
        compbusinessdtls
          .create({
            id: uuidv4.v4(),
            companyid: req.body.businessdtlscompid,
            businessnature: req.body.businessnature,
            totalshares: req.body.totalshares,
            authorizecapital: req.body.authorizecapital,
            regemail: req.body.regemail,
            regcontact: req.body.regcontact,
            regaddress: req.body.regaddress,
            regstate: req.body.regstate,
            regpincode: req.body.regpincode,
            regcountry: req.body.regcountry,
            bizaddress: req.body.bizaddress,
            bizstate: req.body.bizstate,
            bizpincode: req.body.bizpincode,
            bizcountry: req.body.bizcountry,
            createdby: req.body.userID,
          })
          .then(() => {
            return res.status(200).send({
              data: { msg: "Business Details Created Successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        let businessdtlsid = item.dataValues.id;
        compbusinessdtls
          .update(
            {
              businessnature: req.body.businessnature,
              totalshares: req.body.totalshares,
              authorizecapital: req.body.authorizecapital,
              regemail: req.body.regemail,
              regcontact: req.body.regcontact,
              regaddress: req.body.regaddress,
              regstate: req.body.regstate,
              regpincode: req.body.regpincode,
              regcountry: req.body.regcountry,
              bizaddress: req.body.bizaddress,
              bizstate: req.body.bizstate,
              bizpincode: req.body.bizpincode,
              bizcountry: req.body.bizcountry,
            },
            { where: { id: businessdtlsid } },
          )
          .then(() => {
            return res.status(200).send({
              data: { msg: "Business Details Updated Successfully." },
              success: true,
              err: null,
            });
          });
      }
    });
};

exports.getcompbusinessdtlsbycompid = (req, res, next) => {
  compbusinessdtls
    .findOne({
      where: {
        companyid: req.query.companyid,
      },
    })
    .then((data) => {
      if (data) {
        return res.status(200).send({
          data: {
            compbusinessdtlsdata: data.dataValues,
          },
          success: true,
          err: null,
        });
      } else {
        return res.status(200).send({
          data: {
            compbusinessdtlsdata: null,
          },
          success: true,
          err: null,
        });
      }
    });
};

exports.getcompersonneldtlsbytenantid = (req, res, next) => {
  let allcompersonneldtls;
  compersonneldtls
    .findAll({
      where: {
        tenantid: req.body.tenantID,
      },
      include: [
        { model: country, as: "ncountry", require: true },
        { model: country, as: "rcountry", require: true },
        { model: country, as: "ccountry", require: true },
      ],
    })
    .then((data) => {
      allcompersonneldtls = data.map((element) => {
        return {
          id: element.id,
          ID: element.id,
          Name: element.name,
          "Personal Details":
            "<b>Passport/IC:</b><br>" +
            element.icpassport +
            "<br><b>Date of Birth:</b><br>" +
            element.dob +
            "<br><b>Nationality:</b><br>" +
            element.ncountry.name,
          "Personal Contact":
            "<b>Personal contact:</b><br>" +
            element.percontact +
            "<br><b>Persnal email:</b><br>" +
            element.peremail,
          "Occupational Details":
            "<b>Occupation:</b><br>" +
            element.occupation +
            "<br><b>Office contact:</b><br>" +
            element.offcontact +
            "<br><b>Office email:</b><br>" +
            element.offemail,
          "Residential Address":
            "<b>Address:</b><br>" +
            element.resaddress +
            "<br><b>State:</b><br>" +
            element.resstate +
            "<br><b>Pincode:</b><br>" +
            element.respincode +
            "<br><b>Country:</b><br>" +
            element.rcountry.name,
          "Correspondense Address":
            "<b>Address:</b><br>" +
            element.corraddress +
            "<br><b>State:</b><br>" +
            element.corrstate +
            "<br><b>Pincode:</b><br>" +
            element.corrpincode +
            "<br><b>Country:</b><br>" +
            element.ccountry.name,
        };
      });

      return res.status(200).send({
        data: {
          allcompersonneldtls: allcompersonneldtls,
        },
        success: true,
        err: null,
      });
    });
};

exports.getcompersonneldtlsbyid = (req, res, next) => {
  compersonneldtls
    .findOne({
      where: {
        id: req.query.id,
      },
    })
    .then((data) => {
      if (data) {
        data.dataValues.dob = moment(data.dataValues.dob, "YYYY-MM-DD").format(
          "DD/MM/YYYY",
        );
        return res.status(200).send({
          data: {
            compersonneldtlsdata: data.dataValues,
          },
          success: true,
          err: null,
        });
      } else {
        return res.status(200).send({
          data: {
            compersonneldtlsdata: null,
          },
          success: true,
          err: null,
        });
      }
    });
};

exports.postcompersonneldtlsadd = (req, res, next) => {
  compersonneldtls
    .findOne({
      where: {
        name: req.body.name,
        tenantid: req.body.tenantID,
      },
    })
    .then((item) => {
      if (!item) {
        let compid = uuidv4.v4();
        compersonneldtls
          .create({
            id: compid,
            tenantid: req.body.tenantID,
            name: req.body.name,
            icpassport: req.body.icpassport,
            dob: moment(req.body.dob, "DD/MM/YYYY").format("YYYY-MM-DD"),
            nationality: req.body.nationality,
            percontact: req.body.percontact,
            peremail: req.body.peremail,
            occupation: req.body.occupation,
            offcontact: req.body.offcontact,
            offemail: req.body.offemail,
            resaddress: req.body.resaddress,
            resstate: req.body.resstate,
            respincode: req.body.respincode,
            rescountry: req.body.rescountry,
            corraddress: req.body.corraddress,
            corrstate: req.body.corrstate,
            corrpincode: req.body.corrpincode,
            corrcountry: req.body.corrcountry,
            createdby: req.body.userID,
          })
          .then(() => {
            return res.status(200).send({
              data: { msg: "Person Details Created Successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Same person name already in existence. Cannot create duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postcompersonneldtlsedit = (req, res, next) => {
  compersonneldtls
    .findOne({
      where: {
        name: req.body.editname,
        tenantid: req.body.tenantID,
        id: { [Op.ne]: req.body.vwcompersondtlsid },
      },
    })
    .then((item) => {
      if (!item) {
        compersonneldtls
          .update(
            {
              name: req.body.editname,
              icpassport: req.body.editicpassport,
              dob: moment(req.body.editdob, "DD/MM/YYYY").format("YYYY-MM-DD"),
              nationality: req.body.editnationality,
              percontact: req.body.editpercontact,
              peremail: req.body.editperemail,
              occupation: req.body.editoccupation,
              offcontact: req.body.editoffcontact,
              offemail: req.body.editoffemail,
              resaddress: req.body.editresaddress,
              resstate: req.body.editresstate,
              respincode: req.body.editrespincode,
              rescountry: req.body.editrescountry,
              corraddress: req.body.editcorraddress,
              corrstate: req.body.editcorrstate,
              corrpincode: req.body.editcorrpincode,
              corrcountry: req.body.editcorrcountry,
            },
            { where: { id: req.body.vwcompersondtlsid } },
          )
          .then(() => {
            return res.status(200).send({
              data: { msg: "Person Details updated successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Same person name already in existence. Cannot update with duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postcompersonneldtlsdel = (req, res, next) => {
  compersonneldtls
    .destroy({
      where: {
        id: req.body.id,
      },
    })
    .then(() => {
      return res.status(200).send({
        data: { msg: "Person details deleted successfully." },
        success: true,
        err: null,
      });
    })
    .catch(function (err) {
      return res.status(200).send({
        data: {
          msg: "One or more items are under this personal details. Cannot delete.",
        },
        success: false,
        err: null,
      });
    });
};

exports.getcompdirdtlsbycompid = (req, res, next) => {
  let allcompdirdtls;
  compdirdtls
    .findAll({
      where: {
        companyid: req.query.compid,
      },
      include: [{ model: compersonneldtls, require: true }],
    })
    .then((data) => {
      allcompdirdtls = data.map((element) => {
        return {
          id: element.id,
          name: element.tblcompersonneldtl.name,
          appointdt: moment(element.appointdt).format("DD/MM/YYYY"),
          exitdt: element.exitdt
            ? moment(element.exitdt).format("DD/MM/YYYY")
            : "",
        };
      });

      return res.status(200).send({
        data: {
          allcompdirdtls: allcompdirdtls,
        },
        success: true,
        err: null,
      });
    });
};

exports.postcompdirdtlsadd = (req, res, next) => {
  compdirdtls
    .findOne({
      where: {
        companyid: req.body.hfvconfigdirectorcompid,
        personnelid: req.body.comppersonel,
        [Op.or]: [
          { exitdt: { [Op.is]: null } },
          {
            exitdt: { [Op.gte]: moment.now() },
          },
        ],
      },
    })
    .then((item) => {
      if (!item) {
        compdirdtls
          .create({
            id: uuidv4.v4(),
            tenantid: req.body.tenantID,
            companyid: req.body.hfvconfigdirectorcompid,
            personnelid: req.body.comppersonel,
            appointdt: moment(req.body.dirappointdt, "DD/MM/YYYY").format(
              "YYYY-MM-DD",
            ),
            exitdt:
              req.body.direxitdt.length > 0
                ? moment(req.body.direxitdt, "DD/MM/YYYY").format("YYYY-MM-DD")
                : null,
            sts: true,
            createdby: req.body.userID,
          })
          .then(() => {
            return res.status(200).send({
              data: { msg: "Company Director Configured Successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Same director name already in existence and active. Cannot create duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postcompdirdtlsexit = (req, res, next) => {
  compdirdtls
    .findOne({
      where: {
        id: req.body.configid,
        exitdt: { [Op.not]: null },
      },
    })
    .then((item) => {
      if (!item) {
        compdirdtls
          .update(
            {
              exitdt: moment(req.body.exitdt, "DD/MM/YYYY").format(
                "YYYY-MM-DD",
              ),
            },
            { where: { id: req.body.configid } },
          )
          .then(() => {
            return res.status(200).send({
              data: { msg: "Company Director Exited Successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Company Director is Already Exited Before. Cannot Re-Exit.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.getcompshareholderdtlsbycompid = (req, res, next) => {
  let allcompshareholderdtls;
  compshareholderdtls
    .findAll({
      where: {
        companyid: req.query.compid,
      },
      include: [{ model: compersonneldtls, require: true }],
    })
    .then((data) => {
      allcompshareholderdtls = data.map((element) => {
        return {
          id: element.id,
          name: element.tblcompersonneldtl.name,
          totalshare: element.totalshare,
          preferencecash: element.preferencecash,
          preferenceotherwise: element.preferenceotherwise,
          ordinarycash: element.ordinarycash,
          ordinaryotherwise: element.ordinaryotherwise,
          otherkindscash: element.otherkindscash,
          otherkindsotherwise: element.otherkindsotherwise,
        };
      });

      return res.status(200).send({
        data: {
          allcompshareholderdtls: allcompshareholderdtls,
        },
        success: true,
        err: null,
      });
    });
};

exports.postcompshareholderdtlsadd = (req, res, next) => {
  let tshare = BigInt(req.body.totalshare);
  let allshare =
    BigInt(req.body.preferencecash) +
    BigInt(req.body.preferenceotherwise) +
    BigInt(req.body.ordinarycash) +
    BigInt(req.body.ordinaryotherwise) +
    BigInt(req.body.otherkindscash) +
    BigInt(req.body.otherkindsotherwise);
  if (tshare != allshare) {
    return res.status(200).send({
      data: { msg: "Total calculation of shares are not matching!" },
      success: false,
      err: null,
    });
  } else {
    compshareholderdtls
      .findOne({
        where: {
          companyid: req.body.hfvconfigshareholdercompid,
          personnelid: req.body.comppersonelshareholder,
        },
      })
      .then((item) => {
        if (!item) {
          compshareholderdtls
            .create({
              id: uuidv4.v4(),
              tenantid: req.body.tenantID,
              companyid: req.body.hfvconfigshareholdercompid,
              personnelid: req.body.comppersonelshareholder,
              totalshare: req.body.totalshare,
              preferencecash: req.body.preferencecash,
              preferenceotherwise: req.body.preferenceotherwise,
              ordinarycash: req.body.ordinarycash,
              ordinaryotherwise: req.body.ordinaryotherwise,
              otherkindscash: req.body.otherkindscash,
              otherkindsotherwise: req.body.otherkindsotherwise,
              createdby: req.body.userID,
            })
            .then(() => {
              return res.status(200).send({
                data: {
                  msg: "Company Share Holder Configured Successfully.",
                },
                success: true,
                err: null,
              });
            });
        } else {
          return res.status(200).send({
            data: {
              msg: "Same Share Holder name already in existence. Cannot create duplicate value.",
            },
            success: false,
            err: null,
          });
        }
      });
  }
};

exports.postcompshareholderdtlsdel = (req, res, next) => {
  compshareholderdtls
    .destroy({
      where: {
        id: req.body.sharehodlerid,
      },
    })
    .then(() => {
      return res.status(200).send({
        data: { msg: "Company share holder deleted successfully." },
        success: true,
        err: null,
      });
    })
    .catch(function (err) {
      return res.status(200).send({
        data: {
          msg: "One or more items are under this share holder details. Cannot delete.",
        },
        success: false,
        err: null,
      });
    });
};

exports.getdoctype = (req, res, next) => {
  let alldoctype;
  doctype.findAll().then((data) => {
    alldoctype = data.map((element) => {
      return {
        id: element.id,
        typename: element.typename,
        typedesc: element.typedesc,
      };
    });

    return res.status(200).send({
      data: {
        alldoctype: alldoctype,
      },
      success: true,
      err: null,
    });
  });
};

exports.getdoctypebyid = (req, res, next) => {
  doctype
    .findOne({
      where: {
        id: req.query.id,
      },
    })
    .then((data) => {
      if (data) {
        return res.status(200).send({
          data: {
            doctypedata: data.dataValues,
          },
          success: true,
          err: null,
        });
      } else {
        return res.status(200).send({
          data: {
            doctypedata: "No data found",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postdoctypeadd = (req, res, next) => {
  doctype
    .findOne({
      where: {
        typename: req.body.typename,
      },
    })
    .then((item) => {
      if (!item) {
        doctype
          .create({
            id: uuidv4.v4(),
            typename: req.body.typename,
            typedesc: req.body.typedesc,
            createdby: req.body.userID,
          })
          .then(() => {
            return res.status(200).send({
              data: { msg: "Document Type Created Successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Same document type already existing. Cannot create duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postdoctypeupdt = (req, res, next) => {
  doctype
    .findOne({
      where: {
        typename: req.body.edittypename,
        id: { [Op.ne]: req.body.editdoctypeid },
      },
    })
    .then((item) => {
      if (!item) {
        doctype
          .update(
            {
              typename: req.body.edittypename,
              typedesc: req.body.edittypedesc,
            },
            { where: { id: req.body.editdoctypeid } },
          )
          .then(() => {
            return res.status(200).send({
              data: { msg: "Document Type updated successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Document type name already in existence. Cannot update with duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postdoctypedel = (req, res, next) => {
  doctype
    .destroy({
      where: {
        id: req.body.doctypeid,
      },
    })
    .then(() => {
      return res.status(200).send({
        data: { msg: "Document type deleted successfully." },
        success: true,
        err: null,
      });
    })
    .catch(function (err) {
      return res.status(200).send({
        data: {
          msg: "One or more items are under this document type. Cannot delete.",
        },
        success: false,
        err: null,
      });
    });
};

exports.getdocname = (req, res, next) => {
  let alldocname;
  docname
    .findAll({
      include: [{ model: doctype, require: true }],
    })
    .then((data) => {
      alldocname = data.map((element) => {
        return {
          id: element.id,
          typename: element.tbldoctype.typename,
          docname: element.docname,
          docdesc: element.docdesc,
        };
      });

      return res.status(200).send({
        data: {
          alldocname: alldocname,
        },
        success: true,
        err: null,
      });
    });
};

exports.getdocnamebyid = (req, res, next) => {
  docname
    .findOne({
      where: {
        id: req.query.id,
      },
    })
    .then((data) => {
      if (data) {
        return res.status(200).send({
          data: {
            docnamedata: data.dataValues,
          },
          success: true,
          err: null,
        });
      } else {
        return res.status(200).send({
          data: {
            docnamedata: "No data found",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postdocnameadd = (req, res, next) => {
  docname
    .findOne({
      where: {
        typeid: req.body.doctype,
        docname: req.body.docname,
      },
    })
    .then((item) => {
      if (!item) {
        docname
          .create({
            id: uuidv4.v4(),
            typeid: req.body.doctype,
            docname: req.body.docname,
            docdesc: req.body.docdesc,
            createdby: req.body.userID,
          })
          .then(() => {
            return res.status(200).send({
              data: { msg: "Document Name Created Successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Same document name already existing. Cannot create duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postdocnameupdt = (req, res, next) => {
  docname
    .findOne({
      where: {
        typeid: req.body.editdoctype,
        docname: req.body.editdocname,
        id: { [Op.ne]: req.body.editdocnameid },
      },
    })
    .then((item) => {
      if (!item) {
        docname
          .update(
            {
              typeid: req.body.editdoctype,
              docname: req.body.editdocname,
              docdesc: req.body.editdocdesc,
            },
            { where: { id: req.body.editdocnameid } },
          )
          .then(() => {
            return res.status(200).send({
              data: { msg: "Document Name updated successfully." },
              success: true,
              err: null,
            });
          });
      } else {
        return res.status(200).send({
          data: {
            msg: "Document name already in existence. Cannot update with duplicate value.",
          },
          success: false,
          err: null,
        });
      }
    });
};

exports.postdocnamedel = (req, res, next) => {
  docname
    .destroy({
      where: {
        id: req.body.docnameid,
      },
    })
    .then(() => {
      return res.status(200).send({
        data: { msg: "Document name deleted successfully." },
        success: true,
        err: null,
      });
    })
    .catch(function (err) {
      return res.status(200).send({
        data: {
          msg: "One or more items are under this document name. Cannot delete.",
        },
        success: false,
        err: null,
      });
    });
};

exports.getcompdoc = (req, res, next) => {
  let allcompdocs;
  compdoc
    .findAll({
      where: {
        compid: req.query.compid,
      },
      include: [
        {
          model: docname,
          include: [
            {
              model: doctype,
              require: true,
            },
          ],
          require: true,
        },
      ],
      order: [
        [{ model: docname }, "docname"],
        ["version", "DESC"],
      ],
    })
    .then((data) => {
      allcompdocs = data.map((element) => {
        return {
          id: element.id,
          docname:
            element.tbldocname.docname +
            " (" +
            element.tbldocname.tbldoctype.typename +
            ")",
          version: element.version,
          docurl: element.docurl,
          docdesc: element.docdesc,
          createdAt: moment(element.createdAt).format("DD-MM-YYYY"),
        };
      });

      return res.status(200).send({
        data: {
          allcompdocs: allcompdocs,
        },
        success: true,
        err: null,
      });
    });
};

exports.postcompdocadd = (req, res, next) => {
  if (req.files.docfile) {
    let id = uuidv4.v4();
    let docfileupldpath =
      "/data/compdocs/" +
      uuidv4.v4().toString() +
      path.extname(req.files.docfile.name);
    let version = 1;
    compdoc
      .max("version", {
        where: {
          compid: req.body.compid,
          docnameid: req.body.docnameid,
        },
      })
      .then((item) => {
        if (item) {
          version = item + 1;
        }

        compdoc
          .create({
            id: id,
            compid: req.body.compid,
            docnameid: req.body.docnameid,
            version: version,
            docdesc: req.body.docdesc,
            docurl: docfileupldpath,
            createdby: req.body.userID,
          })
          .then(() => {
            req.files.docfile.mv(
              process.env.basedir + docfileupldpath,
              function (err1) {
                if (err1) {
                  compdoc
                    .destroy({
                      where: {
                        id: id,
                      },
                    })
                    .then(() => {
                      return res.status(200).send({
                        data: { msg: "Error in file uplaod." },
                        success: false,
                        err: null,
                      });
                    });
                } else {
                  return res.status(200).send({
                    data: { msg: "Document uploaded successfully." },
                    success: true,
                    err: null,
                  });
                }
              },
            );
          });
      });
  } else {
    return res.status(200).send({
      data: { msg: "Document file cannot be blank." },
      success: false,
      err: null,
    });
  }
};

exports.getaccheads = (req, res, next) => {
  let allcompanies;

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });

      res.status(200).render("companies/coa", {
        pageTitle: "Chart of Accounts Manage || TVS Online Accounting System",
        pageName: "Chart of Accounts Manage",
        msg: "",
        sts: "",
        data: {
          profile: req.body.profile,
          allmenus: req.body.allmenus,
          allcompanies: allcompanies,
        },
      });
    });
};

exports.getaccheaddata = (req, res, next) => {
  let allacchead, selacchead;

  sequelize
    .query("call viewcoa($compid);", {
      bind: { compid: req.query.companyid },
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      let allcoas = [];
      let x = data[0];
      for (idx in x) {
        allcoas.push({
          id: x[idx].id,
          parent_id: x[idx].parent_id,
          tenantid: x[idx].tenantid,
          companyid: x[idx].companyid,
          lvl: x[idx].lvl,
          headname: x[idx].headname,
          headnumber: x[idx].headnumber,
          show_pnl: x[idx].show_pnl,
          show_bs: x[idx].show_bs,
          headdesc: x[idx].headdesc,
          createdby: x[idx].createdby,
          createdAt: x[idx].createdAt,
          updatedAt: x[idx].updatedAt,
          pth: x[idx].pth,
        });
      }

      if (req.query.id) {
        selacchead = allcoas.filter((element) => {
          if (element.id == req.query.id) {
            return {
              name:
                element.headname +
                " (" +
                element.headnumber +
                ")" +
                (element.heads != null
                  ? " (" + element.heads.headname + ")"
                  : ""),
              id: element.id,
              headname: element.headname,
              parentid: element.heads != null ? element.heads.id : "root",
              headnumber: element.headnumber,
              show_pnl: element.show_pnl,
              show_bs: element.show_bs,
              headdesc: element.headdesc,
            };
          }
        });
      }

      allacchead = allcoas.map((element) => {
        return {
          name:
            element.headname +
            " (" +
            element.headnumber +
            ")" +
            (element.heads != null ? " (" + element.heads.headname + ")" : ""),
          id: element.id,
          ID: element.id,
          Name: element.headname,
          Number: element.headnumber,
          "Parent Name": element.pth,
          "Show in":
            "<b>Profit & Loss: </b>" +
            (element.show_pnl == 0 ? "No" : "Yes") +
            "<br><b>Balance Sheet: </b>" +
            (element.show_bs == 0 ? "No" : "Yes"),
          Description: element.headdesc,
        };
      });

      return res.status(200).send({
        data: {
          allacchead: allacchead,
          selacchead: selacchead,
        },
        success: true,
        err: null,
      });
    });

  // acchead.findAll({
  //     where:{
  //         companyid:req.query.companyid,
  //     },
  //     include: [
  //         {
  //             model:acchead,
  //             as: "heads",
  //             require: true
  //         }
  //     ],
  //     order: [
  //         ['headnumber', 'ASC'],
  //         ['headname', 'ASC'],
  //     ],
  // }).then(allheads=>{

  //     if(req.query.id){
  //         selacchead = allheads.filter(element=>{
  //             if(element.id==req.query.id){
  //                 return{
  //                     name: element.headname+' ('+element.headnumber+')'+((element.heads!=null?(' ('+element.heads.headname+')'):'')),
  //                     id: element.id,
  //                     headname: element.headname,
  //                     parentid:(element.heads!=null?element.heads.id:'root'),
  //                     headnumber: element.headnumber,
  //                     show_pnl: element.show_pnl,
  //                     show_bs: element.show_bs,
  //                     headdesc: element.headdesc,
  //                 }
  //             }
  //         });
  //     }

  //     allacchead = allheads.map((element)=>{
  //         return{
  //             name: element.headname+' ('+element.headnumber+')'+((element.heads!=null?(' ('+element.heads.headname+')'):'')),
  //             id: element.id,
  //             ID: element.id,
  //             Name: element.headname,
  //             'Parent Name':(element.heads!=null?element.heads.headname:''),
  //             Number: element.headnumber,
  //             'Show in Profit & Loss': (element.show_pnl==0?'No':'Yes'),
  //             'Show in Balance Sheet': (element.show_bs==0?'No':'Yes'),
  //             Description: element.headdesc,
  //         }
  //     });

  //     return res.status(200).send({data:{
  //         allacchead:allacchead,
  //         selacchead:selacchead
  //     },success:true,err:null});

  // })
};

exports.postnewcoaadd = (req, res, next) => {
  if (req.body.allacchead == "root") {
    return res.status(200).send({
      data: {
        msg: "You cannot create COA in root level.",
      },
      success: false,
      err: null,
    });
  } else {
    if (req.body.allacchead == "root") {
      acchead
        .findOne({
          where: {
            headname: req.body.coaname,
            companyid: req.body.compid,
          },
        })
        .then((item) => {
          if (!item) {
            acchead
              .create({
                id: uuidv4.v4(),
                parent_id: null,
                tenantid: req.body.tenantID,
                companyid: req.body.compid,
                lvl: 0,
                headname: req.body.coaname,
                headnumber: req.body.coanumber,
                show_pnl: req.body.showpl ? 1 : 0,
                show_bs: req.body.showbs ? 1 : 0,
                headdesc: req.body.coadesc,
                sts: 1,
                createdby: req.body.userID,
              })
              .then(() => {
                return res.status(200).send({
                  data: { msg: "Account Head Created Successfully." },
                  success: true,
                  err: null,
                });
              });
          } else {
            return res.status(200).send({
              data: {
                msg: "Head Name already in existence. Cannot create duplicate value.",
              },
              success: false,
              err: null,
            });
          }
        });
    } else {
      let lvl;
      acchead
        .findAll({
          where: {
            id: req.body.allacchead,
          },
        })
        .then((head) => {
          lvl = head[0].dataValues.lvl;

          acchead
            .findOne({
              where: {
                headname: req.body.coaname,
                companyid: req.body.compid,
              },
            })
            .then((item) => {
              if (!item) {
                acchead
                  .create({
                    id: uuidv4.v4(),
                    parent_id: req.body.allacchead,
                    tenantid: req.body.tenantID,
                    companyid: req.body.compid,
                    lvl: lvl + 1,
                    headname: req.body.coaname,
                    headnumber: req.body.coanumber,
                    show_pnl: req.body.showpl ? 1 : 0,
                    show_bs: req.body.showbs ? 1 : 0,
                    headdesc: req.body.coadesc,
                    sts: 1,
                    createdby: req.body.userID,
                  })
                  .then(() => {
                    return res.status(200).send({
                      data: { msg: "Account Head Created Successfully." },
                      success: true,
                      err: null,
                    });
                  });
              } else {
                return res.status(200).send({
                  data: {
                    msg: "Head Name already in existence. Cannot create duplicate value.",
                  },
                  success: false,
                  err: null,
                });
              }
            });
        });
    }
  }
};

exports.postupdatecoa = (req, res, next) => {
  acchead
    .findOne({
      where: {
        id: req.body.editcoapid,
      },
    })
    .then((coaitem) => {
      if (coaitem.parent_id == null) {
        return res.status(200).send({
          data: {
            msg: "You cannot edit root item",
          },
          success: false,
          err: null,
        });
      } else {
        if (req.body.editallacchead == "root") {
          acchead
            .findOne({
              where: {
                [Op.or]: [
                  { headname: req.body.editcoaname },
                  { headnumber: req.body.editcoanumber },
                ],
                companyid: req.body.editcompid,
                id: { [Op.ne]: req.body.editcoapid },
              },
            })
            .then((item) => {
              if (!item) {
                acchead
                  .update(
                    {
                      parent_id: null,
                      lvl: 0,
                      headname: req.body.editcoaname,
                      headnumber: req.body.editcoanumber,
                      show_pnl: req.body.editshowpl ? 1 : 0,
                      show_bs: req.body.editshowbs ? 1 : 0,
                      headdesc: req.body.editcoadesc,
                    },
                    { where: { id: req.body.editcoapid } },
                  )
                  .then(() => {
                    return res.status(200).send({
                      data: { msg: "Account Head Updated Successfully." },
                      success: true,
                      err: null,
                    });
                  });
              } else {
                return res.status(200).send({
                  data: {
                    msg: "Head Name/Head Number already in existence. Cannot update with duplicate value.",
                  },
                  success: false,
                  err: null,
                });
              }
            });
        } else {
          let lvl;
          acchead
            .findAll({
              where: {
                id: req.body.editallacchead,
              },
            })
            .then((head) => {
              lvl = head[0].dataValues.lvl;

              acchead
                .findOne({
                  where: {
                    [Op.or]: [
                      { headname: req.body.editcoaname },
                      { headnumber: req.body.editcoanumber },
                    ],
                    companyid: req.body.editcompid,
                    id: { [Op.ne]: req.body.editcoapid },
                  },
                })
                .then((item) => {
                  if (!item) {
                    acchead
                      .update(
                        {
                          parent_id: req.body.editallacchead,
                          lvl: lvl + 1,
                          headname: req.body.editcoaname,
                          headnumber: req.body.editcoanumber,
                          show_pnl: req.body.editshowpl ? 1 : 0,
                          show_bs: req.body.editshowbs ? 1 : 0,
                          headdesc: req.body.editcoadesc,
                        },
                        { where: { id: req.body.editcoapid } },
                      )
                      .then(() => {
                        return res.status(200).send({
                          data: { msg: "Account Head Updated Successfully." },
                          success: true,
                          err: null,
                        });
                      });
                  } else {
                    return res.status(200).send({
                      data: {
                        msg: "Head Name/Head Number already in existence. Cannot create duplicate value.",
                      },
                      success: false,
                      err: null,
                    });
                  }
                });
            });
        }
      }
    });
};

exports.postdelcoa = (req, res, next) => {
  acchead
    .findOne({
      where: {
        id: req.body.id,
      },
    })
    .then((coaitem) => {
      if (coaitem.parent_id == null) {
        return res.status(200).send({
          data: {
            msg: "You cannot delete root item",
          },
          success: false,
          err: null,
        });
      } else {
        acchead
          .findAll({
            where: {
              parent_id: req.body.id,
            },
          })
          .then((item) => {
            if (item.length == 0) {
              acchead
                .destroy({
                  where: {
                    id: req.body.id,
                  },
                })
                .then(() => {
                  return res.status(200).send({
                    data: { msg: "Account head deleted successfully." },
                    success: true,
                    err: null,
                  });
                })
                .catch(function (err) {
                  return res.status(200).send({
                    data: {
                      msg: "One or more ledgers are under this account head. Cannot delete.",
                    },
                    success: false,
                    err: null,
                  });
                });
            } else {
              return res.status(200).send({
                data: {
                  msg: "One or more sub-heads are under this account head. Cannot delete.",
                },
                success: false,
                err: null,
              });
            }
          });
      }
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledger = (req, res, next) => {
  let allcompanies, allledgers;

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });
      const canManage = req.body.role.includes(
        "9b8c06c1-a300-11ef-bc9c-bc2411e579d9",
      );
      res.status(200).render("companies/ledgers", {
        pageTitle: "Ledger Manage || TVS Online Accounting System",
        pageName: "Ledger Manage",
        msg: "",
        sts: "",
        data: {
          profile: req.body.profile,
          allmenus: req.body.allmenus,
          canManage: canManage,
          allcompanies: allcompanies,
        },
      });
    });
};

exports.getallledgerbygrupname = (req, res, next) => {
  let allledgers, allledgersDtable;
  ledger
    .findAll({
      where: {
        headid: req.query.id,
      },
      order: [["ledgername", "ASC"]],
    })
    .then((el) => {
      allledgers = el.map((element) => {
        return {
          ledgername: element.ledgername,
          opbal_dt: element.opbal_dt,
          opbal: element.opbal,
          ledgertype: element.ledgertype,
          ledgerdesc: element.ledgerdesc,
        };
      });

      allledgersDtable = el.map((element) => {
        return {
          ID: element.id,
          "Ledger Name": element.ledgername,
          "Opening Date": moment(element.opbal_dt).format("DD-MM-YYYY"),
          "Opening Balance": element.opbal,
          "Ledger Type":
            element.ledgertype == "1"
              ? "Cash"
              : element.ledgertype == "2"
                ? "Bank"
                : "N/A",
          "Ledger Description": element.ledgerdesc,
        };
      });

      return res.status(200).send({
        data: { allledgers: allledgers, allledgersDtable: allledgersDtable },
        success: true,
        err: null,
      });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerdata = async (req, res, next) => {
  let allacchead, alltaxcode, allfinyear, heads;
  if (req.body.role.includes("9b8c06c1-a300-11ef-bc9c-bc2411e579d9")) {
    heads = await acchead.findAll({
      where: {
        tenantid: req.body.tenantID,
        companyid: req.query.companyid,
      },
      include: [
        {
          model: acchead,
          as: "heads",
          require: true,
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  } else if (req.body.role.includes("9b8f2d7a-a300-11ef-bc9c-bc2411e579d9")) {
    heads = await acchead.findAll({
      where: {
        tenantid: req.body.tenantID,
        companyid: req.query.companyid,
        headname: {
          [Op.or]: [{ [Op.like]: "%Trade Rec%" }, { [Op.like]: "%Trade Pay%" }],
        },
      },
      include: [
        {
          model: acchead,
          as: "heads",
          require: true,
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }

  allacchead = heads.map((element) => {
    return {
      name:
        element.headname +
        (element.heads != null ? " (" + element.heads.headname + ")" : ""),
      id: element.id,
    };
  });

  taxcode
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        companyid: req.query.companyid,
      },
      order: [["createdAt", "ASC"]],
    })
    .then((taxcodes) => {
      alltaxcode = taxcodes.map((element) => {
        return {
          name: element.name,
          id: element.id,
        };
      });

      finyear
        .findAll({
          where: {
            companyid: req.query.companyid,
          },
          order: [["yrstdt", "DESC"]],
        })
        .then((finyears) => {
          allfinyear = finyears.map((element) => {
            return {
              finyearname: element.finyearname,
              id: element.id,
            };
          });

          return res.status(200).send({
            data: {
              allacchead: allacchead,
              alltaxcode: alltaxcode,
              allfinyear: allfinyear,
            },
            success: true,
            err: null,
          });
        });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerraw = (req, res, next) => {
  let allledgers;

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname:
            element.ledgername + " (" + element.tblcompany.legalname + ")",
          id: element.id,
          compid: element.companyid,
          taxcode: element.tax_code,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerrawbycompid = (req, res, next) => {
  let allledgers;

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
        companyid: req.query.compid,
        ledgername: { [Op.like]: "%" + req.query.search + "%" },
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname: element.ledgername,
          id: element.id,
          compid: element.companyid,
          taxcode: element.tax_code,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerrawnoncb = (req, res, next) => {
  let allledgers;

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        ledgertype: "0",
        sts: "1",
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname:
            element.ledgername + " (" + element.tblcompany.legalname + ")",
          id: element.id,
          compid: element.companyid,
          taxcode: element.tax_code,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerrawnoncbbycompid = (req, res, next) => {
  let allledgers;

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        ledgertype: "0",
        sts: "1",
        companyid: req.query.compid,
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname: element.ledgername,
          id: element.id,
          compid: element.companyid,
          taxcode: element.tax_code,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

exports.getledgerrawcb = (req, res, next) => {
  let allledgers;

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        ledgertype: ["1", "2"],
        sts: "1",
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname:
            element.ledgername + " (" + element.tblcompany.legalname + ")",
          id: element.id,
          compid: element.companyid,
          taxcode: element.tax_code,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerrawbnkbycompid = (req, res, next) => {
  let allledgers;

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        ledgertype: ["2"],
        companyid: req.query.compid,
        sts: "1",
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname:
            element.ledgername + " (" + element.tblcompany.legalname + ")",
          id: element.id,
          compid: element.companyid,
          taxcode: element.tax_code,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

exports.getledgerbycompid = (req, res, next) => {
  let allledgers;
  ledger
    .findAll({
      where: {
        companyid: req.query.compid,
        ledgername: { [Op.like]: "%" + req.query.search + "%" },
      },
      order: [["ledgername", "ASC"]],
      include: [
        { model: acchead, require: true },
        { model: finyear, require: true },
        { model: taxcode, require: true },
      ],
    })
    .then((el) => {
      allledgers = el.map((element) => {
        return {
          name: element.ledgername,
          id: element.id,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

exports.getledgerbycompidcash = (req, res, next) => {
  let allledgers;
  ledger
    .findAll({
      where: {
        companyid: req.query.compid,
        ledgername: { [Op.like]: "%" + req.query.search + "%" },
        ledgertype: "1",
      },
      order: [["ledgername", "ASC"]],
      include: [
        { model: acchead, require: true },
        { model: finyear, require: true },
        { model: taxcode, require: true },
      ],
    })
    .then((el) => {
      allledgers = el.map((element) => {
        return {
          name: element.ledgername,
          id: element.id,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerbyid = (req, res, next) => {
  let ledid = req.query.ledgerid;
  ledger
    .findAll({
      where: {
        id: ledid,
      },
      order: [["ledgername", "ASC"]],
      include: [
        { model: acchead, require: true },
        { model: finyear, require: true },
        { model: taxcode, require: true },
      ],
    })
    .then((el) => {
      return res.status(200).send({ data: el, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerbygrupname = (req, res, next) => {
  ledger
    .findAll({
      where: {
        companyid: req.query.compid,
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: acchead,
          where: {
            [Op.and]: sequelize.literal(`SUBSTRING(headnumber, 1, 4) = '4000'`),
          },
          require: true,
        },
        { model: finyear, require: true },
        { model: taxcode, where: { rate: "0.00" }, require: true },
        { model: company, require: true },
      ],
    })
    .then((el) => {
      return res.status(200).send({ data: el, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerbygrupnamepay = (req, res, next) => {
  ledger
    .findAll({
      where: {
        companyid: req.query.compid,
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: acchead,
          where: {
            [Op.and]: sequelize.literal(`SUBSTRING(headnumber, 1, 4) = '5000'`),
          },
          require: true,
        },
        { model: finyear, require: true },
        { model: taxcode, where: { rate: "0.00" }, require: true },
        { model: company, require: true },
      ],
    })
    .then((el) => {
      return res.status(200).send({ data: el, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.gettaxcodes = (req, res, next) => {
  let alltaxcodes;

  taxcode
    .findAll({
      where: {
        companyid: req.query.companyid,
      },
      order: [["name", "ASC"]],
    })
    .then((codes) => {
      if (codes.length > 0) {
        alltaxcodes = codes.map((element) => {
          return {
            name: element.name,
            id: element.id,
          };
        });
      }

      return res
        .status(200)
        .send({ data: alltaxcodes, success: true, err: null });
    });
};

exports.postaddnewledgers = (req, res, next) => {
  let allledgers;
  let ledgeropbalance;
  if (req.body.ledgerid) {
    ledger
      .findOne({
        where: {
          id: req.body.ledgerid,
        },
      })
      .then((item) => {
        if (item) {
          ledgeropbalance = item.opbal_dt;
          ledger
            .findOne({
              where: {
                ledgername: req.body.ledgername,
                companyid: req.body.company,
                tenantid: req.body.tenantID,
                id: { [Op.ne]: req.body.ledgerid },
              },
            })
            .then(async (item) => {
              if (!item) {
                const result = await sequelize.transaction(async (t) => {
                  await ledger.update(
                    {
                      companyid: req.body.company,
                      headid: req.body.ledgertype,
                      ledgername: req.body.ledgername,
                      op_finyear: req.body.finyear,
                      opbal: parseFloat(req.body.ledgeropbal.replace(",", "")),
                      opbal_dt: moment(
                        req.body.ledgeropdt,
                        "DD/MM/YYYY",
                      ).format("YYYY-MM-DD"),
                      opbal_type: req.body.opbaltype,
                      ledgertype: parseInt(req.body.ledtype),
                      reconciliation: req.body.recreq == "on" ? true : false,
                      tax_code: req.body.taxcode,
                      ledgerdesc: req.body.ledgerdesc,
                      sts: req.body.ledgersts == "on" ? true : false,
                    },
                    { where: { id: req.body.ledgerid } },
                    { transaction: t },
                  );

                  await entryledgeropbal.update(
                    {
                      opdate: moment(req.body.ledgeropdt, "DD/MM/YYYY").format(
                        "YYYY-MM-DD",
                      ),
                      opbal: parseFloat(req.body.ledgeropbal.replace(",", "")),
                      opbaltype: req.body.opbaltype,
                    },
                    {
                      where: {
                        ledgerid: req.body.ledgerid,
                        opdate: ledgeropbalance,
                      },
                    },
                    { transaction: t },
                  );
                });

                const ledgers = await ledger.findAll({
                  where: {
                    tenantid: req.body.tenantID,
                  },
                  order: [["ledgername", "ASC"]],
                  include: [
                    {
                      model: company,
                      include: {
                        model: companytype,
                        require: true,
                      },
                      require: true,
                    },
                  ],
                });

                allledgers = ledgers.map((element) => {
                  return {
                    name:
                      element.ledgername +
                      " (" +
                      element.tblcompany.legalname +
                      ") (" +
                      element.tblcompany.tblcompanytype.typename +
                      ")",
                    compname:
                      element.ledgername +
                      " (" +
                      element.tblcompany.legalname +
                      ")",
                    id: element.id,
                  };
                });

                return res.status(200).send({
                  data: {
                    msg: "Ledger Details Updated Successfully.",
                    allledgers: allledgers,
                    updtledgerid: req.body.ledgerid,
                  },
                  success: true,
                  err: null,
                });
              } else {
                return res.status(200).send({
                  data: "Ledger Name already in existence. Cannot update duplicate ledger name under same company.",
                  success: false,
                  err: null,
                });
              }
            });
        } else {
          return res
            .status(200)
            .send({ data: "Ledger ID is invalid", success: false, err: null });
        }
      });
  } else {
    ledger
      .findOne({
        where: {
          ledgername: req.body.ledgername,
          companyid: req.body.company,
          tenantid: req.body.tenantID,
        },
      })
      .then(async (item) => {
        if (!item) {
          let newledgerid = uuidv4.v4();
          const result = await sequelize.transaction(async (t) => {
            await ledger.create(
              {
                id: newledgerid,
                tenantid: req.body.tenantID,
                companyid: req.body.company,
                headid: req.body.ledgertype,
                ledgername: req.body.ledgername,
                op_finyear: req.body.finyear,
                opbal: parseFloat(req.body.ledgeropbal.replace(",", "")),
                opbal_dt: moment(req.body.ledgeropdt, "DD/MM/YYYY").format(
                  "YYYY-MM-DD",
                ),
                opbal_type: req.body.opbaltype,
                ledgertype: parseInt(req.body.ledtype),
                reconciliation: req.body.recreq == "on" ? true : false,
                tax_code: req.body.taxcode,
                ledgerdesc: req.body.ledgerdesc,
                archieved: false,
                sts: req.body.ledgersts == "on" ? true : false,
                createdby: req.body.userID,
              },
              { transaction: t },
            );

            await entryledgeropbal.create(
              {
                id: uuidv4.v4(),
                ledgerid: newledgerid,
                opdate: moment(req.body.ledgeropdt, "DD/MM/YYYY").format(
                  "YYYY-MM-DD",
                ),
                opbal: parseFloat(req.body.ledgeropbal.replace(",", "")),
                isfirst: true,
                opbaltype: req.body.opbaltype,
                createdby: req.body.userID,
              },
              { transaction: t },
            );
          });

          const ledgers = await ledger.findAll({
            where: {
              tenantid: req.body.tenantID,
            },
            order: [["ledgername", "ASC"]],
            include: [
              {
                model: company,
                include: {
                  model: companytype,
                  require: true,
                },
                require: true,
              },
            ],
          });

          allledgers = ledgers.map((element) => {
            return {
              name:
                element.ledgername +
                " (" +
                element.tblcompany.legalname +
                ") (" +
                element.tblcompany.tblcompanytype.typename +
                ")",
              compname:
                element.ledgername + " (" + element.tblcompany.legalname + ")",
              id: element.id,
            };
          });

          return res.status(200).send({
            data: {
              msg: "Ledger Created Successfully.",
              allledgers: allledgers,
            },
            success: true,
            err: null,
          });
        } else {
          return res.status(200).send({
            data: "Ledger Name already in existence. Cannot create duplicate ledger under same company.",
            success: false,
            err: null,
          });
        }
      });
  }
};

exports.postdelrecord = async (req, res, next) => {
  delentryid = req.body.delentryid;
  try {
    sequelize
      .query("call delentry($delentryid);", {
        bind: { delentryid: delentryid },
        type: QueryTypes.INSERT,
      })
      .then((data) => {
        return res.status(200).send({
          data: { msg: "Entry deleted successfully." },
          success: true,
          err: null,
        });
      });
  } catch (error) {
    return res
      .status(200)
      .send({ data: { msg: "Error occured." }, success: false, err: null });
  }
};

exports.postdelledgers = async (req, res, next) => {
  try {
    await sequelize.transaction(async (t) => {
      await entryledgeropbal.destroy(
        {
          where: {
            ledgerid: req.body.id,
          },
        },
        { transaction: t },
      );
      await ledger.destroy(
        {
          where: {
            id: req.body.id,
          },
        },
        { transaction: t },
      );
    });
    return res.status(200).send({
      data: { msg: "Ledger deleted successfully." },
      success: true,
      err: null,
    });
  } catch (error) {
    return res.status(200).send({
      data: {
        msg: "One or more entries are under this ledger. Cannot delete.",
      },
      success: false,
      err: null,
    });
  }
};

exports.getledgerbycompidfullist = (req, res, next) => {
  let allledgers;
  ledger
    .findAll({
      where: {
        companyid: req.query.compid,
      },
      order: [["ledgername", "ASC"]],
      include: [
        { model: acchead, require: true },
        { model: finyear, require: true },
        { model: taxcode, require: true },
      ],
    })
    .then((el) => {
      allledgers = el.map((element) => {
        return {
          name: element.ledgername,
          id: element.id,
        };
      });

      return res
        .status(200)
        .send({ data: allledgers, success: true, err: null });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getimportdata = (req, res, next) => {
  let allcompanies,
    allledgers,
    bankledgers = [];

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });

      allcompanies.unshift({
        name: "Select one company",
        id: "0",
      });

      res.status(200).render("companies/importdata", {
        pageTitle:
          "Manage Bank Statement Reconciliation || TVS Online Accounting System",
        pageName: "Bank Statement Reconciliation",
        msg: "",
        sts: "",
        data: {
          profile: req.body.profile,
          allmenus: req.body.allmenus,
          allcompanies: allcompanies,
        },
      });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.postimportdata = async (req, res, next) => {
  let date,
    alldata = JSON.parse(req.body.alldata);

  // verification for duplicate entry
  let dates = [],
    dt;

  alldata.datas.map((element) => {
    dt = moment(element.Date, "DD-MM-YYYY");
    dates.push(dt);
  });

  if (req.body.currtype == "MYR") {
    let item = await bankstatement.findOne({
      where: {
        ledgerid: alldata.ledgerid,
        transdate: dates,
      },
    });

    if (item) {
      return res.status(200).send({
        data: "Data already in existence for one or more dates. Cannot create entry in those day(s).",
        success: false,
        err: null,
      });
    } else {
      let datas = [];
      let entrynumber = await bankstatement.max("entrynumber", {
        where: {
          ledgerid: alldata.ledgerid,
        },
      });

      if (!entrynumber) {
        entrynumber = 0;
      }

      alldata.datas.map((element) => {
        entrynumber++;
        date = moment(element.Date, "DD-MM-YYYY");
        datas.push({
          id: uuidv4.v4(),
          tenantid: req.body.tenantID,
          ledgerid: alldata.ledgerid,
          entrynumber: entrynumber,
          transdate: date,
          transdesc: element.Description,
          amount: parseFloat(
            element.Credit ? element.Credit : element.Debit,
          ).toFixed(2),
          type: element.Credit ? "Credit" : "Debit",
          balance: element.Balance,
          realized: false,
          createdby: req.body.userID,
        });
      });

      bankstatement.bulkCreate(datas).then(() => {
        return res.status(200).send({
          data: "All Import Done Successfully.",
          success: true,
          err: null,
        });
      });
    }
  } else {
    let datas = [];
    let entrynumber = await bankstatement.max("entrynumber", {
      where: {
        ledgerid: alldata.ledgerid,
      },
    });

    if (!entrynumber) {
      entrynumber = 0;
    }

    alldata.datas.map((element) => {
      entrynumber++;
      date = moment(element.Date, "DD-MM-YYYY");
      datas.push({
        id: uuidv4.v4(),
        tenantid: req.body.tenantID,
        ledgerid: alldata.ledgerid,
        entrynumber: entrynumber,
        transdate: date,
        transdesc: element.Description,
        amount: parseFloat(
          element.Credit ? element.Credit : element.Debit,
        ).toFixed(2),
        type: element.Credit ? "Credit" : "Debit",
        balance: element.Balance,
        realized: false,
        createdby: req.body.userID,
      });
    });

    bankstatement.bulkCreate(datas).then(() => {
      return res.status(200).send({
        data: "All Import Done Successfully.",
        success: true,
        err: null,
      });
    });
  }
};

//Access Roles : [AccAdmin, Teller]
exports.postviewimportdata = (req, res, next) => {
  let ledgerid, startdt, enddt;

  ledgerid = req.body.ledgerid;
  startdt = req.body.startdt;
  enddt = req.body.enddt;

  bankstatement
    .findAll({
      where: {
        ledgerid: ledgerid,
        transdate: { [Op.between]: [startdt, enddt] },
      },
      include: [{ model: ledger, require: true }],
      order: [
        [fn("length", col("entrynumber")), "ASC"],
        ["entrynumber", "ASC"],
      ],
    })
    .then((items) => {
      if (items.length == 0) {
        return res.status(200).send({
          data: "No record found for the selected day(s).",
          success: false,
          err: null,
        });
      } else {
        let allvalues = [];

        items.map((item) => {
          if (item.dataValues.type == "Credit") {
            allvalues.push({
              TransactionID: item.dataValues.id,
              LedgerID: item.dataValues.ledgerid,
              TaxcodeID: item.dataValues.tblledger.tax_code,
              EntryID: item.dataValues.entrynumber,
              Account: item.dataValues.tblledger.ledgername,
              Balance: item.dataValues.balance,
              Credit: item.dataValues.amount,
              Date: item.dataValues.transdate,
              Description: item.dataValues.transdesc,
              Realized: item.dataValues.realized,
              RealizedEntryID:
                item.dataValues.realizedentryid == null
                  ? "N/A"
                  : item.dataValues.realizedentryid,
            });
          }
          if (item.dataValues.type == "Debit") {
            allvalues.push({
              TransactionID: item.dataValues.id,
              LedgerID: item.dataValues.ledgerid,
              TaxcodeID: item.dataValues.tblledger.tax_code,
              EntryID: item.dataValues.entrynumber,
              Account: item.dataValues.tblledger.ledgername,
              Balance: item.dataValues.balance,
              Debit: item.dataValues.amount,
              Date: item.dataValues.transdate,
              Description: item.dataValues.transdesc,
              Realized: item.dataValues.realized,
              RealizedEntryID:
                item.dataValues.realizedentryid == null
                  ? "N/A"
                  : item.dataValues.realizedentryid,
            });
          }
        });

        return res
          .status(200)
          .send({ data: allvalues, success: true, err: null });
      }
    });
};

exports.postrealize = async (req, res, next) => {
  try {
    let alldata = JSON.parse(req.body.alldata);
    let entry_item = [];
    let entryid = uuidv4.v4();
    let entrycnt = 0;
    let entrynumber = 0;
    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });

    entrynumber = entrycnt + 1;

    let taxcodes = await taxcode.findAll({
      where: {
        tenantid: req.body.tenantID,
      },
    });

    alldata.data.map((element, idx) => {
      let pamnt, tax, taxamnt, paidld, collectld;

      taxcodes.filter((item) => {
        if (item.id == element.taxcodeid) {
          tax = parseFloat(item.rate);
          paidld = item.paid_ledger;
          collectld = item.collection_ledger;
        }
      });

      if (tax != 0) {
        tax = tax + 1.0;

        pamnt = parseFloat(
          (parseFloat(element.amnt) / parseFloat(tax)).toFixed(2),
        );
        taxamnt = parseFloat(element.amnt) - pamnt;

        //Principal amount
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: element.ledgerid,
          amount: pamnt,
          desc: alldata.narration,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });

        //Tax amount
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: alldata.taxtype == "paid" ? paidld : collectld,
          amount: taxamnt,
          desc: alldata.narration,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_sts: "0",
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });
      } else {
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: element.ledgerid,
          amount: element.amnt,
          desc: alldata.narration,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_sts: "0",
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });
      }
    });

    const result = await sequelize.transaction(async (t) => {
      await entry.create(
        {
          id: entryid,
          tenantid: req.body.tenantID,
          entrytypeid: alldata.entrytype,
          entrynum: entrynumber,
          date: alldata.date,
          dr_total: alldata.dr_total,
          cr_total: alldata.cr_total,
          narration: alldata.narration,
          doc_path: null,
          createdby: req.body.userID,
        },
        { transaction: t },
      );

      await entryitem.bulkCreate(entry_item, { transaction: t });

      await entrybatch.create(
        {
          id: uuidv4.v4(),
          batchid: uuidv4.v4(),
          entryid: entryid,
          createdby: req.body.userID,
        },
        { transaction: t },
      );

      await bankstatement.update(
        { realized: true, realizedentryid: entryid },
        { where: { id: alldata.transid }, transaction: t },
      );
    });

    return res.status(200).send({
      data: "Realization Done Successfully.",
      success: true,
      err: null,
    });
  } catch (error) {
    return res.status(200).send({
      data: "Error in Realization System.",
      success: false,
      err: null,
    });
  }
};

exports.postcashrealize = async (req, res, next) => {
  try {
    let alldata = JSON.parse(req.body.alldata);
    let entry_item = [];
    let entryid = uuidv4.v4();
    let entrycnt = 0;
    let entrynumber = 0;
    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });

    entrynumber = entrycnt + 1;

    let taxcodes = await taxcode.findAll({
      where: {
        tenantid: req.body.tenantID,
      },
    });

    alldata.data.map((element, idx) => {
      let pamnt, tax, taxamnt, paidld, collectld;

      taxcodes.filter((item) => {
        if (item.id == element.taxcodeid) {
          tax = parseFloat(item.rate);
          paidld = item.paid_ledger;
          collectld = item.collection_ledger;
        }
      });

      if (tax != 0) {
        tax = tax + 1.0;

        pamnt = parseFloat(
          (parseFloat(element.amnt) / parseFloat(tax)).toFixed(2),
        );
        taxamnt = parseFloat(element.amnt) - pamnt;

        //Principal amount
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: element.ledgerid,
          amount: pamnt,
          desc: alldata.narration,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });

        //Tax amount
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: alldata.taxtype == "paid" ? paidld : collectld,
          amount: taxamnt,
          desc: alldata.narration,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_sts: "0",
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });
      } else {
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: element.ledgerid,
          amount: element.amnt,
          desc: alldata.narration,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_sts: "0",
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });
      }
    });

    const result = await sequelize.transaction(async (t) => {
      await entry.create(
        {
          id: entryid,
          tenantid: req.body.tenantID,
          entrytypeid: alldata.entrytype,
          entrynum: entrynumber,
          date: alldata.date,
          dr_total: alldata.dr_total,
          cr_total: alldata.cr_total,
          narration: alldata.narration,
          doc_path: null,
          createdby: req.body.userID,
        },
        { transaction: t },
      );

      await entryitem.bulkCreate(entry_item, { transaction: t });

      await entrybatch.create(
        {
          id: uuidv4.v4(),
          batchid: uuidv4.v4(),
          entryid: entryid,
          createdby: req.body.userID,
        },
        { transaction: t },
      );
    });

    return res.status(200).send({
      data: "Realization Done Successfully.",
      success: true,
      err: null,
    });
  } catch (error) {
    return res.status(200).send({
      data: "Error in Realization System.",
      success: false,
      err: null,
    });
  }
};

exports.getledgerstatement = async (req, res, next) => {
  try {
    const ledgerid = req.query.ledgerid;
    const finyearid = req.query.finyearid;
    const companyid = req.query.compid;
    const isdaterange = req.query.isdaterange;
    const fromdate = req.query.fromdate;
    const todate = req.query.todate;

    const finyearResult = await finyear.findOne({
      where: {
        id: finyearid,
      },
    });

    if (!finyearResult) {
      return res.status(200).send({
        success: false,
        message: "Financial year not found",
        err: null,
      });
    }

    const finyearData = finyearResult.get({
      plain: true,
    });

    let startDate;
    let endDate;

    if (isdaterange === "true") {
      startDate = fromdate;
      endDate = todate;
    } else {
      startDate = finyearData.yrstdt;
      endDate = finyearData.yrendt;
    }

    // Company
    const companyResult = await company.findOne({
      where: {
        id: companyid,
      },
      attributes: ["financialyearstart", "financialyearend"],
    });

    const companyData = companyResult
      ? companyResult.get({
          plain: true,
        })
      : null;

    function parseLocalDate(dateStr) {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    if (isdaterange === "true" && companyData) {
      const parseDate = (value) => {
        const [datePart, timePart = "00:00:00"] = String(value)
          .trim()
          .split(" ");
        const [y, m, d] = datePart.split("-").map(Number);
        const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);
        return new Date(y, m - 1, d, hh, mm, ss);
      };

      const selectedFrom = parseDate(startDate);
      const selectedTo = parseDate(endDate);
      if (selectedFrom.getTime() > selectedTo.getTime()) {
        return res.status(200).send({
          success: false,
          message: "From date cannot be greater than To date",
          err: null,
        });
      }

      const [, fyStartMonth] = companyData.financialyearstart
        .split("/")
        .map(Number);

      function getFYYear(date) {
        const month = date.getMonth() + 1;
        return month < fyStartMonth
          ? date.getFullYear() - 1
          : date.getFullYear();
      }

      const fromFY = getFYYear(selectedFrom);
      const toFY = getFYYear(selectedTo);

      if (fromFY !== toFY) {
        return res.status(200).send({
          success: false,
          message: "Date range cannot cross Financial Year",
          err: null,
        });
      }
    }

    let opbalData = null;

    if (isdaterange === "true") {
      const selected = new Date(startDate);
      selected.setHours(0, 0, 0, 0);

      const fyStart = new Date(finyearData.yrstdt);
      fyStart.setHours(0, 0, 0, 0);

      const isFYFirstDay = selected.getTime() === fyStart.getTime();

      if (isFYFirstDay) {
        const opbal = await entryledgeropbal.findOne({
          where: {
            ledgerid,
          },
          order: [["opdate", "DESC"]],
        });

        if (opbal) {
          opbalData = opbal.get({
            plain: true,
          });
        }
      } else {
        const lastEntry = await entryitem.findOne({
          where: {
            ledgerid,
          },
          attributes: ["entryid", "amount", "transtype"],
          include: [
            {
              model: entry,
              attributes: ["date", "entrynum"],
              where: sequelize.where(
                sequelize.fn("DATE", sequelize.col("date")),
                {
                  [Op.lt]: startDate,
                },
              ),
              required: true,
            },
          ],
          order: [
            [
              {
                model: entry,
              },
              "date",
              "DESC",
            ],
            ["createdAt", "DESC"],
          ],
        });
        if (lastEntry) {
          const priorEntries = await entryitem.findAll({
            where: {
              ledgerid,
            },
            attributes: ["entryid", "amount", "transtype"],
            include: [
              {
                model: entry,
                attributes: ["date", "entrynum"],
                where: {
                  [Op.and]: [
                    sequelize.where(
                      sequelize.fn("DATE", sequelize.col("date")),
                      {
                        [Op.gte]: finyearData.yrstdt,
                      },
                    ),
                    sequelize.where(
                      sequelize.fn("DATE", sequelize.col("date")),
                      {
                        [Op.lt]: startDate,
                      },
                    ),
                  ],
                },
                required: true,
              },
            ],
            order: [
              [
                {
                  model: entry,
                },
                "date",
                "ASC",
              ],
            ],
          });

          let balance = 0;
          priorEntries.forEach((item) => {
            const amount = Number(item.amount || 0);
            if (item.transtype === "cr") {
              balance += amount;
            } else if (item.transtype === "dr") {
              balance -= amount;
            }
          });

          const fyOpeningBalance = await entryledgeropbal.findOne({
            where: {
              ledgerid,
            },
            order: [["opdate", "DESC"]],
          });

          let openingBalance = 0;
          if (fyOpeningBalance) {
            const fyOpBal = fyOpeningBalance.get({ plain: true });
            openingBalance =
              fyOpBal.opbaltype === "Cr" ? fyOpBal.opbal : -fyOpBal.opbal;
          }
          const opening = Number(openingBalance ?? 0);
          const bal = Number(balance ?? 0);
          const totalBalance = opening + bal;

          opbalData = {
            opdate: lastEntry.tblentry.date,
            opbal: Math.abs(totalBalance),
            opbaltype: totalBalance >= 0 ? "Cr" : "Dr",
            openingBalance: openingBalance,
          };
        }
      }
    } else {
      const opbal = await entryledgeropbal.findOne({
        where: {
          ledgerid,
        },
      });

      if (opbal) {
        opbalData = opbal.get({
          plain: true,
        });
      }
    }

    const allentries = await entryitem.findAll({
      where: {
        ledgerid,
      },
      attributes: ["entryid", "amount", "desc", "transtype", "createdAt"],
      include: [
        {
          model: entry,
          where: sequelize.where(sequelize.fn("DATE", sequelize.col("date")), {
            [Op.between]: [startDate, endDate],
          }),
          attributes: ["date", "entrynum"],
          required: true,
        },
      ],
      order: [
        [
          {
            model: entry,
          },
          "date",
          "ASC",
        ],
        ["createdAt", "ASC"],
      ],
    });

    return res.status(200).send({
      data: allentries,
      opdata: opbalData,
      company: companyData,
      success: true,
      err: null,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      err,
    });
  }
};

//Access Roles : [AccAdmin, Teller]
exports.getledgerstatementbydtrange = (req, res, next) => {
  let ledgerid = req.query.ledgerid;
  let startDate = req.query.startdt;
  let endDate = req.query.enddt;

  entryitem
    .findAll({
      where: {
        ledgerid: ledgerid,
      },
      include: [
        {
          model: entry,
          where: sequelize.where(
            sequelize.fn("DATE", sequelize.col("date")), // Calls the DATE() function on the createdAt column
            {
              [Op.between]: [startDate, endDate], // Applies the BETWEEN operator to the result
            },
          ),
          require: true,
        },
      ],
      order: [[{ model: entry }, "date", "ASC"]],
      //order: [
      //[sequelize.fn('length', sequelize.col('entryslno')), 'DESC'],
      //['entryslno', 'DESC'],
      //],
    })
    .then((allentries) => {
      return res.status(200).send({
        data: allentries,
        success: true,
        err: null,
      });
    });
};

//Access Roles : [AccAdmin, Teller]
exports.getentrystatement = (req, res, next) => {
  let entryid = req.query.entryid;

  entryitem
    .findAll({
      where: {
        entryid: entryid,
      },
      order: [["entryslno", "ASC"]],
      include: [
        {
          model: entry,
          require: true,
        },
        {
          model: entryitemdoc,
          require: true,
        },
        {
          model: ledger,
          require: true,
        },
      ],
    })
    .then((allentries) => {
      return res
        .status(200)
        .send({ data: allentries, success: true, err: null });
    });
};

exports.getentrystatementbatch = (req, res, next) => {
  let entryid = req.query.entryid;
  entrybatch
    .findOne({
      where: {
        entryid: entryid,
      },
    })
    .then((batch) => {
      entrybatch
        .findAll({
          attributes: ["entryid"],
          where: {
            batchid: batch.batchid,
          },
        })
        .then((alldata) => {
          const allentryids = alldata.map((data) => data.entryid);
          entryitem
            .findAll({
              where: {
                entryid: allentryids,
              },
              order: [["entryslno", "ASC"]],
              include: [
                {
                  model: entry,
                  require: true,
                  order: [["entrynum", "ASC"]],
                  include: [
                    {
                      model: entrytype,
                      require: true,
                    },
                  ],
                },
                {
                  model: entryitemdoc,
                  require: true,
                },
                {
                  model: ledger,
                  require: true,
                },
              ],
            })
            .then((allentries) => {
              return res
                .status(200)
                .send({ data: allentries, success: true, err: null });
            });
        });
    });
};

exports.postledgerentry = async (req, res, next) => {
  try {
    let alldata = JSON.parse(req.body.alldata);
    let entry_item = [];
    let entryid = uuidv4.v4();
    let entrycnt = 0;
    let entrynumber = 0;
    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });
    entrynumber = entrycnt + 1;
    let taxcodes = await taxcode.findAll({
      where: {
        tenantid: req.body.tenantID,
      },
    });

    alldata.data.map((element, idx) => {
      let pamnt, tax, taxamnt, paidld, collectld;

      taxcodes.filter((item) => {
        if (item.id == element.taxcodeid) {
          tax = parseFloat(item.rate);
          paidld = item.paid_ledger;
          collectld = item.collection_ledger;
        }
      });

      if (tax != 0) {
        tax = tax + 1.0;

        pamnt = parseFloat(
          (parseFloat(element.amnt) / parseFloat(tax)).toFixed(2),
        );
        taxamnt = parseFloat(element.amnt) - pamnt;

        //Principal amount
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: element.ledgerid,
          amount: pamnt,
          desc: element.desc,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_sts: "0",
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });

        //Tax amount
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: alldata.taxtype == "paid" ? paidld : collectld,
          amount: taxamnt,
          desc: element.desc,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_sts: "0",
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });
      } else {
        entrycnt += 1;
        entry_item.push({
          id: uuidv4.v4(),
          entryid: entryid,
          entryslno: entrycnt,
          ledgerid: element.ledgerid,
          amount: element.amnt,
          desc: element.desc,
          transtype: element.transtype,
          taxcodeid: element.taxcodeid,
          recon_sts: "0",
          recon_dt: null,
          recon_amnt: null,
          createdby: req.body.userID,
        });
      }
    });

    const result = await sequelize.transaction(async (t) => {
      await entry.create(
        {
          id: entryid,
          tenantid: req.body.tenantID,
          entrytypeid: alldata.entrytype,
          entrynum: entrynumber,
          date: alldata.date,
          dr_total: alldata.dr_total,
          cr_total: alldata.cr_total,
          narration: alldata.narration,
          doc_path: null,
          createdby: req.body.userID,
        },
        { transaction: t },
      );

      await entryitem.bulkCreate(entry_item, { transaction: t });
    });

    return res
      .status(200)
      .send({ data: "Entry Done Successfully.", success: true, err: null });
  } catch (error) {
    return res
      .status(200)
      .send({ data: "Error in Entry System.", success: false, err: null });
  }
};

exports.posteditledgerentry = async (req, res, next) => {
  try {
    let data = JSON.parse(req.body.alldata);

    let totalcr = 0.0,
      totaldr = 0.0;

    data.map((item) => {
      if (item.transtype == "dr") {
        totaldr += parseFloat(item.drtxt);
      }
      if (item.transtype == "cr") {
        totalcr += parseFloat(item.crtxt);
      }
    });

    if (totalcr.toFixed(2) != totaldr.toFixed(2)) {
      return res.status(200).send({
        data: "Total debit amount and total credit amount not matching in Entry System.",
        success: false,
        err: null,
      });
    } else {
      data.map(async (item) => {
        await entryitem.update(
          {
            ledgerid: item.ledgerid,
            amount: item.drtxt > 0 ? item.drtxt : item.crtxt,
            desc: item.entrydesc,
            transtype: item.transtype,
          },
          { where: { id: item.entryitemid } },
        );
      });

      await entry.update(
        {
          dr_total: totaldr,
          cr_total: totalcr,
          date: moment(data[0].entrydt, "DD/MM/YYYY").format("YYYY-MM-DD"),
          narration: data.entrydesc,
        },
        { where: { id: req.body.entryid } },
      );

      return res.status(200).send({
        data: "Entry Updated Successfully.",
        success: true,
        err: null,
      });
    }
  } catch (error) {
    return res
      .status(200)
      .send({ data: "Error in Entry System.", success: false, err: null });
  }
};

exports.getreports = (req, res, next) => {
  let allcompanies;

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });

      res.status(200).render("companies/reports", {
        pageTitle: "View Reports || TVS Online Accounting System",
        pageName: "View Reports",
        msg: "",
        sts: "",
        data: {
          profile: req.body.profile,
          allmenus: req.body.allmenus,
          allcompanies: allcompanies,
        },
      });
    });
};

exports.getcoalbreport = (req, res, next) => {
  let coaid = req.query.coaid;
  let allledgersDtable = [];

  sequelize
    .query("call coalbreport($coaid);", {
      bind: { coaid: coaid },
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      for (const [key, element] of Object.entries(data[0])) {
        allledgersDtable.push({
          "Ledger Name": element.ledgername,
          "Ledger Type":
            element.ledgertype == "1"
              ? "Cash"
              : element.ledgertype == "2"
                ? "Bank"
                : "N/A",
          "Opening Date": moment(element.opbal_dt).format("DD-MM-YYYY"),
          "Opening Balance": element.opbal + " " + element.opbal_type,
          "Total Credit": element.total_cr,
          "Total Debit": element.total_dr,
          Balance: element.balance + " " + element.type,
          "Ledger Description": element.ledgerdesc,
        });
      }

      return res.status(200).send({
        data: { allledgersDtable: allledgersDtable },
        success: true,
        err: null,
      });
    });
};

exports.getmistransreport = (req, res, next) => {
  let compid = req.query.compid;

  sequelize
    .query("call mistransreport($compid);", {
      bind: { compid: compid },
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      return res.status(200).send({ data: data[0], success: true, err: null });
    });
};

exports.getpnlreport = (req, res, next) => {
  let compid = req.query.compid;
  let startdt = req.query.startdt;
  let enddt = req.query.enddt;

  sequelize
    .query("call pnlreport($compid,$startdt,$enddt);", {
      bind: { compid: compid, startdt: startdt, enddt: enddt },
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      return res.status(200).send({ data: data[0], success: true, err: null });
    });
};

exports.gettbreport = (req, res, next) => {
  let compid = req.query.compid;
  let startdt = req.query.startdt;
  let enddt = req.query.enddt;
  let nonzero = req.query.nonzero == "true" ? true : false;

  sequelize
    .query("call tbreport($compid,$startdt,$enddt,$nonzero);", {
      bind: {
        compid: compid,
        startdt: startdt,
        enddt: enddt,
        nonzero: nonzero,
      },
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      return res.status(200).send({ data: data[0], success: true, err: null });
    });
};

exports.getbsreport = (req, res, next) => {
  let compid = req.query.compid;
  let startdt = req.query.startdt;
  let enddt = req.query.enddt;

  sequelize
    .query("call bsreport($compid,$startdt,$enddt);", {
      bind: { compid: compid, startdt: startdt, enddt: enddt },
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      return res.status(200).send({ data: data[0], success: true, err: null });
    });
};

//-----------------AccAdmin Role End ----------------

//-----------------Teller Role Begin ----------------

exports.getcashbook = (req, res, next) => {
  let allcompanies;

  company
    .findAll({
      where: { tenantid: req.body.tenantID, sts: "1" },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });
      res.status(200).render("companies/cashbook", {
        pageTitle: "Cashbook || TVS Online Accounting System",
        pageName: "Cashbook",
        msg: "",
        sts: "",
        data: {
          profile: req.body.profile,
          allmenus: req.body.allmenus,
          allcompanies: allcompanies,
        },
      });
    });
};

exports.getbankrec = (req, res, next) => {
  let allcompanies,
    allledgers,
    allgrupledgers,
    bankledgers = [];

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });

      allcompanies.unshift({
        name: "Select one company",
        id: "0",
      });

      ledger
        .findAll({
          where: {
            tenantid: req.body.tenantID,
            sts: "1",
          },
          order: [["ledgername", "ASC"]],
          include: [
            {
              model: company,
              include: {
                model: companytype,
                require: true,
              },
              require: true,
            },
          ],
        })
        .then((ledgers) => {
          allledgers = ledgers.map((element) => {
            return {
              name:
                element.ledgername +
                " (" +
                element.tblcompany.legalname +
                ") (" +
                element.tblcompany.tblcompanytype.typename +
                ")",
              compname:
                element.ledgername + " (" + element.tblcompany.legalname + ")",
              id: element.id,
            };
          });

          ledgers.map((element) => {
            if (element.ledgertype == 2) {
              bankledgers.push({
                name:
                  element.ledgername +
                  " (" +
                  element.tblcompany.legalname +
                  ") (" +
                  element.tblcompany.tblcompanytype.typename +
                  ")",
                compname:
                  element.ledgername +
                  " (" +
                  element.tblcompany.legalname +
                  ")",
                id: element.id,
              });
            }
          });

          ledger
            .findAll({
              where: {
                sts: "1",
              },
              order: [
                ["ledgername", "ASC"],
                [sequelize.fn("length", sequelize.col("ledgername")), "ASC"],
              ],
              include: [
                {
                  model: acchead,
                  where: {
                    [Op.or]: [
                      { headname: { [Op.like]: "%SALE%" } },
                      { headname: { [Op.like]: "%INCOME%" } },
                    ],
                  },
                  require: true,
                },
                { model: finyear, require: true },
                { model: taxcode, where: { rate: "0.00" }, require: true },
                {
                  model: company,
                  include: {
                    model: companytype,
                    require: true,
                  },
                  require: true,
                },
              ],
            })
            .then((el) => {
              allgrupledgers = el.map((element) => {
                return {
                  name:
                    element.ledgername +
                    " (" +
                    element.tblcompany.legalname +
                    ") (" +
                    element.tblcompany.tblcompanytype.typename +
                    ")",
                  ledgroupname:
                    element.ledgername +
                    " (" +
                    element.tblcompany.legalname +
                    ")",
                  compname:
                    element.ledgername +
                    " (" +
                    element.tblcompany.legalname +
                    ")",
                  id: element.id,
                };
              });

              res.status(200).render("companies/bankrec", {
                pageTitle: "Manage Bank-IN || TVS Online Accounting System",
                pageName: "Bank-IN",
                msg: "",
                sts: "",
                data: {
                  profile: req.body.profile,
                  allmenus: req.body.allmenus,
                  allcompanies: allcompanies,
                  allledgers: allledgers,
                  allgrupledgers: allgrupledgers,
                  bankledgers: bankledgers,
                },
              });
            });
        });
    });
};

exports.postviewbankdebitdata = (req, res, next) => {
  let ledgerid, startdt, enddt;

  ledgerid = req.body.ledgerid;
  startdt = req.body.startdt;
  enddt = req.body.enddt;

  bankstatement
    .findAll({
      where: {
        ledgerid: ledgerid,
        transdate: { [Op.between]: [startdt, enddt] },
        type: "Debit",
        realized: 0,
      },
      include: [{ model: ledger, require: true }],
      order: [
        [fn("length", col("entrynumber")), "ASC"],
        ["entrynumber", "ASC"],
      ],
    })
    .then((items) => {
      if (items.length == 0) {
        return res.status(200).send({
          data: "No record found for the selected day(s).",
          success: false,
          err: null,
        });
      } else {
        let allvalues = [];

        items.map((item) => {
          allvalues.push({
            TransactionID: item.dataValues.id,
            LedgerID: item.dataValues.ledgerid,
            TaxcodeID: item.dataValues.tblledger.tax_code,
            EntryID: item.dataValues.entrynumber,
            Account: item.dataValues.tblledger.ledgername,
            Balance: item.dataValues.balance,
            Debit: item.dataValues.amount,
            Date: item.dataValues.transdate,
            Description: item.dataValues.transdesc,
            Realized: item.dataValues.realized,
          });
        });

        return res
          .status(200)
          .send({ data: allvalues, success: true, err: null });
      }
    });
};

exports.postviewbankcreditdata = (req, res, next) => {
  let ledgerid, startdt, enddt;

  ledgerid = req.body.ledgerid;
  startdt = req.body.startdt;
  enddt = req.body.enddt;

  bankstatement
    .findAll({
      where: {
        ledgerid: ledgerid,
        transdate: { [Op.between]: [startdt, enddt] },
        type: "Credit",
        realized: 0,
      },
      include: [{ model: ledger, require: true }],
      order: [
        [fn("length", col("entrynumber")), "ASC"],
        ["entrynumber", "ASC"],
      ],
    })
    .then((items) => {
      if (items.length == 0) {
        return res.status(200).send({
          data: "No record found for the selected day(s).",
          success: false,
          err: null,
        });
      } else {
        let allvalues = [];

        items.map((item) => {
          allvalues.push({
            TransactionID: item.dataValues.id,
            LedgerID: item.dataValues.ledgerid,
            TaxcodeID: item.dataValues.tblledger.tax_code,
            EntryID: item.dataValues.entrynumber,
            Account: item.dataValues.tblledger.ledgername,
            Balance: item.dataValues.balance,
            Credit: item.dataValues.amount,
            Date: item.dataValues.transdate,
            Description: item.dataValues.transdesc,
            Realized: item.dataValues.realized,
          });
        });

        return res
          .status(200)
          .send({ data: allvalues, success: true, err: null });
      }
    });
};

exports.postchkledgersdata = (req, res, next) => {
  let data = JSON.parse(req.body.result);
  let net = parseFloat(req.body.net);
  let total = 0.0;
  let tablerows =
    '<table id="tblbulkledgers" class="table table-bordered"><thead><th>Ledger Name</th><th>Purpose</th><th>A/C Description</th><th>Amount</th></thead><tbody id="tblbulkledgersbody">';
  if (data.length > 0) {
    ledger
      .findAll({
        where: {
          sts: "1",
        },
        order: [
          ["ledgername", "ASC"],
          [sequelize.fn("length", sequelize.col("ledgername")), "ASC"],
        ],
        include: [
          {
            model: acchead,
            where: {
              [Op.or]: [
                { headname: { [Op.like]: "%SALE%" } },
                { headname: { [Op.like]: "%INCOME%" } },
              ],
            },
            require: true,
          },
          { model: finyear, require: true },
          { model: taxcode, where: { rate: "0.00" }, require: true },
          {
            model: company,
            include: {
              model: companytype,
              require: true,
            },
            require: true,
          },
        ],
      })
      .then((el) => {
        let ddl = '<select class="form-control select2 ddlmaxwidth">';
        el.map((element) => {
          ddl +=
            "<option value=" +
            element.id +
            ">" +
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ")" +
            "</option>";
        });
        ddl += "</select>";

        ledger
          .findAll({
            where: {
              tenantid: req.body.tenantID,
              sts: "1",
            },
          })
          .then((allledgers) => {
            data.map((item) => {
              let val = allledgers.find((x) =>
                x.ledgername
                  .toUpperCase()
                  .includes(item.ledger.toString().toUpperCase()),
              );

              if (val) {
                tablerows +=
                  '<tr class="rowcorrect"><td><input type="hidden" value=' +
                  val.id +
                  ' /><input type="hidden" value=' +
                  val.tax_code +
                  " />" +
                  val.ledgername.toUpperCase() +
                  "</td><td>" +
                  ddl +
                  '</td><td><input type="text" class="form-control" value="' +
                  item.description +
                  '"/></td><td class="text-right">' +
                  item.amount +
                  "</td></tr>";
                total += parseFloat(item.amount);
              } else {
                tablerows +=
                  '<tr class="rowwrong"><td>' +
                  item.ledger.toString().toUpperCase() +
                  "</td><td>N/A</td><td>" +
                  item.description +
                  '</td><td class="text-right">' +
                  item.amount +
                  "</td></tr>";
              }
            });
            if (total.toFixed(2) === net.toFixed(2)) {
              tablerows +=
                '</tbody><tfoot><tr class="rowcorrect"><th colspan="3" class="text-right">Total</th><th class="text-right">' +
                total.toFixed(2) +
                '</th></tr><tr><th colspan="4" class="text-right"><div class="row"><div class="offset-11 col-sm-1"><button type="button" id="btnrealizebulk" class="btn btn-block btn-primary">Realize</button></div></div></th></tr></tfoot>';
            } else {
              tablerows +=
                '</tbody><tfoot><tr class="rowwrong"><th colspan="3" class="text-right">Total not matching</th><th class="text-right">' +
                total.toFixed(2) +
                "</th></tr></tfoot>";
            }
            tablerows += "</table>";
            return res.status(200).send({
              data: { tablerows: tablerows },
              success: true,
              err: null,
            });
          });
      });
  } else {
    return res
      .status(200)
      .send({ data: { msg: "Error!" }, success: false, err: null });
  }
};

exports.postchkledgerspaydata = (req, res, next) => {
  let data = JSON.parse(req.body.result);
  let net = parseFloat(req.body.net);
  let total = 0.0;
  let tablerows =
    '<table id="tblbulkledgers" class="table table-bordered"><thead><th>Ledger Name</th><th>Purpose</th><th>A/C Description</th><th>Amount</th></thead><tbody id="tblbulkledgersbody">';
  if (data.length > 0) {
    ledger
      .findAll({
        where: {
          sts: "1",
        },
        order: [
          ["ledgername", "ASC"],
          [sequelize.fn("length", sequelize.col("ledgername")), "ASC"],
        ],
        include: [
          {
            model: acchead,
            where: {
              [Op.or]: [
                { headname: { [Op.like]: "%EXPENSE%" } },
                { headname: { [Op.like]: "%COST%" } },
                { headname: { [Op.like]: "%ASSET%" } },
              ],
            },
            require: true,
          },
          { model: finyear, require: true },
          { model: taxcode, where: { rate: "0.00" }, require: true },
          {
            model: company,
            include: {
              model: companytype,
              require: true,
            },
            require: true,
          },
        ],
      })
      .then((el) => {
        let ddl = '<select class="form-control select2 ddlmaxwidth">';
        el.map((element) => {
          ddl +=
            "<option value=" +
            element.id +
            ">" +
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ")" +
            "</option>";
        });
        ddl += "</select>";

        ledger
          .findAll({
            where: {
              tenantid: req.body.tenantID,
              sts: "1",
            },
          })
          .then((allledgers) => {
            data.map((item) => {
              let val = allledgers.find((x) =>
                x.ledgername
                  .toUpperCase()
                  .includes(item.ledger.toString().toUpperCase()),
              );

              if (val) {
                tablerows +=
                  '<tr class="rowcorrect"><td><input type="hidden" value=' +
                  val.id +
                  ' /><input type="hidden" value=' +
                  val.tax_code +
                  " />" +
                  val.ledgername.toUpperCase() +
                  "</td><td>" +
                  ddl +
                  '</td><td><input type="text" class="form-control" value="' +
                  item.description +
                  '"/></td><td class="text-right">' +
                  item.amount +
                  "</td></tr>";
                total += parseFloat(item.amount);
              } else {
                tablerows +=
                  '<tr class="rowwrong"><td>' +
                  item.ledger.toString().toUpperCase() +
                  "</td><td>N/A</td><td>" +
                  item.description +
                  '</td><td class="text-right">' +
                  item.amount +
                  "</td></tr>";
              }
            });
            if (total.toFixed(2) === net.toFixed(2)) {
              tablerows +=
                '</tbody><tfoot><tr class="rowcorrect"><th colspan="3" class="text-right">Total</th><th class="text-right">' +
                total.toFixed(2) +
                '</th></tr><tr><th colspan="4" class="text-right"><div class="row"><div class="offset-11 col-sm-1"><button type="button" id="btnrealizebulk" class="btn btn-block btn-primary">Realize</button></div></div></th></tr></tfoot>';
            } else {
              tablerows +=
                '</tbody><tfoot><tr class="rowwrong"><th colspan="3" class="text-right">Total not matching</th><th class="text-right">' +
                total.toFixed(2) +
                "</th></tr></tfoot>";
            }
            tablerows += "</table>";
            return res.status(200).send({
              data: { tablerows: tablerows },
              success: true,
              err: null,
            });
          });
      });
  } else {
    return res
      .status(200)
      .send({ data: { msg: "Error!" }, success: false, err: null });
  }
};

exports.postbnkrealize = async (req, res, next) => {
  try {
    let alldata = JSON.parse(req.body.alldata);

    //let transdt = moment(new Date()).format();
    let transdt = alldata.date;

    let entrycnt = 0;
    let entrynumber = 0;

    let entrybatchid = uuidv4.v4();

    let bnkentry = {};
    let bankentrybatch = [];
    let bnkentryitemdoc = [];
    let bnkentryitem = [];

    let purposeentry = [];
    let purposeentryitem_doc = [];
    let purposeentry_item = [];

    let entryid = uuidv4.v4();
    let entryitemid;

    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });
    entrynumber = entrycnt + 1;
    bnkentry = {
      id: entryid,
      tenantid: req.body.tenantID,
      entrytypeid: alldata.entrytype,
      entrynum: entrynumber,
      date: transdt,
      dr_total: alldata.dr_total,
      cr_total: alldata.cr_total,
      narration: alldata.narration,
      doc_path: null,
      createdby: req.body.userID,
    };

    bankentrybatch.push({
      id: uuidv4.v4(),
      batchid: entrybatchid,
      entryid: entryid,
      createdby: req.body.userID,
    });

    entrycnt += 1;

    bnkentryitem.push({
      id: uuidv4.v4(),
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: alldata.bnkledgerid,
      amount: alldata.bnkamnt,
      desc: alldata.narration,
      transtype: alldata.bnkentry,
      taxcodeid: alldata.bnktaxcodeid,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    entrycnt += 1;
    entryitemid = uuidv4.v4();

    bnkentryitem.push({
      id: entryitemid,
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: alldata.personalledgerid,
      amount: alldata.bnkamnt,
      desc: alldata.narration,
      transtype:
        alldata.bnkentry == "dr"
          ? "cr"
          : alldata.bnkentry == "cr"
            ? "dr"
            : "n/a",
      taxcodeid: alldata.personalledgertaxid,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    bnkentryitemdoc.push({
      id: uuidv4.v4(),
      entryitemid: entryitemid,
      ledgerid: alldata.personalledgerid,
      recvouchdocurl: alldata.recvouchdocurl,
      supportdocurl: alldata.supportdocurl,
      createdby: req.body.userID,
    });

    alldata.data.map((element, idx) => {
      let purposeentryid = uuidv4.v4();
      entrynumber += 1;
      purposeentry.push({
        id: purposeentryid,
        tenantid: req.body.tenantID,
        entrytypeid: "62c2add7-a08f-11ee-bf16-a27c837ebb62",
        entrynum: entrynumber,
        date: transdt,
        dr_total: element.amnt,
        cr_total: element.amnt,
        narration: element.desc,
        doc_path: null,
        createdby: req.body.userID,
      });

      bankentrybatch.push({
        id: uuidv4.v4(),
        batchid: entrybatchid,
        entryid: purposeentryid,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: alldata.personalledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype: alldata.bnkentry,
        taxcodeid: alldata.personalledgertaxid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: alldata.personalledgerid,
        recvouchdocurl: alldata.recvouchdocurl,
        supportdocurl: alldata.supportdocurl,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: element.ledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype: element.transtype,
        taxcodeid: element.taxcodeid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: element.ledgerid,
        recvouchdocurl: alldata.recvouchdocurl,
        supportdocurl: alldata.supportdocurl,
        createdby: req.body.userID,
      });
    });

    const result = await sequelize.transaction(async (t) => {
      await entry.create(bnkentry, { transaction: t });

      await entryitem.bulkCreate(bnkentryitem, { transaction: t });

      await entryitemdoc.bulkCreate(bnkentryitemdoc, { transaction: t });

      await entry.bulkCreate(purposeentry, { transaction: t });

      await entryitem.bulkCreate(purposeentry_item, { transaction: t });

      await entryitemdoc.bulkCreate(purposeentryitem_doc, { transaction: t });

      await entrybatch.bulkCreate(bankentrybatch, { transaction: t });

      await bankstatement.update(
        { realized: true, realizedentryid: entryid },
        { where: { id: alldata.transid }, transaction: t },
      );
    });

    return res.status(200).send({
      data: "Realization Done Successfully.",
      success: true,
      err: null,
    });
  } catch (error) {
    return res.status(200).send({
      data: "Error in Realization System.",
      success: false,
      err: null,
    });
  }
};

exports.postrealizebulk = async (req, res, next) => {
  let ledgerdata = JSON.parse(req.body.alldata);

  //let transdt = moment(new Date()).format();
  let transdt = req.body.date;

  let entrytype =
    req.body.transtype === "Debit"
      ? "623610ff-a08f-11ee-bf16-a27c837ebb62"
      : req.body.transtype === "Credit"
        ? "62650a09-a08f-11ee-bf16-a27c837ebb62"
        : "N/A";

  tax = await taxcode.findOne({
    where: {
      id: req.body.taxcode,
    },
  });

  if (parseFloat(tax.rate) === 0.0) {
    let entrycnt = 0;

    let entrynumber = 0;
    let entrybatchid = uuidv4.v4();

    let bnkentry = {};
    let bankentrybatch = [];
    let bnkentryitemdoc = [];
    let bnkentry_item = [];

    let purposeentry = [];
    let purposeentryitem_doc = [];
    let purposeentry_item = [];

    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });
    entrynumber = entrycnt + 1;
    let entryid = uuidv4.v4();
    let entryitemid;

    bnkentry = {
      id: entryid,
      tenantid: req.body.tenantID,
      entrytypeid: entrytype,
      entrynum: entrynumber,
      date: transdt,
      dr_total: parseFloat(req.body.bnkamnt),
      cr_total: parseFloat(req.body.bnkamnt),
      narration: req.body.bnkdesc,
      doc_path: null,
      createdby: req.body.userID,
    };

    bankentrybatch.push({
      id: uuidv4.v4(),
      batchid: entrybatchid,
      entryid: entryid,
      createdby: req.body.userID,
    });

    entrycnt += 1;

    bnkentry_item.push({
      id: uuidv4.v4(),
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: req.body.bnkledgerid,
      amount: parseFloat(req.body.bnkamnt),
      desc: req.body.bnkdesc,
      transtype:
        req.body.transtype === "Debit"
          ? "dr"
          : req.body.transtype === "Credit"
            ? "cr"
            : "N/A",
      taxcodeid: req.body.taxcode,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    ledgerdata.map((element, idx) => {
      entrycnt += 1;
      entryitemid = uuidv4.v4();

      bnkentry_item.push({
        id: entryitemid,
        entryid: entryid,
        entryslno: entrycnt,
        ledgerid: element.ledgerid,
        amount: element.amnt,
        desc: req.body.bnkdesc,
        transtype:
          req.body.transtype === "Debit"
            ? "cr"
            : req.body.transtype === "Credit"
              ? "dr"
              : "N/A",
        taxcodeid: element.taxcodeid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      bnkentryitemdoc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: element.ledgerid,
        recvouchdocurl: req.body.recvouchdocurl,
        supportdocurl: req.body.supportdocurl,
        createdby: req.body.userID,
      });
    });

    ledgerdata.map((element) => {
      let purposeentryid = uuidv4.v4();
      entrynumber += 1;
      purposeentry.push({
        id: purposeentryid,
        tenantid: req.body.tenantID,
        entrytypeid: "62c2add7-a08f-11ee-bf16-a27c837ebb62",
        entrynum: entrynumber,
        date: transdt,
        dr_total: parseFloat(element.amnt),
        cr_total: parseFloat(element.amnt),
        narration: element.desc,
        doc_path: null,
        createdby: req.body.userID,
      });

      bankentrybatch.push({
        id: uuidv4.v4(),
        batchid: entrybatchid,
        entryid: purposeentryid,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: element.ledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype:
          req.body.transtype === "Debit"
            ? "dr"
            : req.body.transtype === "Credit"
              ? "cr"
              : "N/A",
        taxcodeid: element.taxcodeid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: element.ledgerid,
        recvouchdocurl: req.body.recvouchdocurl,
        supportdocurl: req.body.supportdocurl,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        ledgerid: element.purposeledgerid,
        entryslno: entrycnt,
        amount: element.amnt,
        desc: element.desc,
        transtype:
          req.body.transtype === "Debit"
            ? "cr"
            : req.body.transtype === "Credit"
              ? "dr"
              : "N/A",
        taxcodeid: element.taxcodeid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: element.purposeledgerid,
        recvouchdocurl: req.body.recvouchdocurl,
        supportdocurl: req.body.supportdocurl,
        createdby: req.body.userID,
      });
    });

    try {
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        },
        async (t) => {
          await entry.create(bnkentry, { transaction: t });

          await entryitem.bulkCreate(bnkentry_item, { transaction: t });

          await entryitemdoc.bulkCreate(bnkentryitemdoc, { transaction: t });

          await entry.bulkCreate(purposeentry, { transaction: t });

          await entryitem.bulkCreate(purposeentry_item, { transaction: t });

          await entryitemdoc.bulkCreate(purposeentryitem_doc, {
            transaction: t,
          });

          await entrybatch.bulkCreate(bankentrybatch, { transaction: t });

          await bankstatement.update(
            { realized: true, realizedentryid: entryid },
            {
              where: { id: req.body.transid },
              transaction: t,
            },
          );
        },
      );

      return res
        .status(200)
        .send({ data: "Entry Done Successfully.", success: true, err: null });
    } catch (ex) {
      return res.status(200).send({
        data: "Error Occured. Please Inform Technical Team.",
        success: false,
        err: null,
      });
    }
  }
};

exports.postcombinerealize = async (req, res, next) => {
  try {
    let alldata = JSON.parse(req.body.alldata);

    let transdt = alldata.date;

    let entrycnt = 0;
    let entrynumber = 0;

    let bnkentry = {};
    let bankentrybatch = [];
    let bnkentryitemdoc = [];
    let bnkentryitem = [];

    let purposeentry = [];
    let purposeentryitem_doc = [];
    let purposeentry_item = [];

    let totalnarration = "";

    let entryid = uuidv4.v4();

    let entrybatchid = uuidv4.v4();

    let entryitemid;

    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });
    entrynumber = entrycnt + 1;
    bnkentry = {
      id: entryid,
      tenantid: req.body.tenantID,
      entrytypeid: alldata.entrytype,
      entrynum: entrynumber,
      date: transdt,
      dr_total: alldata.dr_total,
      cr_total: alldata.cr_total,
      narration: alldata.bnknarration,
      doc_path: null,
      createdby: req.body.userID,
    };

    bankentrybatch.push({
      id: uuidv4.v4(),
      batchid: entrybatchid,
      entryid: entryid,
      createdby: req.body.userID,
    });

    entrycnt += 1;

    alldata.data.map((elem, idx) => {
      if (idx == 0) {
        totalnarration += elem.desc;
      } else {
        totalnarration += " + " + elem.desc;
      }
    });

    bnkentryitem.push({
      id: uuidv4.v4(),
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: alldata.bnkledgerid,
      amount: alldata.bnkamnt,
      desc: totalnarration,
      transtype: alldata.bnkentry,
      taxcodeid: alldata.bnktaxcodeid,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    alldata.data.map((ele, idx) => {
      entrycnt += 1;
      entryitemid = uuidv4.v4();

      bnkentryitem.push({
        id: entryitemid,
        entryid: entryid,
        entryslno: entrycnt,
        ledgerid: ele.personalledgerid,
        amount: ele.amnt,
        desc: ele.desc,
        transtype:
          alldata.bnkentry == "dr"
            ? "cr"
            : alldata.bnkentry == "cr"
              ? "dr"
              : "n/a",
        taxcodeid: ele.personaltaxcode,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      bnkentryitemdoc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: ele.personalledgerid,
        recvouchdocurl: ele.payvouchercombineurl,
        supportdocurl: ele.supportingdoccombineurl,
        createdby: req.body.userID,
      });
    });

    alldata.data.map((element, idx) => {
      let purposeentryid = uuidv4.v4();
      entrynumber += 1;
      purposeentry.push({
        id: purposeentryid,
        tenantid: req.body.tenantID,
        entrytypeid: "62c2add7-a08f-11ee-bf16-a27c837ebb62",
        entrynum: entrynumber,
        date: transdt,
        dr_total: element.amnt,
        cr_total: element.amnt,
        narration: element.desc,
        doc_path: null,
        createdby: req.body.userID,
      });

      bankentrybatch.push({
        id: uuidv4.v4(),
        batchid: entrybatchid,
        entryid: purposeentryid,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: element.personalledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype: alldata.bnkentry,
        taxcodeid: element.personaltaxcode,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: element.personalledgerid,
        recvouchdocurl: element.payvouchercombineurl,
        supportdocurl: element.supportingdoccombineurl,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: element.purposeledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype:
          alldata.bnkentry == "dr"
            ? "cr"
            : alldata.bnkentry == "cr"
              ? "dr"
              : "n/a",
        taxcodeid: element.personaltaxcode,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: element.purposeledgerid,
        recvouchdocurl: element.payvouchercombineurl,
        supportdocurl: element.supportingdoccombineurl,
        createdby: req.body.userID,
      });
    });

    const result = await sequelize.transaction(async (t) => {
      await entry.create(bnkentry, { transaction: t });

      await entryitem.bulkCreate(bnkentryitem, { transaction: t });

      await entryitemdoc.bulkCreate(bnkentryitemdoc, { transaction: t });

      await entry.bulkCreate(purposeentry, { transaction: t });

      await entryitem.bulkCreate(purposeentry_item, { transaction: t });

      await entryitemdoc.bulkCreate(purposeentryitem_doc, { transaction: t });

      await entrybatch.bulkCreate(bankentrybatch, { transaction: t });

      await bankstatement.update(
        { realized: true, realizedentryid: entryid },
        { where: { id: alldata.transid }, transaction: t },
      );
    });

    return res.status(200).send({
      data: "Realization Done Successfully.",
      success: true,
      err: null,
    });
  } catch (error) {
    return res.status(200).send({
      data: "Error in Realization System.",
      success: false,
      err: null,
    });
  }
};

exports.getcashrec = (req, res, next) => {
  let allcompanies, allledgers, cashledgers;

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });

      ledger
        .findAll({
          where: {
            tenantid: req.body.tenantID,
          },
          order: [["ledgername", "ASC"]],
          include: [
            {
              model: company,
              include: {
                model: companytype,
                require: true,
              },
              require: true,
            },
          ],
        })
        .then((ledgers) => {
          allledgers = ledgers.map((element) => {
            return {
              name:
                element.ledgername +
                " (" +
                element.tblcompany.legalname +
                ") (" +
                element.tblcompany.tblcompanytype.typename +
                ")",
              compname:
                element.ledgername + " (" + element.tblcompany.legalname + ")",
              id: element.id,
            };
          });

          cashledgers = ledgers.filter((element) => {
            if (element.ledgertype == "1") {
              element.dataValues.name =
                element.dataValues.ledgername +
                " (" +
                element.dataValues.tblcompany.legalname +
                ") (" +
                element.dataValues.tblcompany.tblcompanytype.typename +
                ")";
              element.dataValues.compname =
                element.dataValues.ledgername +
                " (" +
                element.dataValues.tblcompany.legalname +
                ")";
              return element.dataValues;
            }
          });

          res.status(200).render("companies/cashrec", {
            pageTitle: "Cash-IN || TVS Online Accounting System",
            pageName: "Cash-IN",
            msg: "",
            sts: "",
            data: {
              profile: req.body.profile,
              allmenus: req.body.allmenus,
              allcompanies: allcompanies,
              allledgers: allledgers,
              cashledgers: cashledgers,
            },
          });
        });
    });
};

exports.postcashrecentry = async (req, res, next) => {
  try {
    let alldata = JSON.parse(req.body.alldata);
    const voucher = alldata.narration.split("||")[1]?.trim();
    const existvoucher = await sequelize.query(
      `SELECT * FROM tblentries WHERE TRIM(SUBSTRING_INDEX( narration,'||',-1)) = :voucher LIMIT 1`,
      {
        replacements: { voucher },
        type: sequelize.QueryTypes.SELECT,
      },
    );

    if (existvoucher.length) {
      return res.status(200).send({
        data: "This voucher number already exists.",
        success: false,
        err: null,
      });
    }
    const entrydocurl = await entryitemdoc.findOne({
      where: {
        [Op.or]: [
          {
            recvouchdocurl: {
              [Op.like]: `%${alldata.recvouchdocurl}%`,
            },
          },
          {
            supportdocurl: {
              [Op.like]: `%${alldata.supportdocurl}%`,
            },
          },
        ],
      },
    });

    if (entrydocurl) {
      let duplicate = "";

      if (entrydocurl.recvouchdocurl === alldata.recvouchdocurl) {
        duplicate = "Receive Voucher Document URL";
      }

      if (entrydocurl.supportdocurl === alldata.supportdocurl) {
        duplicate = duplicate
          ? duplicate + " and Support Document URL"
          : "Support Document URL";
      }

      return res.status(200).send({
        data: `${duplicate} already exists.`,
        success: false,
        err: null,
      });
    }

    let transdt = alldata.date;

    let entrycnt = 0;
    let entrynumber = 0;

    let entrybatchid = uuidv4.v4();

    let cashentry = {};
    let cashentrybatch = [];
    let cashentryitemdoc = [];
    let cashentryitem = [];

    let purposeentry = [];
    let purposeentryitem_doc = [];
    let purposeentry_item = [];

    let entryid = uuidv4.v4();
    let entryitemid;

    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });


    entrynumber = entrycnt + 1;

    
    cashentry = {
      id: entryid,
      tenantid: req.body.tenantID,
      entrytypeid: alldata.entrytype,
      entrynum: entrynumber,
      date: transdt,
      dr_total: alldata.dr_total,
      cr_total: alldata.cr_total,
      narration: alldata.narration,
      doc_path: null,
      createdby: req.body.userID,
    };

    cashentrybatch.push({
      id: uuidv4.v4(),
      batchid: entrybatchid,
      entryid: entryid,
      createdby: req.body.userID,
    });

    entrycnt += 1;

    cashentryitem.push({
      id: uuidv4.v4(),
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: alldata.cashledgerid,
      amount: alldata.cashamnt,
      desc: alldata.narration,
      transtype: alldata.cashentry,
      taxcodeid: alldata.cashtaxcodeid,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    entrycnt += 1;
    entryitemid = uuidv4.v4();

    cashentryitem.push({
      id: entryitemid,
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: alldata.personalledgerid,
      amount: alldata.cashamnt,
      desc: alldata.narration,
      transtype:
        alldata.cashentry == "dr"
          ? "cr"
          : alldata.cashentry == "cr"
            ? "dr"
            : "n/a",
      taxcodeid: alldata.personalledgertaxid,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    cashentryitemdoc.push({
      id: uuidv4.v4(),
      entryitemid: entryitemid,
      ledgerid: alldata.personalledgerid,
      recvouchdocurl: alldata.recvouchdocurl,
      supportdocurl: alldata.supportdocurl,
      createdby: req.body.userID,
    });

    alldata.data.map((element, idx) => {
      let purposeentryid = uuidv4.v4();
      entrynumber += 1;
      purposeentry.push({
        id: purposeentryid,
        tenantid: req.body.tenantID,
        entrytypeid: "62c2add7-a08f-11ee-bf16-a27c837ebb62",
        entrynum: entrynumber,
        date: transdt,
        dr_total: element.amnt,
        cr_total: element.amnt,
        narration: element.desc,
        doc_path: null,
        createdby: req.body.userID,
      });

      cashentrybatch.push({
        id: uuidv4.v4(),
        batchid: entrybatchid,
        entryid: purposeentryid,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: alldata.personalledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype: alldata.cashentry,
        taxcodeid: alldata.personalledgertaxid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: alldata.personalledgerid,
        recvouchdocurl: alldata.recvouchdocurl,
        supportdocurl: alldata.supportdocurl,
        createdby: req.body.userID,
      });

      entrycnt += 1;
      entryitemid = uuidv4.v4();

      purposeentry_item.push({
        id: entryitemid,
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: element.ledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype: element.transtype,
        taxcodeid: element.taxcodeid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      purposeentryitem_doc.push({
        id: uuidv4.v4(),
        entryitemid: entryitemid,
        ledgerid: element.ledgerid,
        recvouchdocurl: alldata.recvouchdocurl,
        supportdocurl: alldata.supportdocurl,
        createdby: req.body.userID,
      });
    });

    const result = await sequelize.transaction(async (t) => {
      await entry.create(cashentry, { transaction: t });

      await entryitem.bulkCreate(cashentryitem, { transaction: t });

      await entryitemdoc.bulkCreate(cashentryitemdoc, { transaction: t });

      await entry.bulkCreate(purposeentry, { transaction: t });

      await entryitem.bulkCreate(purposeentry_item, { transaction: t });

      await entryitemdoc.bulkCreate(purposeentryitem_doc, { transaction: t });

      await entrybatch.bulkCreate(cashentrybatch, { transaction: t });
    });

    return res.status(200).send({
      data: "Realization Done Successfully.",
      success: true,
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      data: "Error in Realization System.",
      success: false,
      err: null,
    });
  }
};

exports.getbankpay = (req, res, next) => {
  let allcompanies,
    allledgers,
    allgrupledgers,
    bankledgers = [];

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });

      allcompanies.unshift({
        name: "Select one company",
        id: "0",
      });

      res.status(200).render("companies/bankpay", {
        pageTitle: "Manage Bank-OUT || TVS Online Accounting System",
        pageName: "Bank-OUT",
        msg: "",
        sts: "",
        data: {
          profile: req.body.profile,
          allmenus: req.body.allmenus,
          allcompanies: allcompanies,
        },
      });
    });
};

exports.getbankpayallledgers = (req, res, next) => {
  let allledgers,
    allgrupledgers,
    bankledgers = [];

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
        companyid: req.query.compid,
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname:
            element.ledgername + " (" + element.tblcompany.legalname + ")",
          id: element.id,
        };
      });

      ledgers.map((element) => {
        if (element.ledgertype == 2) {
          bankledgers.push({
            name:
              element.ledgername +
              " (" +
              element.tblcompany.legalname +
              ") (" +
              element.tblcompany.tblcompanytype.typename +
              ")",
            compname: element.ledgername,
            id: element.id,
          });
        }
      });

      ledger
        .findAll({
          where: {
            tenantid: req.body.tenantID,
            sts: "1",
            companyid: req.query.compid,
          },
          order: [
            ["ledgername", "ASC"],
            [sequelize.fn("length", sequelize.col("ledgername")), "ASC"],
          ],
          include: [
            {
              model: acchead,
              where: {
                [Op.or]: [
                  { headname: { [Op.like]: "%EXPENSE%" } },
                  { headname: { [Op.like]: "%COST%" } },
                  { headname: { [Op.like]: "%ASSET%" } },
                ],
              },
              require: true,
            },
            { model: finyear, require: true },
            { model: taxcode, where: { rate: "0.00" }, require: true },
            {
              model: company,
              include: {
                model: companytype,
                require: true,
              },
              require: true,
            },
          ],
        })
        .then((el) => {
          allgrupledgers = el.map((element) => {
            return {
              name:
                element.ledgername +
                " (" +
                element.tblcompany.legalname +
                ") (" +
                element.tblcompany.tblcompanytype.typename +
                ")",
              ledgroupname: element.ledgername,
              compname:
                element.ledgername + " (" + element.tblcompany.legalname + ")",
              id: element.id,
            };
          });

          return res.status(200).send({
            data: {
              allledgers: allledgers,
              allgrupledgers: allgrupledgers,
              bankledgers: bankledgers,
            },
            success: true,
            err: null,
          });
        });
    });
};

exports.getbankrecallledgers = (req, res, next) => {
  let allledgers,
    allgrupledgers,
    bankledgers = [];

  ledger
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
        companyid: req.query.compid,
      },
      order: [["ledgername", "ASC"]],
      include: [
        {
          model: company,
          include: {
            model: companytype,
            require: true,
          },
          require: true,
        },
      ],
    })
    .then((ledgers) => {
      allledgers = ledgers.map((element) => {
        return {
          name:
            element.ledgername +
            " (" +
            element.tblcompany.legalname +
            ") (" +
            element.tblcompany.tblcompanytype.typename +
            ")",
          compname:
            element.ledgername + " (" + element.tblcompany.legalname + ")",
          id: element.id,
        };
      });

      ledgers.map((element) => {
        if (element.ledgertype == 2) {
          bankledgers.push({
            name:
              element.ledgername +
              " (" +
              element.tblcompany.legalname +
              ") (" +
              element.tblcompany.tblcompanytype.typename +
              ")",
            compname: element.ledgername,
            id: element.id,
          });
        }
      });

      ledger
        .findAll({
          where: {
            tenantid: req.body.tenantID,
            sts: "1",
            companyid: req.query.compid,
          },
          order: [
            ["ledgername", "ASC"],
            [sequelize.fn("length", sequelize.col("ledgername")), "ASC"],
          ],
          include: [
            {
              model: acchead,
              where: {
                [Op.or]: [
                  { headname: { [Op.like]: "%INCOME%" } },
                  { headname: { [Op.like]: "%SALE%" } },
                ],
              },
              require: true,
            },
            { model: finyear, require: true },
            { model: taxcode, where: { rate: "0.00" }, require: true },
            {
              model: company,
              include: {
                model: companytype,
                require: true,
              },
              require: true,
            },
          ],
        })
        .then((el) => {
          allgrupledgers = el.map((element) => {
            return {
              name:
                element.ledgername +
                " (" +
                element.tblcompany.legalname +
                ") (" +
                element.tblcompany.tblcompanytype.typename +
                ")",
              ledgroupname: element.ledgername,
              compname:
                element.ledgername + " (" + element.tblcompany.legalname + ")",
              id: element.id,
            };
          });

          return res.status(200).send({
            data: {
              allledgers: allledgers,
              allgrupledgers: allgrupledgers,
              bankledgers: bankledgers,
            },
            success: true,
            err: null,
          });
        });
    });
};

exports.getcashpay = (req, res, next) => {
  let allcompanies, allledgers, cashledgers;

  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: "1",
      },
      order: [["legalname", "ASC"]],
      include: [{ model: companytype, require: true }],
    })
    .then((allcomps) => {
      allcompanies = allcomps.map((element) => {
        return {
          name:
            element.legalname + " (" + element.tblcompanytype.typename + ")",
          id: element.id,
        };
      });

      ledger
        .findAll({
          where: {
            tenantid: req.body.tenantID,
          },
          order: [["ledgername", "ASC"]],
          include: [
            {
              model: company,
              include: {
                model: companytype,
                require: true,
              },
              require: true,
            },
          ],
        })
        .then((ledgers) => {
          allledgers = ledgers.map((element) => {
            return {
              name:
                element.ledgername +
                " (" +
                element.tblcompany.legalname +
                ") (" +
                element.tblcompany.tblcompanytype.typename +
                ")",
              compname:
                element.ledgername + " (" + element.tblcompany.legalname + ")",
              id: element.id,
            };
          });

          cashledgers = ledgers.filter((element) => {
            if (element.ledgertype == "1") {
              element.dataValues.name =
                element.dataValues.ledgername +
                " (" +
                element.dataValues.tblcompany.legalname +
                ") (" +
                element.dataValues.tblcompany.tblcompanytype.typename +
                ")";
              element.dataValues.compname =
                element.dataValues.ledgername +
                " (" +
                element.dataValues.tblcompany.legalname +
                ")";
              return element.dataValues;
            }
          });

          res.status(200).render("companies/cashpay", {
            pageTitle: "Cash-OUT || TVS Online Accounting System",
            pageName: "Cash-OUT",
            msg: "",
            sts: "",
            data: {
              profile: req.body.profile,
              allmenus: req.body.allmenus,
              allcompanies: allcompanies,
              allledgers: allledgers,
              cashledgers: cashledgers,
            },
          });
        });
    });
};

exports.postcashpayentry = async (req, res, next) => {
  try {
    let alldata = JSON.parse(req.body.alldata);
    let entrycnt = 0;
    let cashentry = {};
    let entrybatchid = uuidv4.v4();
    let cashentrybatch = [];
    let cashentrydoc = {};
    let cashentry_item = [];
    let purposeentry = [];
    let purposeentry_doc = [];
    let purposeentry_item = [];

    let entryid = uuidv4.v4();

    entrycnt = await entry.count({
      where: {
        tenantid: req.body.tenantID,
      },
    });

    cashentry = {
      id: entryid,
      tenantid: req.body.tenantID,
      entrytypeid: alldata.entrytype,
      date: alldata.date,
      dr_total: alldata.dr_total,
      cr_total: alldata.cr_total,
      narration: alldata.narration,
      doc_path: null,
      createdby: req.body.userID,
    };

    cashentrybatch.push({
      id: uuidv4.v4(),
      batchid: entrybatchid,
      entryid: entryid,
      createdby: req.body.userID,
    });

    cashentrydoc = {
      id: uuidv4.v4(),
      entryid: entryid,
      recvouchdocurl: alldata.recvouchdocurl,
      supportdocurl: alldata.supportdocurl,
      createdby: req.body.userID,
    };

    entrycnt += 1;

    cashentry_item.push({
      id: uuidv4.v4(),
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: alldata.cashledgerid,
      amount: alldata.cashamnt,
      desc: alldata.narration,
      transtype: alldata.transtype,
      taxcodeid: alldata.taxcodeid,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    entrycnt += 1;

    cashentry_item.push({
      id: uuidv4.v4(),
      entryid: entryid,
      entryslno: entrycnt,
      ledgerid: alldata.personalledgerid,
      amount: alldata.cashamnt,
      desc: alldata.narration,
      transtype:
        alldata.transtype == "cr"
          ? "dr"
          : alldata.transtype == "dr"
            ? "cr"
            : "n/a",
      taxcodeid: alldata.taxcodeid,
      recon_sts: "0",
      recon_dt: null,
      recon_amnt: null,
      createdby: req.body.userID,
    });

    alldata.data.map((element, idx) => {
      let purposeentryid = uuidv4.v4();

      purposeentry.push({
        id: purposeentryid,
        tenantid: req.body.tenantID,
        entrytypeid: "62c2add7-a08f-11ee-bf16-a27c837ebb62",
        date: alldata.date,
        dr_total: element.amnt,
        cr_total: element.amnt,
        narration: element.desc,
        doc_path: null,
        createdby: req.body.userID,
      });

      cashentrybatch.push({
        id: uuidv4.v4(),
        batchid: entrybatchid,
        entryid: purposeentryid,
        createdby: req.body.userID,
      });

      purposeentry_doc = {
        id: uuidv4.v4(),
        entryid: purposeentryid,
        recvouchdocurl: alldata.recvouchdocurl,
        supportdocurl: alldata.supportdocurl,
        createdby: req.body.userID,
      };

      entrycnt += 1;

      purposeentry_item.push({
        id: uuidv4.v4(),
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: alldata.personalledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype: alldata.transtype,
        taxcodeid: alldata.accledgertaxcode,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });

      entrycnt += 1;

      purposeentry_item.push({
        id: uuidv4.v4(),
        entryid: purposeentryid,
        entryslno: entrycnt,
        ledgerid: element.ledgerid,
        amount: element.amnt,
        desc: element.desc,
        transtype: element.transtype,
        taxcodeid: alldata.taxcodeid,
        recon_sts: "0",
        recon_dt: null,
        recon_amnt: null,
        createdby: req.body.userID,
      });
    });

    await sequelize.transaction(async (t) => {
      await entry.create(cashentry, { transaction: t });

      await entrydoc.create(cashentrydoc, { transaction: t });

      await entryitem.bulkCreate(cashentry_item, { transaction: t });

      await entry.bulkCreate(purposeentry, { transaction: t });

      await entrydoc.bulkCreate(purposeentry_doc, { transaction: t });

      await entryitem.bulkCreate(purposeentry_item, { transaction: t });

      await entrybatch.bulkCreate(cashentrybatch, { transaction: t });
    });

    return res
      .status(200)
      .send({ data: "Entry Done Successfully.", success: true, err: null });
  } catch (error) {
    return res
      .status(200)
      .send({ data: "Error in Entry System.", success: false, err: null });
  }
};

exports.getentrydtls = async (req, res, next) => {
  const users = await login.findAll({
    attributes: ["id", "firstname", "lastname", "username"],
  });

  res.status(200).render("companies/entrydtls", {
    pageTitle: "Entry Deatails || TVS Online Accounting System",
    pageName: "Entry Details",
    msg: "",
    sts: "",
    data: {
      profile: req.body.profile,
      allmenus: req.body.allmenus,
      allusers: users,
    },
  });
};

exports.getallentrydtls = async (req, res) => {
  try {
    const { fromdate, todate, entryby } = req.query;
    const fromDateObj = new Date(fromdate);
    fromDateObj.setHours(0, 0, 0, 0);
    const toDateObj = new Date(todate);
    toDateObj.setHours(23, 59, 59, 999);
    if (!entryby) {
      return res.status(200).send({
        data: "Entry Details by User is REQUIRED in Next Phase.",
        success: false,
        err: null,
      });
    }

    if (!fromdate || !todate || fromdate > todate) {
      return res.status(200).send({
        data: "Invalid Date Range.",
        success: false,
        err: null,
      });
    }

    const entrydata = await entrybatch.findAll({
      attributes: ["batchid"],
      include: [
        {
          model: entry,
          attributes: ["createdAt", "date"],
          required: true,
          where: {
            createdby: entryby,
            createdAt: { [Op.between]: [fromDateObj, toDateObj] },
          },
          include: [
            {
              model: entryitem,
              attributes: ["amount", "desc", "transtype"],
              required: true,
              include: [
                {
                  model: ledger,
                  as: "tblledger",
                  attributes: ["ledgername"],
                  required: true,
                  include: [
                    {
                      model: company,
                      as: "tblcompany",
                      attributes: ["legalname"],
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [
        ["batchid", "ASC"],
        [entry, entryitem, "entryslno", "ASC"],
      ],
    });

    return res.status(200).send({
      data: entrydata,
      success: true,
      err: null,
    });
  } catch (err) {
    console.error("getallentrydtls error:", err);

    return res.status(500).send({
      data: "Error in Fetching Data.",
      success: false,
      err: err.message,
    });
  }
};

//-----------------Teller Role End ----------------//
