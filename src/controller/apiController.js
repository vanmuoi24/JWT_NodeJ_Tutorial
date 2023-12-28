import loginRegister from "../service/loginRegisterService";

const testapi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};
const handleRegister = async (req, res) => {
  console.log(">>cal me", req.body);

  try {
    if (!req.body.email || !req.body.phone || !req.body.pass) {
      return res.status(200).json({
        EM: "Missing required parametter",
        EC: "1",
        DT: "",
      });
    }
    if (req.body.pass && req.body.pass < 3) {
      return res.status(200).json({
        EM: "your password must ghave more than 3 letters",
        EC: "1",
        DT: "",
      });
    }

    //service user
    let data = await loginRegister.registernewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
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
