import express from 'express';

import { 
    paymentIndex, 
    paymentShow, 
    paymentStore,
    updatePayment,
    deletePayment,
     popPayment,
     popNestedPayment
     
         } from "../controllers/paymentController.js";
const router = express.Router();

router.get('/', paymentIndex);
router.get('/:_id', paymentShow);
router.post('/store', paymentStore);
router.put('/:_id', updatePayment);
router.delete('/:_id',deletePayment);
 router.get('/populate/:_id',popPayment);
 router.get('/popNested/:_id',popNestedPayment);

export default router;