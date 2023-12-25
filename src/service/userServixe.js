import bcrypt from "bcryptjs";
import conect from "../configs/database";
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

module.exports = { createNewuser, getuserList };
