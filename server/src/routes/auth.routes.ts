import { Router } from 'express';
import { logout, signup } from "../controllers/index.js"
import { verifyToken } from '../middlewares/index.js';

const router = Router();

router.route("/signup").post(signup);
router.route("/logout").post(verifyToken, logout);

export default router;