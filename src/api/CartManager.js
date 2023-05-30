import cartModel from './cart.model.js';
import productModel from './product.model.js';
import mongoose from 'mongoose';

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

    getCartPopulated = async (cartId) => {
        try {
            const cart = await cartModel.find({id:cartId}).populate({ path: 'products.pid', model: productModel });
            return cart;
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }

    addProdToCart = async (cartId, prodId) => {
        try {
            console.log(prodId)
            const cart = await cartModel.findOneAndUpdate(
                {id:cartId},
                {$push: { products: prodId}},
                {new: true}
                );
            return cart
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    } 

    deleteProdFromCart = async (cid, pid) => {
        try {
            const cart = await cartModel.find({id: cid}).lean();
            const cartId = cart[0]._id;
            const product = await productModel.find({id: pid}).lean();
            const productId = product[0]._id;
            const process = await cartModel.findByIdAndUpdate(
                new mongoose.Types.ObjectId(cartId),
                { $pull: { products: productId}},
                { new: true }
            )
            console.log(process);
            return process;
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }
}

export default CartManager;