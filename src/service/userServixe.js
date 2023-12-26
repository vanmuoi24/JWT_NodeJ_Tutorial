import bcrypt from "bcryptjs";
import conect from "../config/database";
const salt = bcrypt.genSaltSync(10);
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
      password,
      hashpass,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
const getuserList = async () => {
  let [result, fields] = await conect.connection.query("select * from user");
  return result;
};
const deleteUser = async (id) => {
  let [result, fields] = await conect.connection.query(
    `delete from user where id = ? `,
    [id]
  );
};
const getUserById = async (id) => {
  let [result, fields] = await conect.connection.query(
    "select * from user where id = ?",
    [id]
  );
  return result;
};

const updateuser = async (username, email, id) => {
  try {
    const query = "UPDATE user SET username = ?, email = ? WHERE id = ?";
    const [results, fields] = await conect.connection.query(query, [
      username,
      email,
      id,
    ]);
    console.log("Số dòng đã cập nhật:", results.affectedRows);
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
  }
};

module.exports = {
  createNewuser,
  getuserList,
  deleteUser,
  getUserById,
  updateuser,
};
