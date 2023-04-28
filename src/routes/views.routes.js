import express from 'express'
import {Router} from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();
const manager = new ProductManager(`./products.json`);

router.get('/', async (req, res) => {
    const showProducts = manager.getProduct();
    showProducts.then(products => {res.render('home', {layout: 'main', products})});
});

router.get('/realtimeproducts', async (req, res) => {
    const prodList = await manager.getProducts();
    prodList.then(res.render('realTimeProducts', {layout: 'main', prodList}));
});

export default router;

