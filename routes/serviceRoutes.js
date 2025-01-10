import express from 'express';
import upload from '../middleware/uploadMiddleware.js'; 

import { 
    serviceIndex, 
    serviceShow, 
    serviceStore,
    updateService,
    deleteService,
    // popServices,
    getServiceWithNestedCategory 
         } from "../controllers/serviceController.js";
const router = express.Router();

router.get('/', serviceIndex);
router.get('/:_id', serviceShow);
router.post('/store', upload.array('images'), serviceStore);
router.put('/:_id',  upload.array('images'), updateService);
router.delete('/:_id',deleteService);
// router.get('/populate/:_id',popServices);
router.get('/populate/:_id',getServiceWithNestedCategory);

export default router;