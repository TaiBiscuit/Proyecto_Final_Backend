import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
const PORT = 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/products', productsRouter);
server.use('/api/carts', cartsRouter);

server.listen(PORT, () =>{
    console.log(`Server opened at port ${PORT}`);
});