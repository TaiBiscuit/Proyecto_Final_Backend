import cartModel from './cart.model.js';
import productModel from './product.model.js';

class CartManager {

    constructor() {
        this.status = 1
    }

    getCart = async () => {
        try {
            const carts = await cartModel.find().lean();
            return carts
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }

    getCartById = async (cartId) => {
        try {   
            const cartFilterd = await cartModel.find({ id: cartId}).lean();
            return cartFilterd
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }

    addProdToCart = async (cartId, prodId) => {
        try {
            const cart = await cartModel.find({ id: cartId}).lean();
            if(cart) {
                const product = await productModel.find({id:prodId}).lean();
                const productId = product[0]._id;
                cart[0].products.push(productId); 
                return cart

  
            } else {
                return { status:"ERR", message: "The cart does not exist"}
            }

        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    } 
}

export default CartManager;