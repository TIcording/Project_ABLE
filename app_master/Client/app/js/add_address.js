// 주소를 검색해서 불러오면 생기는 div

const search_icon = document.querySelector('#search__icon__container')
const address_container = document.querySelector('#adderess__container');
search_icon.addEventListener('click', () => {
  if(address_container.style.display == "none"){
    address_container.style.display = "block"
  }else{
    address_container.style.display = "none"
  }
});