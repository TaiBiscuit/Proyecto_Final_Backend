import cartModel from './cart.model.js';

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
}

export default CartManager;