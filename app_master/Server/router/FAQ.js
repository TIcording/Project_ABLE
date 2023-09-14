import express from 'express';
import * as FAQController from '../controller/FAQ.js'

const router = express.Router();

router.get('/', FAQController.getFAQ);

export default router;