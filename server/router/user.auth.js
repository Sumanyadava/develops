import express from 'express'
import { Router } from 'express'
import { hello, login, signin  } from '../controllers/auth.controllers.js';

const router = Router()

router.get("/hello", hello);
router.post("/login", login)
router.post("/signin", signin);
  

export default router