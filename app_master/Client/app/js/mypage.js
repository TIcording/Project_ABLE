// 내정보 수정 
const myInfo_arrowDown = document.querySelector('#myInfo__arrow__down')
const myInfoTextContainer = document.querySelector('#myInfo__text__container');
myInfo_arrowDown.addEventListener('click', () => {
  if(myInfoTextContainer.style.display == "none"){
    myInfo_arrowDown.src = './images/arrow-up.png';
    myInfoTextContainer.style.display = "block"
  }else{
    myInfo_arrowDown.src = './images/arrow-down.png'
    myInfoTextContainer.style.display = "none"
  }
});

const myInfo__title = document.querySelector('#myInfo__title')
myInfo__title.addEventListener('click', () => {
  if(myInfoTextContainer.style.display == "none"){
    myInfo_arrowDown.src = './images/arrow-up.png';
    myInfoTextContainer.style.display = "block"
  }else{
    myInfo_arrowDown.src = './images/arrow-down.png'
    myInfoTextContainer.style.display = "none"
  }
});

// FAQ
const Faq_arrowDown = document.querySelector('#Faq__arrow__down')
const FaqTextContainer = document.querySelector('#FaQ__text__container');
Faq_arrowDown.addEventListener('click', () => {
  if(FaqTextContainer.style.display == "none"){
    Faq_arrowDown.src = './images/arrow-up.png';
    FaqTextContainer.style.display = "block"
  }else{
    Faq_arrowDown.src = './images/arrow-down.png'
    FaqTextContainer.style.display = "none"
  }
});

const Faq__title = document.querySelector('#FaQ__title')
Faq__title.addEventListener('click', () => {
  if(FaqTextContainer.style.display == "none"){
    Faq_arrowDown.src = './images/arrow-up.png';
    FaqTextContainer.style.display = "block"
  }else{
    Faq_arrowDown.src = './images/arrow-down.png'
    FaqTextContainer.style.display = "none"
  }
});


//CS
const CS_arrowDown = document.querySelector('#CS__arrow__down')
const CSTextContainer = document.querySelector('#CS__text__container');
CS_arrowDown.addEventListener('click', () => {
  if(CSTextContainer.style.display == "none"){
    CS_arrowDown.src = './images/arrow-up.png';
    CSTextContainer.style.display = "block"
  }else{
    CS_arrowDown.src = './images/arrow-down.png'
    CSTextContainer.style.display = "none"
  }
});

const CS__title = document.querySelector('#CS__title')
CS__title.addEventListener('click', () => {
  if(CSTextContainer.style.display == "none"){
    CS_arrowDown.src = './images/arrow-up.png';
    CSTextContainer.style.display = "block"
  }else{
    CS_arrowDown.src = './images/arrow-down.png'
    CSTextContainer.style.display = "none"
  }
});

// CS 문의하기 
const CS_Question = document.querySelector('#CS__question')
const CSTextArea = document.querySelector('#CS__textarea');
CS_Question.addEventListener('click', () => {
  if(CSTextArea.style.display == "none"){
    CS_Question.src = './images/arrow-up.png';
    CSTextArea.style.display = "block"
  }else{
    CS_Question.src = './images/arrow-down.png'
    CSTextArea.style.display = "none"
  }
});

// CS 답변보기 
const CS__answer = document.querySelector('#CS__answer')
const CS_answerArea = document.querySelector('#CS__answer__container');
CS__answer.addEventListener('click', () => {
  if(CS_answerArea.style.display == "none"){
    CS__answer.src = './images/arrow-up.png';
    CS_answerArea.style.display = "block"
  }else{
    CS__answer.src = './images/arrow-down.png'
    CS_answerArea.style.display = "none"
  }
});

//Setting
const setting_arrowDown = document.querySelector('#setting__arrow__down')
const settingTextContainer = document.querySelector('#setting__text__container');
setting_arrowDown.addEventListener('click', () => {
  if(settingTextContainer.style.display == "none"){
    setting_arrowDown.src = './images/arrow-up.png';
    settingTextContainer.style.display = "block"
  }else{
    setting_arrowDown.src = './images/arrow-down.png'
    settingTextContainer.style.display = "none"
  }
});

const setting__title = document.querySelector('#setting__title')
setting__title.addEventListener('click', () => {
  if(settingTextContainer.style.display == "none"){
    setting_arrowDown.src = './images/arrow-up.png';
    settingTextContainer.style.display = "block"
  }else{
    setting_arrowDown.src = './images/arrow-down.png'
    settingTextContainer.style.display = "none"
  }
});

document.getElementById('myInfo__button1').addEventListener('click',() =>{
  window.location.reload()
})

document.getElementById('myInfo__button3').addEventListener('click',() =>{
  window.location.href = "./password_change.html";
})



