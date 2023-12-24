import express from "express";
// express app

const configviewsEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "/src/views");
};
export { configviewsEngine };
