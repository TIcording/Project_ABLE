import express from 'express';
import * as managerController from '../controller/manager.js'

const router = express.Router();

router.post('/', managerController.createManager)

export default router;