import { Router } from "express";
import { mockingProducts } from "../controllers/test.controller.js";


const testRouter = Router();

testRouter.get('/mockingproducts', mockingProducts);

export default testRouter;