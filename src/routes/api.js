import express from "express";
import apiController from "../controller/apiController";
const router = express.Router();

const initApiroutes = (app) => {
  router.get("/test-api", apiController.testapi);
  router.post("/register", apiController.handleRegister);
  return app.use("/api/v1", router);
};

export default initApiroutes;
