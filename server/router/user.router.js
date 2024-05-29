import { Router } from 'express'
import { allUser, hello, login, signin  } from '../controllers/auth.controllers.js';



const router = Router()

router.get("/hello", hello);
router.get("/all", allUser);
router.post("/login", login)
router.post("/signin", signin);


  

export default router