import express from "express";
import apiController from "../controller/apiController";
import useController from "../controller/useController";
import groupcontroller from "../controller/groupcontroller";
import roleController from "../controller/rolecontroller";
const router = express.Router();
import JWTaction from "../middleware/JWTaction";

const initApiroutes = (app) => {
  // router.all("*", JWTaction.checkUserJwt, JWTaction.checkUserPermission);
  //login register
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleOut);
  //user routes
  router.get("/user/read", useController.read);
  router.get("/user/show", useController.show);
  router.post("/user/create", useController.create);
  router.delete("/user/delete", useController.deleTe);
  router.put("/user/update", useController.update);

  //group routes
  // router.get("/role/read", roleController.read);
  router.get("/role/show", roleController.show);
  router.post("/role/create", roleController.create);
  router.delete("/role/delete", roleController.deleTe);
  // router.put("/role/update", roleController.update);

  router.get("/group/read", groupcontroller.read);
  router.get("/acount", useController.getUseracounts);
  // role router

  return app.use("/api/v1", router);
};

export default initApiroutes;
