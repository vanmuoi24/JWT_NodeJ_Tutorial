import express from "express";
const path = require("path");
// express app
const configViewEngine = (app) => {
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join("./src", "public")));
};
export { configViewEngine };
