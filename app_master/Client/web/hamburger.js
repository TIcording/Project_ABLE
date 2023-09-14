const menu = document.querySelector('#menu')
const hamburger = document.querySelector('.menu')
const map_click = document.querySelector('#map')
const option = document.querySelector('#option')
// hamburger.addEventListener('click', () => {
//     if(!menu.classList.contains('index')){
//         menu.classList.add('index')
//     }else{
//         menu.classList.remove('index')
//     }
// })
hamburger.addEventListener('click', () => {
    if(!menu.classList.contains('index')){
        menu.classList.add('index')
        menu.classList.remove('hide')
        option.style.display="none"
    }
})


menu.addEventListener('click', () => {
    if(menu.classList.contains('index')){
        menu.classList.remove('index')
        menu.classList.add('hide')
    }
})
// 지도를 누르고 싶은데 햄버거도 같이 눌림..
// 햄버거가 지도에 속해서 그런듯함...
