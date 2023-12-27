import express from "express";
import homeControler from "../controller/homeController";

const router = express.Router();

const initWebroutes = (app) => {
  router.get("/", homeControler.handhelloword);
  router.get("/user", homeControler.handleUserpage);
  router.post("/users-create", homeControler.handlepostCreateUser);
  router.post("/delete-user/:id", homeControler.handlepostDeleteUser);
  router.post("/users-update/:id", homeControler.handlepostUpdateUser);
  router.post("/update-user", homeControler.handlepostedit);

  // rest api
  // GET, POST , PUT , DELETE => MÔ HÌNH DỮ LIỆU CRUD
  return app.use("/", router);
};

export default initWebroutes;
