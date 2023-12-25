import express from "express";
import homeControler from "../controller/homeController";
const router = express.Router();

const initWebroutes = (app) => {
  router.get("/", homeControler.handhelloword);
  router.get("/user", homeControler.handleUserpage);
  router.post("/users-create", homeControler.handlepostCreateUser);
  return app.use("/", router);
};

export default initWebroutes;
