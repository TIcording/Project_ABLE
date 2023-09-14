


document.getElementById('myInfo__button1').addEventListener('click', () => {
    window.location.reload()
})

// 비밀번호 필드에 입력된 값을 마스킹 처리하는 함수
function maskPassword(field) {
    const maskingChar = '*'; // 마스킹 문자

    // 입력된 값 가져오기
    const input = field.value;

    // 마스킹 처리된 값 생성
    const maskedValue = maskingChar.repeat(input.length);

    // 마스킹된 값을 필드에 설정
    field.value = maskedValue;
}

// 비밀번호 필드
const passwordInput = document.getElementById('currentPasswordInput');

// 입력 이벤트 리스너 등록
// passwordInput.addEventListener('input', function () {
//     maskPassword(this);
// });

// const passwordInput2 = document.getElementById('newPasswordInput');

// // 입력 이벤트 리스너 등록
// passwordInput2.addEventListener('input', function () {
//     maskPassword(this);
// });

// const passwordInput3 = document.getElementById('rePasswordInput');

// // 입력 이벤트 리스너 등록
// passwordInput3.addEventListener('input', function () {
//     maskPassword(this);
// });
