import { Router } from 'express'
import { checkin,checkout, checktime, inoutTime } from '../controllers/inout.controllers.js'

const router = Router()

router.post("/in",checkin)
router.post("/out",checkout)
router.post("/time",checktime)
router.post("/inouttime",inoutTime)

export default router 