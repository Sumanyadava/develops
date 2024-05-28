import { Router } from "express";
import userRouter from "./user.router.js";
import inOutRouter from './inout.router.js'

const router = Router()

router.use("/auth",(userRouter))
router.use("/check",(inOutRouter))


export default router