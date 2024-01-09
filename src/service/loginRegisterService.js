import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import JWT from "./JWTErvice";
import token from "../middleware/JWTaction";
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
      groupId: 14,
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

const checkpass = (inputpass, hassPass) => {
  return bcrypt.compareSync(inputpass, hassPass);
};

const handleUserLogin = async (userData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: userData.email }, { phone: userData.email }],
      },
    });

    if (user) {
      let ispass = checkpass(userData.pass, user.password);
      if (ispass === true) {
        // tạo token
        let role = await JWT.GetGroupwithrole(user);
        let payload = {
          email: user.email,
          role: role,
        };
        let tokened = token.createjwt(payload);
        return {
          EM: "Ok",
          EC: 0,
          DT: {
            access_token: tokened,
            data: role,
            email: user.email,
            username: user.username,
          },
        };
      }
    }
    return {
      EM: "Phone number and email or password are incorrect",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registernewUser,
  handleUserLogin,
  checkemail,
  checkphone,
  hashpassord,
  checkpass,
};
