import express from 'express';
import { Signup,signin , google, signout } from '../controllers/auth.controller.js'; 

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', signin)
router.post('/google',google)
router.get('/signout', signout);

export default router;
