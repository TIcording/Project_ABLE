import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signup(req, res) {

    const { ui_userid, ui_password, ui_name, ui_email, ui_address, ui_hp } = req.body;
    const found = await userRepository.findByUserid(ui_userid);
    if (found) {
        return res.status(409).json(found);
    }
    const hashed = await bcrypt.hash(ui_password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        ui_userid,
        ui_password: hashed,
        ui_name,
        ui_email,
        ui_address,
        ui_hp

    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, ui_userid });
}

export async function login(req, res) {

    const { ui_userid, ui_password } = req.body;
    console.log(ui_userid)
    const user = await userRepository.findByUserid(ui_userid);
    console.log(user)
    if (!user) {
        return res.status(401).json({ message: '요청한 아이디가 존재하지 않습니다' });
    }

    const isValidpassword = await bcrypt.compare(ui_password, user.ui_password);
    if (!isValidpassword) {
        return res.status(401).json({ message: '아이디 또는 비밀번호를 확인하세요' });
    }
    const token = createJwtToken(user.ui_userid);

    res.status(200).json({ token, ui_userid });
}


export async function me(req, res, next) {
    const ui_userid = req.user.ui_userid; // 사용자 식별자 가져오기
    console.log(ui_userid)
    const user = await userRepository.findByUserid(ui_userid);
    if (!user) {
        return res.status(404).json({ message: '사용자가 존재하지 않습니다' });
    }
    res.status(200).json(user); // 사용자 정보 반환
}

function createJwtToken(id) {
    const token = jwt.sign({ id }, config.jwt.secretkey, { expiresIn: config.jwt.expiresInsec });
    return token;
}



export const getUserInfo = async (req, res) => {
    try {
        const { ui_userid } = req.params;

        // 사용자 정보 조회 로직
        const user = await userRepository.findByMyPage(ui_userid);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 필요한 정보 추출
        const userInfo = {
            ui_name: user.ui_name,
            ui_address: user.ui_address,
            ui_hp: user.ui_hp,
            ui_password: user.ui_password
        };

        res.status(200).json(userInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserInfo = async (req, res) => {
    try {
        const { ui_userid } = req.params;
        const { ui_name, ui_address, ui_hp, ui_email, ui_password } = req.body;

        const updatedFields = {};

        if (ui_name) {
            updatedFields.ui_name = ui_name;
        }

        if (ui_address) {
            updatedFields.ui_address = ui_address;
        }


        if (ui_hp) {
            updatedFields.ui_hp = ui_hp;
        }

        if (ui_email) {
            updatedFields.ui_email = ui_email;
        }

        if (ui_password) {
            updatedFields.ui_password = ui_password;
        }

        const updatedRows = await userRepository.updateByMyPage(ui_userid, updatedFields);


        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 비밀번호 변경 API 엔드포인트
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        const ui_userid = req.params.ui_userid;

        // 기존 비밀번호 일치 여부 확인
        const user = await userRepository.findByUserid(ui_userid);
        if (!user) {
            return res.status(404).json({ message: '사용자가 존재하지 않습니다' });
        }

        const isValidPassword = await bcrypt.compare(currentPassword, user.ui_password);
        if (!isValidPassword) {
            return res.status(401).json({ message: '기존 비밀번호가 일치하지 않습니다' });
        }

        // 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: '새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다' });
        }

        // 기존 비밀번호와 새로운 비밀번호가 같은 경우 처리
        if (currentPassword === newPassword) {
            return res.status(400).json({ message: '새로운 비밀번호가 기존 비밀번호와 동일합니다' });
        }

        // 새로운 비밀번호 유효성 검사 등 필요한 로직 수행

        // 비밀번호 변경
        const hashedNewPassword = await bcrypt.hash(newPassword, config.bcrypt.saltRounds);
        const updatedRows = await userRepository.updateByMyPage(ui_userid, {
            ui_password: hashedNewPassword
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: '사용자가 존재하지 않습니다' });
        }

        res.status(200).json({ message: '비밀번호 변경이 완료되었습니다' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '내부 서버 오류입니다' });
    }
};

export async function SearchchangePassword(req, res) {

    const { ui_userid, ui_name, ui_hp, newPassword } = req.body;
    const found = await userRepository.findBySearchUserPw(ui_userid,ui_name,ui_hp);
    if (!found) {
        return res.status(409).json({ message: `${ui_userid}이 없습니다.` });
    }
    console.log(newPassword)
    const hashed = await bcrypt.hash(newPassword, config.bcrypt.saltRounds);
    const updatedRows = await userRepository.updateByMyPage(ui_userid, {
        ui_password: hashed
    });
    const token = createJwtToken(ui_userid);
    res.status(200).json({ message: '비밀번호 변경이 완료되었습니다' });
}

export const findUseridByEmail = async (req, res) => {
    try {
        // 예외가 발생할 수 있는 코드 작성
        const { ui_name, ui_email } = req.body;
        const user = await userRepository.findOneIDByEmail(ui_name, ui_email);
        console.log(user)

        if (!user) {
            throw new Error('User not found');
        }

        res.json(user);
    } catch (error) {
        // 예외 처리
        console.error(error);
        res.status(500).json({ message: 'Failed to find user' });
    }
}

export const findUseridByHp = async (req, res) => {
    try {
        // 예외가 발생할 수 있는 코드 작성
        const { ui_name, ui_hp } = req.body;
        const user = await userRepository.findOneIDByHp(ui_name, ui_hp);
        console.log(user)

        if (!user) {
            throw new Error('User not found');
        }

        res.json(user);
    } catch (error) {
        // 예외 처리
        console.error(error);
        res.status(500).json({ message: 'Failed to find user' });
    }
}


export const findPw = async (req, res) => {
    try {
        const { ui_userid, ui_name, ui_hp } = req.body;
        console.log(ui_name)
        // 데이터베이스에서 해당 정보로 조회
        const user = await userRepository.findByUserPw(ui_userid, ui_name, ui_hp);
        console.log(user)
        if (!user) {
            throw new Error('User not found');
        }

        res.json(user)

    } catch (error) {
        console.error('Failed to check user:', error);
        return res.status(500).json({ message: 'Failed to check user' });
    }
}
