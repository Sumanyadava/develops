import { Router } from "express";
import {
  allUser,
  deleteUser,
  hello,
  login,
  signin,
  singleUser,
  singleEdit
} from "../controllers/auth.controllers.js";

const router = Router();

router.get("/hello", hello);
router.get("/all", allUser);
router.get("/single", singleUser);
router.post("/login", login);
router.post("/signin", signin);
router.put("/signinedit", singleEdit);
router.delete("/delete", deleteUser);

export default router;
