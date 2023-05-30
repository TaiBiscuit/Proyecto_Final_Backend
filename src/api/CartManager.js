import cartModel from './cart.model.js';
import productModel from './product.model.js';
import mongoose from 'mongoose';

class CartManager {

    constructor() {
        this.status = 1
    }

    
    addCart = async () => {
        try {
            const process = await cartModel.create();
            return process;
        } catch (err) {
            console.log(err.message);
        }
    };

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
            const product = await productModel.find({id: prodId}).lean();
            const productId = product[0]._id;
            const cart = await cartModel.findOneAndUpdate(
                {id:cartId},
                {$push: { products: productId}},
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
            console.log(productId);
            const process = await cartModel.findOneAndUpdate(
                new mongoose.Types.ObjectId(cartId),
                { $pull: { products: productId} },
            );
            console.log(process);
            return process;
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }

    emptyCart = async (cid) => {
        try {
            const cart = await cartModel.find({id: cid}).lean();
            const cartId = cart[0]._id;
            const process = await cartModel.findOneAndUpdate(
                new mongoose.Types.ObjectId(cartId),
                { $set: { products: [] }
            });
            return process;
        } catch (err) {
            return false;
        }
    }
}

export default CartManager;