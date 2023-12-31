import db from "../models/index";

const getAllUser = async () => {
  try {
    let user = await db.User.findAll({
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: ["id", "username", "email", "phone", "sex"],
    });
    if (user) {
      return {
        EM: "get date success",
        EC: 0,
        DT: user,
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
      EM: "get date fail",
      EC: 1,
      DT: "",
    };
  }
};

const getUserwithPagetion = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: ["id", "username", "email", "phone", "sex"],
    });
    console.log(rows);
    let totalpage = Math.ceil(count / limit);
    let data = {
      totalrow: count,
      totalpage: totalpage,
      user: rows,
    };
    console.log("check", data);

    return {
      EM: "",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "get date fail",
      EC: 1,
      DT: "",
    };
  }
};
const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      user.save({});
    } else {
    }
  } catch (e) {
    console.log(e);
  }
};
const createUser = async () => {
  try {
    await db.User.cre;
  } catch (error) {
    console.log(error);
  }
};
const delteUser = async (id) => {
  try {
    await db.Uer.delete({
      where: { id: id },
    });
  } catch (e) {}
};

module.exports = {
  getAllUser,
  updateUser,
  createUser,
  delteUser,
  getUserwithPagetion,
};
