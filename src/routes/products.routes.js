import { Router } from 'express';
import { getProducts } from '../controllers/product.controller.js';
import { checkIfValid } from '../controllers/isAdmin.js';

const productsRouter = Router();

productsRouter.get('/products', checkIfValid, getProducts)



export default productsRouter;