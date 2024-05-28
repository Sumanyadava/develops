import { Router } from 'express'
import { checkin,checkout } from '../controllers/inout.controllers.js'

const router = Router()

router.post("/in",checkin)
router.post("/out",checkin)

export default router