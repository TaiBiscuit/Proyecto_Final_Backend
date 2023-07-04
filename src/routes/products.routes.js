import { Router } from 'express';
import { getProducts } from '../controllers/product.controller.js';

const productsRouter = Router();

productsRouter.get('/products', getProducts)



export default productsRouter;