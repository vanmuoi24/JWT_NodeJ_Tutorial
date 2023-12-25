import bcrypt from "bcryptjs";
import conect from "../config/database";
const salt = bcrypt.genSaltSync(10);

const hashpassord = (userPasword) => {
  let hashpassword = bcrypt.hashSync(userPasword, salt);
  return hashpassword;
};

const createNewuser = async (email, password, username) => {
  let hashpass = hashpassord(password);
  const [results, fields] = await conect.connection.query(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashpass]
  );
};
const getuserList = async () => {
  let [result, fields] = await conect.connection.query("select * from users");
  return result;
};
const deleteUser = async (id) => {
  let [result, fields] = await conect.connection.query(
    `delete from users where id = ? `,
    [id]
  );
};
const getUserById = async (id) => {
  let [result, fields] = await conect.connection.query(
    "select * from users where id = ?",
    [id]
  );
  return result;
};

const updateuser = async (username, email, id) => {
  try {
    const query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
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
