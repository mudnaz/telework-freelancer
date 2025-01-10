import { 
    favoriteIndex, 
    favoriteShow, 
    favoriteStore,
    updateFavorite,
    deleteFavorite,
    popFavorite
         } from "../controllers/favoriteController.js";
import express from 'express';
const router = express.Router();

router.get('/', favoriteIndex);
router.get('/:_id', favoriteShow);
router.post('/store',favoriteStore);
router.put('/:_id',updateFavorite);
router.delete('/:_id',deleteFavorite);
router.get('/populate/:_id',popFavorite);


export default router;