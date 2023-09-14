/*
    회원가입  -> post, /signup 일때 표시
    name  : 빈문자 X(notEmpty())
    email : 이메일 형식 체크, 모두 소문자로 변경
    url   : url 체크(isURL())

    로그인 -> post, /login
    username : 공백X, 빈문자X
    password : 공백X, 최소4자이상
*/

//강사님 코드

import express from 'express';
import {body} from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authjController from '../controller/auth.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

const validateCredential =[
    body('ui_userid')
        .trim()
        .notEmpty()
        .isLength({min:3})
        .withMessage("아이디는 최소 4자입력"),
    body('ui_password')
        .trim()
        .isLength({min:3})
        .withMessage("비밀번호는 최소 4자이상 입력하세요"),
    validate
]

const validateSignup = [
    // 위에것 복사해오기
    ...validateCredential,
    body('ui_name').notEmpty().withMessage("이름을 꼭입력하세용"),
    body('ui_email').isEmail().normalizeEmail().withMessage("이메일 형식을 지켜주세요"),
    body('ui_address').notEmpty().withMessage("주소를 입력하세요"),
    body('ui_hp').notEmpty().withMessage("번호를 입력하세요")
    
    .optional({nullable: true, checkFalsy: true}),
    validate
]


router.post('/signup',validateSignup, authjController.signup)

router.post('/login',validateCredential, authjController.login)

router.get('/me',isAuth,authjController.me)  

router.get('/mypage/:ui_userid',isAuth, authjController.getUserInfo)

router.put('/mypage/:ui_userid', isAuth, authjController.updateUserInfo);

router.put('/SearchChangePassword', authjController.SearchchangePassword);

router.put('/mypage/changePassword/:ui_userid', authjController.changePassword);

router.post('/findUserByEmail', authjController.findUseridByEmail)

router.post('/findUserByHp', authjController.findUseridByHp)

router.post('/searchUserPw', authjController.findPw)



export default router;

