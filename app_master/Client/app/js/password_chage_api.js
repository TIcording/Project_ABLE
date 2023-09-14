async function fetchMyPage() {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            console.log('로그인이 필요합니다.');
            // window.location.href = './로그인창.html';
            reject(new Error('로그인이 필요합니다.'));
            return;
        }

        try {
            const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                document.getElementById('username').textContent = data.ui_name;

                resolve(data);
            } else {
                const errorData = await response.json();
                console.error('마이페이지 요청 실패:', errorData.message);
                // window.location.href = './로그인창.html';
                reject(new Error('마이페이지 요청 실패'));
            }
        } catch (error) {
            console.error('마이페이지 요청 중 오류 발생:', error);
            // window.location.href = './로그인창.html';
            reject(error);
        }
    });
}
fetchMyPage()

// 비밀번호 변경 함수
async function changePassword() {
    try {
        const currentPassword = document.getElementById('currentPasswordInput').value;
        const newPassword = document.getElementById('newPasswordInput').value;
        const confirmPassword = document.getElementById('rePasswordInput').value;

        const token = localStorage.getItem('token');
        const data = await fetchMyPage(); // 마이페이지 정보 조회

        const ui_userid = data.ui_userid;

        // 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (newPassword !== confirmPassword) {
            console.error('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다');
            return;
        }

        const data2 = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        const response = await fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/mypage/changePassword/${ui_userid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data2)
        });

        if (response.ok) {
            console.log('비밀번호 변경이 완료되었습니다');
            window.location.href = './mypage.html'
        } else {
            const errorData = await response.json();
            console.error('비밀번호 변경 실패:', errorData.message);
            // 비밀번호 변경 실패 시 추가 처리 작성
        }
    } catch (error) {
        console.error('비밀번호 변경 중 오류 발생:', error);
        // 오류 발생 시 추가 처리 작성
    }
}

// 비밀번호 변경 버튼 클릭 이벤트 핸들러
document.getElementById('myInfo__button2').addEventListener('click', changePassword);
