// HTML 요소 선택
const faqContainer = document.getElementById('FaQ__text__container');

// API 호출 및 데이터 표시 함수
async function displayFAQ() {
    try {
        const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/FAQ'); // API 엔드포인트에 요청 보내기
        const faqs = await response.json(); // 응답 데이터를 JSON 형식으로 파싱

        // 데이터를 질문과 답변 형태로 매핑하여 표시
        faqs.forEach((faq) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('Question');
            questionDiv.innerHTML = `<p>Q.${faq.fi_detail}</p>`;
            faqContainer.appendChild(questionDiv);

            const answerDiv = document.createElement('div');
            answerDiv.classList.add('Answer');
            answerDiv.innerHTML = `<p>A.${faq.fi_answer}</p>`;
            faqContainer.appendChild(answerDiv);
        });
    } catch (error) {
        console.error('FAQ 데이터를 가져오는 중 오류가 발생했습니다.', error);
    }
}

// 페이지 로드 시 FAQ 데이터 표시
displayFAQ();
