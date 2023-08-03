import { Router } from "express";
import { mockingProducts, testAllLogs } from "../controllers/test.controller.js";
import { addLog } from "../customLogger.js";


const testRouter = Router();

testRouter.get('/mockingproducts', mockingProducts);
testRouter.get('/loggerTest', addLog, testAllLogs);

export default testRouter;