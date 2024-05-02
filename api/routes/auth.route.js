import express from 'express';
import { signup,signin ,admin_signin} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/admin-signin', admin_signin);

export default router; 