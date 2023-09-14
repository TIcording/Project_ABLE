// 지도 생성
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(37.566535, 126.9779692), // 지도의 중심좌표
    level: 1, // 지도의 확대 레벨
    disableDoubleClick : true
};
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성 (1. 이거 중요!)

kakao.maps.event.addListener(map, 'click', function() {
    const menu = document.querySelector('#menu')
    if (menu.classList.contains('index')){
        menu.classList.remove('index')
        menu.classList.add('hide')
        option.removeAttribute('style')
    }
})

document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);

var lastTouchEnd = 0;

document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    } lastTouchEnd = now;
}, false);

function removePointer() {
    const menu = document.querySelector('#menu');
    const option = document.querySelector('#option');
    if (menu.classList.contains('index')) {
        menu.classList.remove('index');
        menu.classList.add('hide');
        option.removeAttribute('style');
    }
}
// 지도 클릭 시 포인터 삭제
kakao.maps.event.addListener(map, 'click', function() {
    const menu = document.querySelector('#menu');
    const option = document.querySelector('#option');
    if (menu.classList.contains('index')) {
        menu.classList.remove('index');
        menu.classList.add('hide');
        option.removeAttribute('style');
    }
});
