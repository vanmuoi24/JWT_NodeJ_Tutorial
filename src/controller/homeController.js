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
const handlepostDeleteUser = async (req, res) => {
  await usercreate.deleteUser(req.params.id);
  res.redirect("/user");
};
const handlepostUpdateUser = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let userlist = await usercreate.getUserById(id);
  let userdata = {};
  if (userlist && userlist.length > 0) {
    userlist = userlist[0];
  } else {
    userlist = userdata;
  }
  return res.render("user-update.ejs", { userlist });
};

const handlepostedit = async (req, res) => {
  let email = req.body.email;
  let user = req.body.user;
  let id = req.body.id;
  await usercreate.updateuser(user, email, id);
  res.redirect("/user");
};
module.exports = {
  handhelloword,
  handleUserpage,
  handlepostCreateUser,
  handlepostDeleteUser,
  handlepostUpdateUser,
  handlepostedit,
};
