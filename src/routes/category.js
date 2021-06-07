import { Router } from 'express';
import Category from '../controllers/Category';

const router = Router();

router.get('/category', Category.findAll);
router.post('/category', Category.store);
router.delete('/category/:id', Category.deleteCategory);

export default router;
