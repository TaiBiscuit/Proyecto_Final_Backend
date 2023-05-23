import { Router } from 'express';
import ProductManager from '../api/ProductManager.js';
import productsModel from '../api/product.model.js';

const productsRouter = Router();
const manager = new ProductManager();

const productRoutes = (io, PAGE_URL, LIMIT) => 
{ 
    productsRouter.get('/products', async (req, res) => {
        try {
            let limit = req.query.limit;

            if(limit === undefined) limit = LIMIT;
            if(req.query.page === undefined) req.query.page = 0;
            const result = await manager.getProducts(req.query.page * limit, limit);
            const pages = [];
            for(let i = 0; i < result.totalPages; i++) {
                pages.push({index: i, indexPgBar: i+1});
            }

            const pagination = {
                pageUrl: PAGE_URL,
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
            let sort = req.query.sort;
            if(sort!= undefined && sort == 'asc') {
/*                 const sorted = result.doc.sort((a, b) => a.price - b.price) */
                res.render('paginProducts', {products: result.docs, pagination: pagination});
            } else if (sort!= undefined && sort == 'des') {
/*                 const sorted = result.doc.sort((a, b) => a.price - b.price) */
                res.render('paginProducts', {products: result.docs, pagination: pagination});
            } else {
                res.render('paginProducts', {products: result.docs, pagination: pagination});
            }
        } catch (err) {
            res.status(500).send({status: 'EM', error: err});
        };
    });
    return productsRouter
}


export default productRoutes;