import express from 'express'
import {Router} from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();
const manager = new ProductManager(`./products.json`);

router.get('/', async (req, res) => {
    const showProducts = manager.getProduct();
    showProducts.then(products => {res.render('home', {layout: 'main', products})});
});


// Websocket

router.get('/realtimeproducts', async (req, res) => {
    const prodList = manager.getProduct();
    prodList.then(res.render('realTimeProducts', {layout: 'main', prodList}));
});

router.post('/realtimeproducts', async (req, res) => {
    let prodList = await manager.getProduct()
    if(req.query.met === 'DELETE'){
        const itemToDelete = Number(req.body.id);
        await manager.deleteProduct(itemToDelete)
        prodList = prodList.filter(item => item.id != itemToDelete);
        res.render('realTimeProducts', {layout: 'main', prodList}); 
    } else {
        let largestId = 0;
        for(const product of prodList){
            if(largestId <= product.id){
                largestId = product.id + 1
            }
        }
        const prodAdded = req.body;
        manager.addProduct(prodAdded.title, prodAdded.description, prodAdded.price, prodAdded.thumbnail, prodAdded.code, prodAdded.stock)
        prodAdded.id = largestId;
        prodList.push(prodAdded);
        res.render('realTimeProducts', {layout: 'main', prodList});
    }
});

export default router;