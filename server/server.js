import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import router from "./src/router/user.auth.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


connectDB();

app.use("/api/auth",router)



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
