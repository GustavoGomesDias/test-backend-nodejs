import { Router } from 'express';
import Manager from '../controllers/Manager';

const router = Router();

router.post('/manager', Manager.addProductInCategory);

export default router;
