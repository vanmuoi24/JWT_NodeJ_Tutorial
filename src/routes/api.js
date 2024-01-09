import express from "express";
import apiController from "../controller/apiController";
import useController from "../controller/useController";
import groupcontroller from "../controller/groupcontroller";
const router = express.Router();
import JWTaction from "../middleware/JWTaction";

const initApiroutes = (app) => {
  router.all("*", JWTaction.checkUserJwt, JWTaction.checkUserPermission);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.get("/user/read", useController.read);
  router.get("/user/show", useController.show);
  router.post("/user/create", useController.create);
  router.delete("/user/delete", useController.deleTe);
  router.put("/user/update", useController.update);
  router.get("/group/read", groupcontroller.read);
  return app.use("/api/v1", router);
};

export default initApiroutes;
