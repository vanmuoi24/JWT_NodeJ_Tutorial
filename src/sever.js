import express from "express";
import { configViewEngine } from "./config/vieengine";
const bodyParser = require("body-parser");
const cookiePasrser = require("cookie-parser");
import configCors from "./config/cors";
import initApiroutes from "./routes/api";
import connection from "./config/connectDB";
import initWebroutes from "./routes/web";

require("dotenv").config();
const app = express();
// TẠO CHỈ THAO TÁC ĐƯỢC ĐƯỜNG LINK BÊN REACTJS
// config cookie
configCors(app);
app.use(cookiePasrser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// config view engine
connection();
initApiroutes(app);
configViewEngine(app);
initWebroutes(app);
//testwjt
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(">>>" + PORT);
});
// sử dunngj midelwere là mọt trạng thái khi mà req => middelwere => res lên sever quản lý sever của client
