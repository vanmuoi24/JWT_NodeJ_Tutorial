import groupapi from "../service/groupapi";
const create = async (req, res) => {
  try {
    let data = await groupapi.createGroup(req.body);
    console.log(data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
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
const show = async (req, res) => {
  try {
    let Roles = await groupapi.getAllRoles();
    return res.status(200).json({
      EM: Roles.EM,
      EC: Roles.EC,
      DT: Roles.DT,
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

const deleTe = async (req, res) => {
  try {
    let data = await groupapi.delteRole(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {}
};
module.exports = {
  create,
  show,
  deleTe,
};
