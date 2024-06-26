import express from 'express'
import { adminLogin, adminhome } from '../controllers/admin.contoller.js'

const router = express.Router()

router.post('/admin',adminLogin)
router.get('/adminhome',adminhome)

export default router;