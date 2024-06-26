import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
// import router from "./router/user.router.js";
// import router from "./router/inout.router.js";
import router from "./router/router.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://developsclient.vercel.app/",
    credentials:true,
    
  })
);
app.options('*', cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.options('*', cors());

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
