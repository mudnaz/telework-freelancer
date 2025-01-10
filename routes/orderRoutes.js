import express from 'express';

import { 
    ordersIndex,
    ordersShow,
    orderStore,
    deleteOrder,
    updateOrder,
    popOrder
} from "../controllers/orderController.js";

const router = express.Router();
router.get('/', ordersIndex);
router.get('/:_id', ordersShow);
router.post('/store',orderStore);
router.put('/:_id',  updateOrder);
router.delete('/:_id',deleteOrder);
router.get('/populate/:_id',popOrder);
// router.get('/populate/:_id',getServiceWithNestedCategory);


export default router;