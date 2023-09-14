// API 요청 함수 - 아이디, 이름, 핸드폰 번호로 검색
async function searchUser(id, name, phone) {
    try {

        data = {
            ui_userid: id,
            ui_name: name,
            ui_hp: phone,
        }
        const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/searchUserPw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to search user');
        }
    } catch (error) {
        console.error('Failed to search user:', error);
        throw error;
    }
}


// 클릭 이벤트 핸들러
async function handleSubmit() {


    const id = document.getElementById('input__id').value;
    const name = document.getElementById('input__name').value;
    const phone = document.getElementById('input__hp').value;
    console.log(phone)
    try {
        const result = await searchUser(id, name, phone);
        console.log(result.ui_userid)
        if (result) {
            // 일치하는 값이 있을 때 비밀번호 변경 페이지로 이동
            localStorage.setItem('ui_userid', result.ui_userid);
            localStorage.setItem('ui_name', result.ui_name);
            localStorage.setItem('ui_hp', result.ui_hp);

            window.location.href = `./비밀번호 변경.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`;

        } else {
            // 일치하는 값이 없을 때 메시지 표시 또는 다른 처리
            console.log('일치하는 사용자가 없습니다.');
            
        }
    } catch (error) {
        console.error('Failed to handle submit:', error);
        alert('일치하는 사용자가 없습니다.')
        // 에러 처리 로직 추가
    }
}

// 폼 제출 이벤트 등록
const pwfind = document.getElementById('submit__btn');
pwfind.addEventListener('click', handleSubmit);
