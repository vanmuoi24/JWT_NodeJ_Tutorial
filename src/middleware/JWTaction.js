const jwt = require("jsonwebtoken");
require("dotenv").config();
const createjwt = (payload) => {
  let token = null;
  // viêt theo đông bộ rất nguy hiêm nếu bên sever mà cố lỗi thì dẫn tơi ứng dụng sẽ chết cả 2 bên back and fnt luôn
  try {
    token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);
  } catch (e) {
    console.log(e);
  }
  return token;
};

const veryfinetken = (token) => {
  let data = null;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};

module.exports = {
  createjwt,
  veryfinetken,
};
