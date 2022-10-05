import { Router } from 'express';
import authRoutes from './auth';
import videosRoutes from './videos';

const router = Router();

router.use('/auth', authRoutes);

router.use('/videos', videosRoutes);

export default router;
