import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';
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
            const cart = await cartModel.find({id:cartId}).lean().populate({ path: 'products', model: productModel });
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
            const cart1 = await cartModel.findById(parseInt(cartId))
            const found = cart1.find(productId)
            console.log(found)
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
            cart[0].products.splice(pid-1, 1);
            const process = await cartModel.findOneAndUpdate(
                new mongoose.Types.ObjectId(cartId),
                { $set: { products: cart[0].products}
            })
            return cart;
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