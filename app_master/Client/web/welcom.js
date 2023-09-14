// 토큰 값 가져오기
const token = localStorage.getItem('token');

// 토큰 값이 있는지 확인
if (token) {
    // API 호출을 통해 사용자 정보 가져오기
    fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                // 응답이 성공적인 경우 사용자 정보 가져오기
                return response.json();
            } else {
                throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
            }
        })
        .then(data => {
            const welcomeMessage = document.getElementById('welcomeMessage');
            welcomeMessage.textContent = `환영합니다, ${data.ui_name}님!`;

            const loginText = document.getElementById('small_login');
            loginText.textContent = '로그아웃';
            loginText.addEventListener('click', logout); // 로그아웃 클릭 이벤트 핸들러 등록
        })
        .catch(error => {
            console.error(error);

        });
} else {
    // 토큰 값이 없을 경우 로그인 페이지로 리다이렉션
    const loginMessage = document.getElementById('welcomeMessage');
    loginMessage.textContent = '로그인을 하세요';
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('token'); // 토큰 제거하여 로그아웃
}