import { Router } from 'express';
import Product from '../controllers/Product';

const router = Router();

router.get('/product', Product.findAll);
router.post('/product', Product.store);
router.put('/product', Product.editProduct);
router.delete('/product/:id', Product.deleteProduct);

export default router;
