import { Router } from 'express';
import Category from '../controllers/Category';

const router = Router();

router.post('/category', Category.store);

export default router;
