import express from 'express';
import * as favoriteController from '../controller/favorite.js'
// import { body } from 'express-validator';
// import { validate } from '../middleware/validators.js'
// import { isAuth } from '../middleware/auth.js';

const router = express.Router();

//GET
///favorite
router.get('/', favoriteController.getFavorites)

// GET
// /favorite/:uf_idx (uf_idx로 데이터 찾기)
router.get('/getfavorite/:ui_idx', favoriteController.getFavoritesByFavoriteId)



//POST (User_Routes에 데이터 추가)
router.post('/addfavorite', favoriteController.createFavorites)


//DELETE
// 삭제할 id를 찾아 데이터 삭제
router.delete('/delfavorite/:ui_idx', favoriteController.deleteFavorites)

router.delete('/deleteAll/:ui_idx', favoriteController.deleteFavoritesAll)

router.delete('/deleteSelected/:ui_idx', favoriteController.deleteSelectedFavorites)


export default router;