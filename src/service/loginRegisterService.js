import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
import bcrypt from "bcryptjs";
const hashpassord = (userPasword) => {
  let hashpassword = bcrypt.hashSync(userPasword, salt);
  return hashpassword;
};
const checkemail = async (useremail) => {
  let user = await db.User.findOne({
    where: { email: useremail },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};
const checkphone = async (userphone) => {
  let user = await db.User.findOne({
    where: { phone: userphone },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};

const registernewUser = async (userData) => {
  try {
    //check email /phone / pass
    let ismailExitst = await checkemail(userData.email);
    if (ismailExitst === true) {
      return {
        EM: "the email is alresdy exits",
        EC: 1,
      };
    }
    let isphoneExitst = await checkphone(userData.phone);
    if (isphoneExitst === true) {
      return {
        EM: "the phone is alresdy exits",
        EC: 1,
      };
    }

    //hash user passord
    let hasspass = hashpassord(userData.pass);
    // create new user
    await db.User.create({
      email: userData.email,
      username: userData.username,
      password: hasspass,
      phone: userData.phone,
    });

    return {
      EM: "a user succssecully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "error",
      EC: -1,
    };
  }
};

module.exports = { registernewUser };
