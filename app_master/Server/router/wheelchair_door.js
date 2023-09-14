import express from 'express';
import * as wheelchairController from '../controller/wheelchair_door.js'



const router = express.Router();

router.get('/',  wheelchairController.findLoca);


export default router;