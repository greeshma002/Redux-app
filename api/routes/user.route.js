import express from 'express'
import { test, updateUser, deleteUser,userDetails, deleteAdmin, editUser ,addUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken,updateUser)
router.delete('/delete/:id', verifyToken,deleteUser)
router.get("/getUser", userDetails)
router.delete('/deleteUser/:id', deleteAdmin)
router.post('/editUser/:id', editUser)
router.post('/addUser', addUser)

export default router;