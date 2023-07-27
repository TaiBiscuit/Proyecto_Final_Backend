import ProductManager from '../services/ProductManager.js';
import config from '../config.js';
import { errorDict } from '../utils.js';
import CustomError from '../services/CustomError.js';

const manager = new ProductManager;

export const getProducts = async (req, res) => {
    try{
        let limit = req.query.limit;      
            if(limit === undefined) limit = config.LIMIT;
            if(req.query.page === undefined) req.query.page = 0;
            const result = await manager.getProducts(req.query.page * limit, limit);
            const pages = [];
            for(let i = 0; i < result.totalPages; i++) {
                pages.push({index: i, indexPgBar: i+1});
            }
            const pagination = {
                pageUrl: config.PAGE_URL,
                limit: limit,
                offset: result.offset,
                totalPages: result.totalPages,
                totalDocs: result.totalDocs,
                page: result.page -1,
                nextPageUrl: `/api/products?page=${result.nextPage -1}`,
                prevPageUrl: `/api/products?page=${result.prevPage -1}`,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                pagesArray: pages
            }

            res.render('paginProducts', {products: result.docs, pagination: pagination});
    } catch(err) {
        res.status(500).send(err.message);
    }
} 

export const createProducts = async (req, res) => {
    try {
        const infoToUse = req.body;
        if(infoToUse.category == ' ' || infoToUse.category == ''){
            throw new CustomError(errorDict.CATE_ERROR);
        } else if (infoToUse.title == ' ' || infoToUse.title == ''){
            throw new CustomError(errorDict.TITLE_ERROR);
        } else if (isNaN(infoToUse.price) || infoToUse.price == ' ' || infoToUse.price == ''){
            throw new CustomError(errorDict.PRICE_ERROR);
        } else if (isNaN(infoToUse.code) || infoToUse.code == ' ' || infoToUse.code == ''){
            throw new CustomError(errorDict.CODE_ERROR);
        } else {
            const newProduct = await manager.addProduct(infoToUse.title, infoToUse.price, infoToUse.description, infoToUse.category, infoToUse.image, infoToUse.stock, infoToUse.code)
            res.status(200).send(newProduct)
        } 
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const addProducts = async (req, res) => {
    
}