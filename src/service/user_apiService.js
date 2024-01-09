import db from "../models/index";
import loginrigister from "../service/loginRegisterService";
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
      include: {
        model: db.Group,
        attributes: ["id", "name", "description", "id"],
      },
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      order: [["id", "DESC"]],
    });

    let totalpage = Math.ceil(count / limit);
    let data = {
      totalrow: count,
      totalpage: totalpage,
      user: rows,
    };

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
    if (!data.groupId) {
      return {
        EM: "Error with emty GroupId",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });

      return {
        EM: "update user secces",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "user not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "get date fail",
      EC: 1,
      DT: [],
    };
  }
};
const createUser = async (data) => {
  try {
    //check email phone
    let ismailExitst = await loginrigister.checkemail(data.email);
    if (ismailExitst === true) {
      return {
        EM: "the email is alresdy exits",
        EC: 1,
        DT: "email",
      };
    }
    let isphoneExitst = await loginrigister.checkphone(data.phone);
    if (isphoneExitst === true) {
      return {
        EM: "the phone is alresdy exits",
        EC: 1,
        DT: "phone",
      };
    }

    //hash user passord
    let hasspass = loginrigister.hashpassord(data.password);
    await db.User.create({
      email: data.email,
      phone: data.phone,
      sex: data.sex,
      password: hasspass,
      username: data.username,
      address: data.address,
      groupId: data.groupId,
    });
    return {
      EM: "ok",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
  }
};
const delteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
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
  } catch (e) {
    return {
      EM: "not fount",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  updateUser,
  createUser,
  delteUser,
  getUserwithPagetion,
};
