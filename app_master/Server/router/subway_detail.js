import express from 'express';
import * as detailController from '../controller/subway_detail.js'



const router = express.Router();

router.get('/',  detailController.findAllConv);

router.get('/:station', detailController.findToiletCnt)

router.get('station_detail_page',)
// -->station_detail_page.html 
export default router;