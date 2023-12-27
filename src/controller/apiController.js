import loginRegister from "../service/loginRegisterService";

const testapi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};
const handleRegister = (req, res) => {
  console.log(">>cal me", req.body);

  try {
    if (!req.body.email || !req.body.phone || !req.body.pass) {
      return res.status(200).json({
        EM: "Missing required parametter",
        EC: "1",
        DT: "",
      });
    }
    //service user
    return res.status(200).json({
      EM: "A user succesfully",
      EC: "0",
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever",
      EC: "-1",
      DT: "",
      data: "test api",
    });
  }
};
module.exports = { testapi, handleRegister };
