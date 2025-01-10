import { 
    messageIndex, 
    messageShow, 
    messageStore,
    updateMessage,
    deleteMessage,
    popMessage
         } from "../controllers/messageController.js";
import express from 'express';
const router = express.Router();

router.get('/', messageIndex);
router.get('/:_id', messageShow);
router.post('/store',messageStore);
router.put('/:_id',updateMessage);
router.delete('/:_id',deleteMessage);
router.get('/populate/:_id',popMessage);


export default router;