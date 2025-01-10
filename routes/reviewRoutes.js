import express from 'express';

import { 
    reviewIndex, 
    reviewShow, 
    reviewStore,
    updateReview,
    deleteReview,
     popReview
     
         } from "../controllers/reviewController.js";
const router = express.Router();

router.get('/', reviewIndex);
router.get('/:_id', reviewShow);
router.post('/store', reviewStore);
router.put('/:_id', updateReview);
router.delete('/:_id',deleteReview);
 router.get('/populate/:_id',popReview);

export default router;