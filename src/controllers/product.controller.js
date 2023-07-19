import ProductManager from '../services/ProductManager.js';
import config from '../config.js';

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

export const addProducts = async (req, res) => {
    
}