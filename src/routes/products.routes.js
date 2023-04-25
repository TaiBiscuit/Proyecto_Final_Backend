import {Router} from 'express';
import ProductManager from '../ProductManager.js';

const productsRouter = Router();
const manager = new ProductManager('./products.json');

productsRouter.get('/', (req, res) => {
    const limit = req.query.limit;
     if(limit === undefined){
        const showProducts = manager.getProduct();
        showProducts.then(products => res.send(products));   
    } else {
        const showProducts = manager.getProduct();
        showProducts.then(products => res.send(products.slice(0,limit)));
    } 
});

productsRouter.get('/:id?', (req, res) => {
    const productById = manager.getProductById(req.params.id);
    productById.then(products => res.status(200).send(products));  
});

productsRouter.post('/', (req, res) => {
    const newProduct = req.body;
    manager.getProduct().then(manager.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock,))
    .then(res.status(200).send({state: 'added', message: 'ok'}));
});

 productsRouter.put('/:id?', async (req, res) => {
    const thingToChange = req.body;
    await manager.updateProduct(req.params.id, thingToChange)
    .then(res.status(200).send({state: 'updated', message: 'done'}));
}); 

productsRouter.delete('/:id?', async (req, res) => {
    await manager.deleteProduct(req.params.id)
    .then(res.status(200).send({state: 'deleted', message: 'done'}));  
})

export default productsRouter;