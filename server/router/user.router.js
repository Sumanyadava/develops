import { Router } from 'express'
import { hello, login, signin  } from '../controllers/auth.controllers.js';
import { checkin, checkout } from '../controllers/inout.controllers.js';


const router = Router()

router.get("/hello", hello);
router.post("/login", login)
router.post("/signin", signin);
router.post("/checkin",checkin)
router.post("/checkout",checkout)

  

export default router