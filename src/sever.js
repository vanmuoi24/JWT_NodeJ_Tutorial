import express from "express";
import { configviewsEngine } from "./configs/vieengine";
import initWebroutes from "./routes/web";
require("dotenv").config();
const app = express();
// config view engine
configviewsEngine(app);
initWebroutes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(">>>" + PORT);
});
