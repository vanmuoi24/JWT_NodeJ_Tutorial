import express from "express";
import { configViewEngine } from "./config/vieengine";
const bodyParser = require("body-parser");
import configCors from "./config/cors";
import initApiroutes from "./routes/api";
import connection from "./config/connectDB";
import initWebroutes from "./routes/web";
require("dotenv").config();
const app = express();
// TẠO CHỈ THAO TÁC ĐƯỢC ĐƯỜNG LINK BÊN REACTJS
configCors(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// config view engine
connection();
initApiroutes(app);
configViewEngine(app);
initWebroutes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(">>>" + PORT);
});
