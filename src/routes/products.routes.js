import { Router } from 'express';
import { createProducts, getProducts } from '../controllers/product.controller.js';
import { checkIfValid } from '../controllers/isAdmin.js';
import { generateProducts } from '../utils.js';

const productsRouter = Router();

productsRouter.get('/products', checkIfValid, getProducts);
productsRouter.get('/products/mocking', checkIfValid, generateProducts);
productsRouter.get('/products/create', checkIfValid, createProducts);

export default productsRouter;