const jwt = require("jsonwebtoken");
require("dotenv").config();

const nonSecureOaths = ["/", "/login", "/register"];

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
const checkUserJwt = (req, res, next) => {
  if (nonSecureOaths.includes(req.path)) return next();

  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = veryfinetken(token);
    if (decoded) {
      let data = decoded;
      req.user = decoded;
      console.log("data check", data);
      next();
    } else {
      return res.status(401).jon({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).jon({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};
const checkUserPermission = (req, res, next) => {
  if (nonSecureOaths.includes(req.path)) return next();

  if (req.user) {
    let email = req.user.email;
    let roles = req.user.role.Roles;
    let currenUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource",
      });
    }
    let canAccess = roles.some((item) => item.url === currenUrl);

    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource",
      });
    }
  }
};

module.exports = {
  createjwt,
  veryfinetken,
  checkUserJwt,
  checkUserPermission,
};
