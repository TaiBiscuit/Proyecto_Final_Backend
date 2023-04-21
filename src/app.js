const express = require('express');
const productsRouter = require('./routes/products.routes');
const cartRouter = require('./routes/carts.routes'); 
const PORT = 8080;
const server = express();

server.use(express.json()) 
server.use(express.urlencoded({extended: true}));

server.use(productsRouter);
server.use(cartRouter);


server.listen(PORT, () =>{
    console.log(`Server opened at port ${PORT}`);
});