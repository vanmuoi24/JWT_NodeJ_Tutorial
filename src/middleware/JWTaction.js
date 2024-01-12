const jwt = require("jsonwebtoken");
require("dotenv").config();

const nonSecureOaths = ["/", "/login", "/register", "/logout"];

const createjwt = (payload) => {
  let token = null;

  try {
    token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Specify the token expiration time
    });
  } catch (e) {
    console.log(e);
  }

  return token;
};

const veryfinetken = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};
const checkUserJwt = (req, res, next) => {
  if (nonSecureOaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = veryfinetken(token);
    console.log(decoded);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated",
      });
    }
  } else {
    return res.status(401).json({
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
