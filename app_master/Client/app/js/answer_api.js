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


const submitButton = document.getElementById('CS__submit__btn');
const answerContainer = document.getElementById('CS__answer__container');
submitButton.addEventListener('click', async () => {
    // const answerContainer = document.getElementById('CS__answer__container');

    const textArea = document.getElementById('textArea');
    const inputText = textArea.value;

    const textTitle = document.getElementById('answerTitleInput')
    const inputTitle = textTitle.value

    // 입력된 텍스트를 JSON 형식으로 변환
    // const token = localStorage.getItem('token');
    const data2 = await fetchMyPage(); // 마이페이지 정보 조회

    const ui_userid = data2.ui_userid;
    const ui_name = data2.ui_name
    const data = {
        ua_contents: inputText,
        ui_userid: ui_userid,
        ui_name: ui_name,
        ua_title: inputTitle
    };

    try {
        const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/answer/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // 성공적으로 서버로 전송됨

            if(confirm('문의가 완료되었습니다.')){
                answerContainer.style.display = 'none'
            }
            // answerContainer.style.display = 'none'

        } else {
            // 서버로의 전송 실패
            console.error('전송 실패:', response.status);
        }
    } catch (error) {
        console.error('전송 중 오류 발생:', error);
    }
});

// const answerContainer = document.getElementById('CS__answer__container');

// 관리자의 질문과 답변을 가져와서 표시하는 함수
async function fetchAndDisplayAdminQuestion() {
    try {

        const token = localStorage.getItem('token');
        const data2 = await fetchMyPage(); // 마이페이지 정보 조회
        const ui_userid = data2.ui_userid
        const response = await fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/answer/${ui_userid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();

        // 관리자의 질문과 답변을 반복하여 HTML 요소를 동적으로 생성
        data.forEach((item) => {
            const questionTitle = item.ua_title;
            const answerContent = item.ua_answer;

            const questionElement = document.createElement('p');
            questionElement.textContent = questionTitle;
            answerContainer.appendChild(questionElement);

            const answerElement = document.createElement('p');
            answerElement.textContent = answerContent;
            answerContainer.appendChild(answerElement);
        });
    } catch (error) {
        console.error('Error fetching admin question:', error);
        // 오류 처리 로직
    }
}

fetchAndDisplayAdminQuestion();



