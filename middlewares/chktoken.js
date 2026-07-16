const jwt = require("jsonwebtoken");
const login = require("../models/management/login");
const userroleconfig = require("../models/management/userroleconfig");
module.exports = async (req, res, next) => {
  const token = req.cookies.authtoken;

  if (!token) {
    return res.status(200).render("accounts/login", {
      pageTitle: "LUC Online System || Login Page",
      msg: "Session expired. Please login again.",
      sts: "ERROR",
      data: req.body,
    });
  }

  jwt.verify(token, process.env.token_secret, async (err, decoded) => {
    if (err) {
      res.clearCookie("authtoken");

      return res.status(200).render("accounts/login", {
        pageTitle: "LUC Online System || Login Page",
        msg: "Session Validation Failed. Please login again.",
        sts: "ERROR",
        data: req.body,
      });
    }

    try {
      const user = await login.findOne({
        where: { id: decoded.userId },
      });
      if (!user) {
        res.clearCookie("authtoken");

        return res.status(200).render("accounts/login", {
          pageTitle: "LUC Online System || Login Page",
          msg: "Invalid user. Please login again.",
          sts: "ERROR",
          data: req.body,
        });
      }

      if (!user.isactive) {
        res.clearCookie("authtoken");

        return res.status(200).render("accounts/login", {
          pageTitle: "LUC Online System || Login Page",
          msg: "Your account is inactive. Contact administrator.",
          sts: "ERROR",
          data: req.body,
        });
      }
      const roles = await userroleconfig.findAll({
        where: { user_id: decoded.userId },
        attributes: ["role_id"],
      });

      // convert roles to array
      const roleIds = roles.map((r) => r.role_id);

      req.body.isLoggedIn = decoded.isLoggedIn;
      req.body.userID = decoded.userId;
      req.body.tenantID = decoded.tenantId;
      req.body.username = decoded.username;
      req.body.role = roleIds;

      console.log("Decoded token data:", {
        isLoggedIn: req.body.isLoggedIn,
        userID: req.body.userID,
        tenantID: req.body.tenantID,
        username: req.body.username,
        role: roleIds,
      });
      next();
    } catch (error) {
      console.error("error: from chktoken middleware", error);

      return res.status(500).render("accounts/login", {
        pageTitle: "LUC Online System || Login Page",
        msg: "Authentication error.",
        sts: "ERROR",
        data: req.body,
      });
    }
  });
};
