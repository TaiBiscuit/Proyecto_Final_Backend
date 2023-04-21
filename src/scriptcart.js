const fs = require('fs');

class CartManager {

    static lastId = 0;

    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    addCart = async (products) => {
        CartManager.lastId++;
        
        const newCart = {
            products: products,
            id: CartManager.lastId,
        }

        const cart = await fs.promises.readFile(this.path, 'utf-8');
        const cartJSON = JSON.parse(cart);
        if(!cartJSON.some(product => product.id === newCart.id)) {
            cartJSON.push(newCart); 
            this.carts.push(newCart);
            const archiveChain = JSON.stringify(cartJSON);
            await fs.promises.writeFile(this.path, archiveChain); 
        } else {
            console.log('exists!');
            }
        }
    
    getProductsById = async (idPassed) => {
        const cartProducts = await fs.promises.readFile(this.path, 'utf-8')
        const cartJSON = JSON.parse(cartProducts);
        const checkId = cartJSON.find(product => product.id == idPassed);
        if(checkId === undefined){
            return 'Not Found'
        } else {
            return checkId
        }
    }
}

module.exports = CartManager;
