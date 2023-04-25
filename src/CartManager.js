import * as fs from 'fs';

class CartManager {

    static cartQuantity = 0;

    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    addCart = async (products) => {
        
        const newCart = {
            products: products,
            id: 0,
        }
        const cart = await fs.promises.readFile(this.path, 'utf-8');
        const cartJSON = JSON.parse(cart);
        newCart.id = cartJSON[cartJSON.length - 1].id + 1;
        cartJSON.push(newCart); 
        this.carts.push(newCart);
        const archiveChain = JSON.stringify(cartJSON);
        await fs.promises.writeFile(this.path, archiveChain); 
    }
    
    getCartsById = async (idPassed) => {
        const cartProducts = await fs.promises.readFile(this.path, 'utf-8')
        const cartJSON = JSON.parse(cartProducts);
        const checkId = cartJSON.find(product => product.id == idPassed);
        if(checkId === undefined){
            return 'Not Found'
        } else {
            return checkId
        }
    }

    updateCarts = async (cartId, productId) =>{
        CartManager.cartQuantity++;
        const cartProducts = await fs.promises.readFile(this.path, 'utf-8')
        const cartJSON = JSON.parse(cartProducts);
        cartJSON[cartId -1].products = productId;
        cartJSON[cartId -1].quantity = CartManager.cartQuantity;
        this.carts.push(cartJSON);
        const archiveChain = JSON.stringify(cartJSON);
        await fs.promises.writeFile(this.path, archiveChain); 
    }
}

export default CartManager;