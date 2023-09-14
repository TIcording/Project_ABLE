// 로그인 API 요청 함수
async function login() {
    const ui_userid = document.getElementById('id__input').value;
    const ui_password = document.getElementById('pw__input').value;

    // API 요청
    const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ui_userid, ui_password })
    });

    // 응답 처리
    if (response.ok) {
        // 로그인 성공
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token); // 토큰 저장
        
        // 메인 페이지로 리다이렉션
        window.location.href = '../web/map.html';
        console.log('로그인 성공');
    } else {
        // 로그인 실패
        const errorData = await response.json();
        console.error('로그인 실패:', errorData.message);
    }
}


// 로그인 버튼 클릭 이벤트 핸들러 등록
const loginBtn = document.getElementById('login__btn');
loginBtn.addEventListener('click', login);

