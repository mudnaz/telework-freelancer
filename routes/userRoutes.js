import express from 'express';
 import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();

import  { index, show, store, update, destroy,login } from '../controllers/userController.js';


router.get('/', index);
router.get('/:user_Id', show);
// router.post('/store', store);
router.post('/store', upload.single('profile_picture'), store);

router.put('/:id',upload.single('profile_picture'),update);
router.delete('/:id', destroy);
router.post('/login',login);

export default router;