import usercreate from "../service/userServixe";
const handhelloword = (req, res) => {
  const name = "muoi";
  return res.render("home.ejs", { name });
};

const handleUserpage = async (req, res) => {
  let userlist = await usercreate.getuserList();
  return res.render("user.ejs", { userlist });
};

const handlepostCreateUser = async (req, res) => {
  let email = req.body.email;
  let user = req.body.user;
  let password = req.body.password;
  await usercreate.createNewuser(email, password, user);
  res.redirect("/user");
};
module.exports = {
  handhelloword,
  handleUserpage,
  handlepostCreateUser,
};
