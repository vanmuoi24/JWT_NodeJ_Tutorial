import express from "express";
import apiController from "../controller/apiController";
import useController from "../controller/useController";
import groupcontroller from "../controller/groupcontroller";
const router = express.Router();
import JWTaction from "../middleware/JWTaction";

const checkuserloin = (req, res, next) => {
  const nonSecurepaths = ["register", "/login"];
  if (nonSecurepaths.includes(req.path)) return next();
  if (user) {
    next();
  } else {
  }
};

const initApiroutes = (app) => {
  router.all("*", checkuserloin);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get(
    "/user/read",
    JWTaction.checkUserJwt,
    JWTaction.checkUserPermission,
    useController.read
  );
  router.get("/user/show", useController.show);
  router.post("/user/create", useController.create);
  router.delete("/user/delete", useController.deleTe);
  router.put("/user/update", useController.update);

  router.get("/group/read", groupcontroller.read);

  return app.use("/api/v1", router);
};

export default initApiroutes;
