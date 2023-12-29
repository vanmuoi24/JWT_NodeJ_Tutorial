// haspass
import conect from "../config/database";
const salt = bcrypt.genSaltSync(10);
import bcrypt from "bcryptjs"; // haspass
import db from "../models/index";
const hashpassord = (userPasword) => {
  let hashpassword = bcrypt.hashSync(userPasword, salt);
  return hashpassword;
};

const createNewuser = async (email, password, username) => {
  let hashpass = hashpassord(password);
  try {
    await db.User.create({
      username: username,
      email: email,

      password: hashpass,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
const getuserList = async () => {
  // test relationships
  let newUser = await db.User.findOne({
    where: { id: 1 },
    include: { model: db.Group, attributes: ["id", "name", "description"] },

    attributes: ["id", "username", "email"],
    raw: true,
    nest: true,
  });

  console.log("User data with group:", newUser);

  let users = [];
  users = await db.User.findAll();
  return users;
};
const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
};
const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user.get({ plain: true });
};
const updateuser = async (username, email, id) => {
  await db.User.update(
    {
      username: username,
      email: email,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
module.exports = {
  createNewuser,
  getuserList,
  deleteUser,
  getUserById,
  updateuser,
};
