import { 
    subCategoryIndex, 
    subCategoryShow, 
    subCategoryStore,
    updateSubCategory,
    popCategory,
    deleteSubCategory,
             } from "../controllers/subCategoryController.js";
import express from 'express';
const router = express.Router();

router.get('/', subCategoryIndex);
router.get('/:_id', subCategoryShow);
router.post('/store',subCategoryStore);
router.post('/:_id',updateSubCategory);
router.get('/populate/:_id',popCategory);
router.delete('/:_id',deleteSubCategory);

export default router;