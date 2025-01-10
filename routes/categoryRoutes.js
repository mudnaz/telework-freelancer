import { 
    categoryIndex, 
    categoryShow, 
    categoryStore,
    updateCategory,
    deleteCategory
         } from "../controllers/categoryController.js";
import express from 'express';
const router = express.Router();

router.get('/', categoryIndex);
router.get('/:_id', categoryShow);
router.post('/store',categoryStore);
router.put('/:_id',updateCategory);
router.delete('/:_id',deleteCategory);

export default router;