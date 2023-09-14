// 이메일
async function fetchIdByEmail(username, email) {
    try {
        data = {
            ui_name: username,
            ui_email: email,
        }
        console.log(data)
        const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/findUserByEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 쿼리 매개변수로 데이터 전달
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch ID');
        }
    } catch (error) {
        console.error('Failed to fetch ID:', error);
        throw error;
    }
}

// hp
async function fetchIdByPhone(username, phone) {
    try {
        data = {
            ui_name: username,
            ui_hp: phone,
        }
        console.log(data)
        const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/findUserByHp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 쿼리 매개변수로 데이터 전달
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch ID');
        }
    } catch (error) {
        console.error('Failed to fetch ID:', error);
        throw error;
    }
}


async function findId() {
    const choice = document.querySelector('input[name="choice"]:checked').value;
    const username = document.getElementById('input__name').value;

    if (choice === 'e-mail') {
        const email = document.getElementById('input__email').value;
        try {
            const id = await fetchIdByEmail(username, email);
            console.log('아이디:', id.ui_userid);
            alert('아이디: ' + id.ui_userid)
        } catch (error) {
            console.error('이메일로 아이디 조회에 실패했습니다:', error);
            // 에러 처리 로직을 추가하세요.
        }
    } 
    
    else if (choice === 'hp') {
        const phone = document.getElementById('input__email').value;
        try {
            const id = await fetchIdByPhone(username, phone);
            console.log('아이디:', id.ui_userid);
            alert('아이디: ' + id.ui_userid)
        } catch (error) {
            console.error('핸드폰 번호로 아이디 조회에 실패했습니다:', error);
            // 에러 처리 로직을 추가하세요.
        }
    }
}

// 버튼 클릭 시 아이디 찾기 요청
const findIdButton = document.getElementById('submit__btn');
findIdButton.addEventListener('click', findId);
