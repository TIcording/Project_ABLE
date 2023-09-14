import express from 'express';
import * as doorController from '../controller/subway_door.js'



const router = express.Router();

router.get('/',  doorController.findAllDoor);

router.get('/:station', doorController.findDoorInfo)

export default router;