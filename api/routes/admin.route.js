import express from 'express';
import {
    getUsers,
    addUser,
    removeUser,
    blockUser,
    
} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/add-user', verifyToken, addUser);
router.delete('/remove-user/:id', verifyToken, removeUser);
router.delete('/block-user/:id', verifyToken, blockUser);

export default router;
