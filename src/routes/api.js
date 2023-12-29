import express from "express";
import apiController from "../controller/apiController";
import useController from "../controller/useController";
const router = express.Router();

const initApiroutes = (app) => {
  router.get("/test-api", apiController.testapi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.get("/user/show", useController.show);
  router.post("/user/create", useController.create);
  router.delete("/user/delete", useController.deleTe);
  router.put("/user/update", useController.update);
  router.get("/user/read", useController.read);

  return app.use("/api/v1", router);
};

export default initApiroutes;
