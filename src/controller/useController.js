import userapi from "../service/user_apiService";

const read = async (req, res) => {
  let users = await userapi.getAllUser();
  try {
    return res.status(200).json({
      EM: users.EM,
      EC: users.EC,
      DT: users.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const show = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const update = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const deleTe = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const create = async (req, res) => {};
module.exports = {
  read,
  show,
  update,
  deleTe,
  create,
};
