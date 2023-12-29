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
};
