const emailCheckbox = document.getElementById("checkbox__email");
const hpCheckbox = document.getElementById("checkbox__hp");
const textEmail = document.getElementById("text__email");

emailCheckbox.addEventListener("click", function() {
  // 이메일 체크박스가 선택되면 "이메일" 텍스트 유지
  textEmail.textContent = "이메일";
});

hpCheckbox.addEventListener("click", function() {
  // 핸드폰 체크박스가 선택되면 "핸드폰 번호" 텍스트로 변경
  textEmail.textContent = "핸드폰 번호";
});