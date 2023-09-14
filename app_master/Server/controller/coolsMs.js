// coolsms 모듈 import
const coolsms = require('coolsms');
import coolsms from 'coolsms'



// coolsms 설정
const coolSmsOptions = {
    apiKey: 'YOUR_API_KEY',
    apiSecret: 'YOUR_API_SECRET',
};

// coolsms 인스턴스 생성
const coolSms = new coolsms(coolSmsOptions);

// 아이디 찾기 요청 처리
async function findId(request, response) {
    // 요청된 이메일 또는 핸드폰 번호
    const { email, phone } = request.body;

    // 데이터베이스에서 해당 사용자 정보 조회
    const user = db.findUserByEmailOrPhone(email, phone);

    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    try {
        // coolsms를 사용하여 SMS 전송
        const message = `Your username is: ${user.username}`;
        const result = await coolSms.sendSMS({
            to: user.phone,
            text: message,
        });

        response.json({ message: 'Username sent successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to send SMS' });
    }
}

// 비밀번호 찾기 요청 처리
async function findPassword(request, response) {
    // 요청된 이메일 또는 핸드폰 번호
    const { email, phone } = request.body;

    // 데이터베이스에서 해당 사용자 정보 조회
    const user = db.findUserByEmailOrPhone(email, phone);

    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    try {
        // 임시 비밀번호 생성
        const tempPassword = generateTempPassword();

        // coolsms를 사용하여 SMS 전송
        if (user.phone) {
            const message = `Your temporary password is: ${tempPassword}`;
            const result = await coolSms.sendSMS({
                to: user.phone,
                text: message,
            });
        }

        // 임시 비밀번호로 사용자 정보 업데이트
        db.updateUserPassword(user.id, tempPassword);

        response.json({ message: 'Temporary password sent successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to send SMS' });
    }
}
