import  {Router } from 'express';
import chatController from '../controllers/chat.controller';
const chatRouter = Router();
chatRouter.post('/chatbot', chatController.chatResponse)
export default {chatRouter};