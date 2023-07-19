import { Router } from "express";
import { checkIfValid } from '../controllers/isAdmin.js';
import { getChatScreen } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.get('/chat', checkIfValid, getChatScreen);

export default chatRouter;