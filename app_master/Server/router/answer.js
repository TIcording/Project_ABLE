import express from 'express';
import * as answerController from '../controller/answer.js'
import { body, param, validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/answer.js';


const router = express.Router();

const validateAnswer = [
    body('ua_contents')
        .trim()
        .isLength({ min: 4 })
        .withMessage('ua_contents는 최소 4자이상 입력하세요!'),
    validate
]

router.post('/',  validateAnswer, answerController.createAnswer);

router.get('/:ui_userid', isAuth, answerController.getAnswer)

export default router;