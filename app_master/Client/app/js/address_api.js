async function fetchMyPage() {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem('token');
        console.log(token)
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




async function registerAddress() {
    const dropdownPlaces = document.getElementById('dropdown__places');
    const nicknameInput = document.getElementById('nickname__input');
    const addressInput = document.getElementById('address__input');

    const place = dropdownPlaces.value;
    const nickname = nicknameInput.value;
    const address = addressInput.value;

    const data2 = await fetchMyPage(); //
    const ui_idx = data2.ui_idx; 

    // 주소 등록을 처리하는 API 호출

    const data = {
        ui_idx: ui_idx,
        uad_category: place,
        uad_location: nickname,
        uad_address: address
    };

    // API 호출
    fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/address/createAddress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('주소 등록 성공!');
                window.location.href = './주소관리.html'
            } else {
                console.error('주소 등록 실패!');
                // 실패 시 처리를 수행하세요. 예를 들어, 오류 메시지 출력 등
            }
        })
        .catch(error => {
            console.error('API 호출 중 에러:', error);
            // 에러 처리를 수행하세요. 예를 들어, 오류 메시지 출력 등
        });
}


const saveBtn = document.getElementById('save__btn');
saveBtn.addEventListener('click', registerAddress);


