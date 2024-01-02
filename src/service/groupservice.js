import db from "../models/index";

const getGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      EM: "get date seccess",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    return {
      EM: "get date fail",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = { getGroup };
