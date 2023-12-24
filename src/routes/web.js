import express, { Router } from "express";

const router = express.Router();

const initWebroutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Helle wworld");
  });

  return app.use("/", router);
};

export default initWebroutes;
