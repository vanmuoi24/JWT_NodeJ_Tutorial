import db from "../models";
const _ = require("lodash");

const createGroup = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    const objectsToAdd = _.differenceWith(roles, currentRoles, (obj1, obj2) =>
      _.isEqual(obj1.url, obj2.url)
    );

    if (objectsToAdd.length === 0) {
      return {
        EM: "Nothing to create",
        EC: 0,
        DT: [],
      };
    }
    console.log(objectsToAdd);

    await db.Role.bulkCreate(objectsToAdd);
    return {
      EM: `Update success, created ${objectsToAdd.length} new role(s)`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Not found",
      EC: 0,
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let Role = await db.Role.findAll({
      attributes: ["id", "url", "description"],
    });
    if (Role) {
      return {
        EM: "get date success",
        EC: 0,
        DT: Role,
      };
    } else {
      return {
        EM: "",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Not found",
      EC: 0,
      DT: [],
    };
  }
};

const delteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
      return {
        EM: "ok",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "not exist",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Not found",
      EC: 0,
      DT: [],
    };
  }
};
module.exports = {
  createGroup,
  getAllRoles,
  delteRole,
};
