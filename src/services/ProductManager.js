import productModel from '../models/product.model.js';

class ProductManager {
    
    constructor () {
        this.status = 1
    }

    getProducts = async (offset, limit, ) => {
        try {
            const queryOptions = {
                offset: offset,
                limit: limit,
                lean: true,
            };
            const products = await productModel.paginate({}, queryOptions)
            return products
        } catch (err) {
            this.status = -1;
            console.log(err)
        }
    }

    getProductsById = async (productId) => {
        try {
            const products = await productModel.findById(productId);
            return products
        }catch (err) {
            this.status = -1;
            console.log(err)
        }
    }

    getProductsBy_Id = async (productId) => {
        try {
            const product = await productModel.find({_id:productId})
            return product
        } catch (err) {
            this.status = -1;
            console.log(err)   
        }
    }

    addProduct = async (title, price, description, category, image, stock, code) => {
        return await productModel.create({title:title, price:price, description:description, category:category, image:image, stock:stock, code:code }) 
    }
}

export default ProductManager;