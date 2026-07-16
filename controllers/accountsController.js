const uuidv4 = require("uuid");
const otpGenerator = require("otp-generator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require("path");
const ejs = require("ejs");
const generator = require("generate-password");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const sequelize = require("../utils/dbconnector");
const sendmail = require("../utils/mailtransport");

const login = require("../models/management/login");
const userroleconfig = require("../models/management/userroleconfig");
const company = require("../models/company/company");
const ledger = require("../models/accounts/ledger");
const country = require("../models/general/country");
const bankstatement = require("../models/accounts/bankstatement");

const encryptpass = require("../middlewares/encryptpass");
const role = require("../models/management/role");
const {
  attribute,
} = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js");
const { profile } = require("console");

exports.getlogin = (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache"); // For older browsers
  res.setHeader("Expires", "0"); // For older browsers
  res.status(200).render("accounts/login", {
    pageTitle: "TVS Online System || Login Page",
    msg: "",
    sts: "",
    data: req.body,
  });
};

exports.getcountries = (req, res, next) => {
  let allcountries;
  country
    .findAll({
      order: [["name", "ASC"]],
    })
    .then((con) => {
      allcountries = con.map((element) => {
        return {
          id: element.id,
          name: element.name,
        };
      });

      return res.status(200).send({
        data: {
          allcountries: allcountries,
        },
        success: true,
        err: null,
      });
    });
};

exports.postlogin = (req, res, next) => {
  login
    .findAll({
      where: {
        username: req.body.email,
      },
    })
    .then(async (logins) => {
      if (logins.length == 0) {
        return res.render("accounts/login", {
          pageTitle: "LUC Online System || Login Page",
          msg: "Invalid Login Details! Please check your username/password",
          sts: "WARNING",
          data: req.body,
        });
      }

      bcrypt
        .compare(req.body.password, logins[0].password)
        .then(async (result) => {
          if (result == true) {
            if (!logins[0].isactive) {
              return res.render("accounts/login", {
                pageTitle: "LUC Online System || Login Page",
                msg: "Your account is inactive. Please contact with Account Manager",
                sts: "WARNING",
                data: req.body,
              });
            }

            let allroles;

            await userroleconfig
              .findAll({ where: { user_id: logins[0].id } })
              .then((roles) => {
                allroles = roles.map((element) => {
                  return element.role_id;
                });
              });

            const jwttoken = jwt.sign(
              {
                isLoggedIn: true,
                userId: logins[0].id,
                tenantId: logins[0].tenantid,
                email: logins[0].username,
                username: logins[0].firstname + " " + logins[0].lastname,
                member: moment(logins[0].createdAt).format("YYYY"),
                profilepic: logins[0].profilepic,
                role: allroles,
              },
              process.env.token_secret,
              { algorithm: "HS512" },
              { expiresIn: "24h" },
            );

            var date = new Date();
            date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

            res.cookie("authtoken", jwttoken, {
              expiresIn: date,
              httpOnly: true,
              secure: true,
            });

            res.redirect("/accounts/dashboard");

            // if(logins[0].role=="e431cf87-f79a-11ec-a8d8-2e74a1df6eb5")
            //     res.redirect('/accounts/managerdash');
            // else
            //     res.redirect('/accounts/dashboard');
          } else {
            res.render("accounts/login", {
              pageTitle: "LUC Online System || Login Page",
              msg: "Invalid Login Details! Please check your username/password",
              sts: "WARNING",
              data: req.body,
            });
          }
        });
    })
    .catch((err) => {
      console.error(err);
      res.render("accounts/login", {
        pageTitle: "LUC Online System || Login Page",
        msg: "This is a system error. Please contact with Account Manager",
        sts: "ERROR",
        data: req.body,
      });
    });
};

exports.getlogout = (req, res, next) => {
  res.clearCookie("authtoken").status(200).render("accounts/login", {
    pageTitle: "LUC Online System || Login Page",
    msg: "You have Successfully Looged Out.",
    sts: "SUCCESS",
    data: req.body,
  });
};

exports.getdashboard = (req, res, next) => {
  company
    .findAll({
      where: {
        tenantid: req.body.tenantID,
        sts: 1,
      },
    })
    .then((comps) => {
      let compcnt = comps.length;

      ledger
        .findAll({
          where: {
            tenantid: req.body.tenantID,
            sts: 1,
          },
        })
        .then((ledgers) => {
          let ledgerscnt = ledgers.length;

          bankstatement
            .findAll({
              where: {
                tenantid: req.body.tenantID,
              },
            })
            .then((stat) => {
              let realized, unrealized;
              realized = stat.filter((member) => {
                if (member.realized) return member;
              });

              unrealized = stat.filter((member) => {
                if (!member.realized) return member;
              });

              res.status(200).render("accounts/dashboard", {
                pageTitle: "Dashboard || LUC Online System",
                pageName: "Dashboard",
                msg: "",
                sts: "",
                data: {
                  profile: req.body.profile,
                  username: req.body.username,
                  compcnt: compcnt,
                  ledgerscnt: ledgerscnt,
                  realized: realized.length,
                  unrealized: unrealized.length,
                  allmenus: req.body.allmenus,
                },
              });
            });
        });
    });
};


// User Management related controllers changes starts from here
exports.getusermanage = async (req, res, next) => {
  res.status(200).render("accounts/usermanage", {
    pageTitle: "User Management || TVS Online Accounting System",
    pageName: "User Management",
    msg: "",
    sts: "",
    data: {
      profile: req.body.profile,
      allmenus: req.body.allmenus,
      username: req.body.username,
    },
  });
};

exports.getallusers = async (req, res, next) => {
  const users = await login.findAll({
    attributes: ["id", "firstname", "lastname", "username", "isactive"],
    order: [["createdAt", "DESC"]],
  });

  res.status(200).send({
    data: {
      allusers: users,
    },
    success: true,
    err: null,
  });
};

exports.toggleuserstatus = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const newStatus = req.body.newStatus;

    if (!userId) {
      return res.status(400).send({
        success: false,
        err: "User ID is required",
      });
    }

    if (![0, 1].includes(Number(newStatus))) {
      return res.status(400).send({
        success: false,
        err: "Invalid status value",
      });
    }

    const result = await login.update(
      { isactive: newStatus },
      {
        where: { id: userId },
      },
    );

    if (result[0] === 0) {
      return res.status(404).send({
        success: false,
        err: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      err: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      err: "Internal server error",
    });
  }
};

exports.getuserbyid = async (req, res, next) => {
  try {
    const userId = req.query.id;

    if (!userId) {
      return res.status(400).send({
        success: false,
        err: "User ID is required",
      });
    }

    const user = await login.findOne({
      where: { id: userId },
      attributes: ["id", "firstname", "lastname", "username", "isactive"],
      include: [
        {
          model: userroleconfig,
          required: false,
          attributes: ["role_id"],
        },
      ],
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        err: "User not found",
      });
    }

    res.status(200).send({
      data: {
        user: user,
      },
      success: true,
      err: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      err: "Internal server error",
    });
  }
};

exports.getroles = async (req, res, next) => {
  try {
    const roles = await role.findAll({
      attributes: ["id", "rolename"],
      order: [["rolename", "ASC"]],
    });

    res.status(200).send({
      data: {
        allroles: roles,
      },
      success: true,
      err: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      err: "Internal server error",
    });
  }
};

exports.updateuser = async (req, res, next) => {
  try {
    console.log("Received update user request with data:", req.body);

    const userId = req.body.id;
    const { firstname, lastname, usernames, password } = req.body;

    let roleIds = req.body.roleIds || req.body["roleIds[]"] || [];

    if (!userId) {
      return res.status(400).send({
        success: false,
        err: "User ID is required",
      });
    }

    const user = await login.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send({
        success: false,
        err: "User not found",
      });
    }

    const existingUser = await login.findOne({
      where: {
        username: usernames,
        id: { [Op.ne]: userId },
      },
    });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        err: "Username already exists",
      });
    }

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return res.status(400).send({
          success: false,
          err: "Password must be at least 6 characters",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({ password: hashedPassword });
    }

    await user.update({
      firstname,
      lastname,
      username: usernames,
    });

    if (Array.isArray(roleIds)) {
      await userroleconfig.destroy({ where: { user_id: userId } });

      const newRoleConfigs = roleIds.map((roleId) => ({
        id: uuidv4.v4(),
        user_id: userId,
        role_id: roleId,
      }));

      await userroleconfig.bulkCreate(newRoleConfigs);
    }

    res.status(200).send({
      success: true,
      err: null,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      err: "Internal server error",
    });
  }
};

exports.checkUsername = async (req, res) => {
  const { username, id } = req.query;
  const { Op } = require("sequelize");

  const where = { username };

  if (id) {
    where.id = { [Op.ne]: id };
  }

  const user = await login.findOne({ where });

  res.send({ exists: !!user });
};

exports.createuser = async (req, res, next) => {
 const { firstname, lastname, usernames, password, roleIds } = req.body;
console.log("Received create user request with data:", req.body);
 try {
   const existingUser = await login.findOne({ where: { username: usernames } });

   if (existingUser) {
     return res.status(400).send({
       success: false,
       err: "Username already exists",
     });
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await login.create({
     id: uuidv4.v4(),
     firstname,
     lastname,
     username: usernames,
     password: hashedPassword,
     tenantid: 'e23025aa-9596-11ee-a90c-a27c837ebb62',
     isactive: 1,
     email_validation: false,
     isactive: true,
     otp:Math.floor(100000 + Math.random() * 900000),
     otpdatetimestamp: new Date(),
     createdby: req.body.userID,
     profilepic: "/images/profile/profile.png",
   });

   if (Array.isArray(roleIds) && roleIds.length > 0) {
     const userRoleConfigs = roleIds.map((roleId) => ({
       id: uuidv4.v4(),
       user_id: newUser.id,
       role_id: roleId,
     }));

     await userroleconfig.bulkCreate(userRoleConfigs);
   }

   res.status(201).send({
     success: true,
     err: null,
   });
 } catch (error) {
   console.error(error);
   res.status(500).send({
     success: false,
     err: "Internal server error",
   });
 }
};


