import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import bp from "body-parser";
import companyRoutes from "./routes/companyRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
import colors from "colors";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running...");
});
app.use("/api/companies", companyRoutes);
app.use("/api/employers", employerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("listenning".yellow.bold));
