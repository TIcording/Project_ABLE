import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message: '인증 에러!' };

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.jwt.secretkey);
        console.log(decoded)
        const user = await userRepository.findByUserid(decoded.id);
        console.log(user)

        if (!user) {
            return res.status(403).json(AUTH_ERROR);
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(402).json(AUTH_ERROR);
    }
};

