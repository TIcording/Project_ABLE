// 체크박스 전체 삭제
function del_all(obj){

  //alert(rid);

  let i, sum=0, tag=[], str="";
  let chk = document.getElementsByName(obj);
  let tot = chk.length;
  for (i = 0; i < tot; i++) {
      if (chk[i].checked == true) {
          tag[sum] = chk[i].value;
          sum++;
    //alert(sum);
      }
  }
  //str += "선택갯수 : "+sum;
  if(tag.length > 0) str += tag.join(",");

  alert(str);
//window.location.href="url";

}



let check = false; 
function CheckAll(){ 
  let chk = document.getElementsByName("chk[]"); 
  if(check == false){ 
    check = true; 
    for(let i=0; i<chk.length;i++){ 
      chk[i].checked = true;//모두 체크 
      document.getElementById("ch_all").checked = true;

    } //for
  }else{ 
    check = false; 
    for(let i=0; i<chk.length;i++){ 
      chk[i].checked = false;//모두 해제 
      document.getElementById("ch_all").checked = false;
    }//for
  }
  
  /*
  // jquery 버전 특정 체크박스 체크하기/풀기
  $("#checkbox").prop("checked", true); //id 값으로
  $("#checkbox").prop("checked", false); //id 값으로 
  */
  }

  
  




// 삭제 btn container 보이기
const delete_icon = document.querySelector('#delete__icon__container')
const delete_btn_container = document.querySelector('.delete__checkbtn__container');
delete_icon.addEventListener('click', () => {
  if(delete_btn_container.style.display == "none"){
    delete_btn_container.style.display = "block"
  }else{
    delete_btn_container.style.display = "none"
  }
});
