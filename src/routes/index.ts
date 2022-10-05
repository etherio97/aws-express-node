import { Router } from 'express';
import { authGuard } from '../middlewares/auth.guard';
import apiRoutes from './api';

const router = Router();

router.use('/api', authGuard, apiRoutes);

export default router;
