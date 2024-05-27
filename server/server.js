import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import router from "./router/user.router.js";
// import router from "./router/inout.router.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

connectDB();

app.use("/api/auth", router);

// app.use("/api", inoutrouter);





app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
