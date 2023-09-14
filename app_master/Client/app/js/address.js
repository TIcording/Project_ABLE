// 주소 목록 버튼 누르면 해당 주소 목록만 보이기
const buttons = document.querySelector('.list__btn')



// 수정아이콘 누르면 edit div 보이기
// home
const edit_icon_home = document.querySelector('#edit__icon__home')
const edit_container_home = document.querySelector('#edit__container__home');
edit_icon_home.addEventListener('click', () => {
  if(edit_container_home.style.display == "none"){
    edit_container_home.style.display = "block"
  }else{
    edit_container_home.style.display = "none"
  }
});

// school
