import { Router } from 'express';
import authRoutes from './auth.routes.js';


const router = Router();

// API versioning
router.use('/v1/auth', authRoutes);


export default router;