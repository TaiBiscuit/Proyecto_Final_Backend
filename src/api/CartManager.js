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
            const cartFilterd = await cartModel.find({id:cartId}).lean();
            return cartFilterd
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }

    addProdToCart = async (cartId, prodId) => {
        try {
            let cart = await cartModel.find({id:cartId}).lean();
            if(cart) {
                const products = await productModel.find({id:prodId}).lean();
                const productId = {
                    _id: products[0]._id
                };  
                const index = cart.indexOf(productId);
                console.log(index)
                if(index > -1) {
                    cart[0].products.qty++;
                    return cart
                } else {
                    cart[0].products.push(productId); 
                    let finalCart = await cartModel.find({id:cartId}).lean().populate('products')
                    console.log(cart)
                    return cart
                }
            } else {
                return { status:"ERR", message: "The cart does not exist"}
            }
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    } 

    deleteProdFromCart = async (cartId, prodId) => {
        try {
            let cart = await cartModel.find({id:cartId}).lean();
            if(cart) {
                const productToDelete = await productModel.find({id:prodId}).lean();
                const productToDeleteId = productToDelete[0].id;
                const productIndex = cart[0].indexOf(productToDeleteId);
                cart[0].products.splice(productIndex, 1);
                cartModel.updateOne(cart)
            };
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }
}

export default CartManager;