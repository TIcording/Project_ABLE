// 마이페이지 API 요청 함수
async function fetchMyPage() {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('로그인이 필요합니다.');
            window.location.href = './로그인창.html';
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
                document.getElementById('idInput').value = data.ui_userid;
                document.getElementById('nameInput').value = data.ui_name;
                document.getElementById('addressInput').value = data.ui_address;
                document.getElementById('phoneInput').value = data.ui_hp;
                document.getElementById('emailInput').value = data.ui_email;
                document.getElementById('username').textContent = data.ui_name;

                resolve(data);
            } else {
                const errorData = await response.json();
                console.error('마이페이지 요청 실패:', errorData.message);
                window.location.href = './로그인창.html';
                reject(new Error('마이페이지 요청 실패'));
            }
        } catch (error) {
            console.error('마이페이지 요청 중 오류 발생:', error);
            window.location.href = './로그인창.html';
            reject(error);
        }
    });
}

// 마이페이지 접근 시 로그인 여부 확인
const isLoggedIn = localStorage.getItem('token') !== null;
if (!isLoggedIn) {
    console.log('로그인이 필요합니다.');
    window.location.href = './로그인창.html';
} else {
    fetchMyPage().then(() => {
        const logoutButton = document.getElementById('logout');
        logoutButton.addEventListener('click', logout);

        document.getElementById('myInfo__button2').addEventListener('click', handleUpdate);
    }).catch(error => {
        console.error('마이페이지 요청 중 오류 발생:', error);
    });
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('token');
    window.location.href = './로그인창.html';
}

// 마이페이지 수정 완료 버튼 클릭 이벤트 핸들러
async function handleUpdate() {
    try {
        const newName = document.getElementById('nameInput').value;
        const newAddress = document.getElementById('addressInput').value;
        const newPhone = document.getElementById('phoneInput').value;
        const newEmail = document.getElementById('emailInput').value;
        

        const token = localStorage.getItem('token');
        const data = await fetchMyPage(); // 마이페이지 정보 조회

        const ui_userid = data.ui_userid;

        const updatedData = {
            ui_userid: ui_userid,
            ui_name: newName,
            ui_address: newAddress,
            ui_hp: newPhone,
            ui_email: newEmail

        };

        const response = await fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/mypage/${ui_userid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });


        if (response.ok) {
            console.log('정보 수정이 완료되었습니다.');
            // 수정 성공 시 추가 처리 작성
            location.reload();
        } else {
            const errorData = await response.json();
            console.error('정보 수정 실패:', errorData.message);
            // 수정 실패 시 추가 처리 작성
        }
    } catch (error) {
        console.error('정보 수정 중 오류 발생:', error);
        // 오류 발생 시 추가 처리 작성
    }
}

