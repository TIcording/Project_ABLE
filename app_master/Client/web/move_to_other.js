const login = document.querySelector('#login')
const taxi = document.querySelector('#taxi')
const ambulance = document.querySelector('#ambulance')
const small_login = document.querySelector('#small_login')
const subway_button = document.querySelector('#subway')
const subway_icon_button = document.querySelector('.subway_icon')
const taxi_icon = document.querySelector('.taxi_icon')
const ambulance_icon = document.querySelector('.ambulance_icon')
const like_icon = document.querySelector('.like')
const address_icon = document.querySelector('.home')





address_icon.addEventListener('click', () =>{
    window.location.href = "../app/주소관리.html";
})

like_icon.addEventListener('click', () =>{
    window.location.href = "../app/즐겨찾기.html";
})

subway_button.addEventListener('click', () =>{
    window.location.href = "../subway/index.html";
})

subway_icon_button.addEventListener('click', () =>{
    window.location.href = "../subway/index.html";
})

ambulance_icon.addEventListener('click', () => {
    window.location.href = "../app/의료보건.html"
})

ambulance.addEventListener('click', () => {
    window.location.href = "../app/의료보건.html";
})


taxi_icon.addEventListener('click', () => {
    window.location.href = "../app/콜택시.html"
})

taxi.addEventListener('click', () => {
    window.location.href = "../app/콜택시.html";
})


small_login.addEventListener('click', () => {
    window.location.href = "../app/로그인창.html";
})


login.addEventListener('click', () => {
    window.location.href = "../app/mypage.html";
})


// 모달창을 자세하게 눌렀을 때 X버튼을 누르면 메인 화면으로 돌아가기
// const detail = document.querySelector('.out_img')
// console.log(detail)
// detail.addEventListener('click', () => {
//     window.location.href = "./map.html"
// })
