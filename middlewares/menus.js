const Sequelize = require("sequelize");

const menu = require("../models/management/menu");
const menuroleconfig = require("../models/management/menuroleconfig");
const login = require("../models/management/login");
module.exports = async (req, res, next) => {
  try {
    const items = await menuroleconfig.findAll({
      where: {
        role_id: req.body.role,
      },
      include: [{ model: menu, where: { parent_id: null }, required: true }],
      order: [
        [Sequelize.fn("length", Sequelize.col("tblmenu.slno")), "ASC"],
        [{ model: menu }, "slno", "ASC"],
      ],
    });

    const allmenus = items.map((element) => {
      const isActive = element.tblmenu.href === req.originalUrl;

      return {
        slno: element.tblmenu.slno,
        menuname: element.tblmenu.menuname,
        iclass: element.tblmenu.iclass,
        menuclass: isActive
          ? element.tblmenu.menuclass + " active"
          : element.tblmenu.menuclass,
        href: element.tblmenu.href,
      };
    });

    const allmenusclean = allmenus.filter(
      (arr, index, self) =>
        index ===
        self.findIndex(
          (t) => t.menuname === arr.menuname && t.href === arr.href,
        ),
    );

    req.body.allmenus = allmenusclean;

    next();
  } catch (error) {
    console.error("Menu middleware error:", error);
    next(error);
  }
};
