function sendit(){
    // alert('회원가입 버튼 클릭!')
    const userid = document.getElementById('input__id')
    const userpw = document.getElementById('input__pw')
    const userpw_re = document.getElementById('input__pw__check')
    const username = document.getElementById('input__name')
    const hp = document.getElementById('input__hp')
    const email = document.getElementById('input__email')
    // const ssn1 = document.getElementById('ssn1')
    // const ssn2 = document.getElementById('ssn2')
    // const detailAddress = document.getElementById('input__address')

    // 정규표현식
    const expIdText = /^[A-Za-z0-9]{4,20}$/

    // 비밀번호 정규 표현식 
    const expPwText =/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,24}$/

    //이름 정규표현식 
    const expNameText = /[a-zA-Z가-힣]{2,15}$/

    //휴대폰번호 정규표현식 
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/

    //이메일 정규표현식
    const expEmailTxt = /^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-\.]+\.+[A-Za-z0-9\-\.]+$/

    //주민번호1 정규표현식
    // const expSsn1Txt = /^[0-9]{0,6}$/

    //주민번호2 정규표현식
    // const expSsn2Txt = /^[0-9]{0,7}$/

    // 상세주소 정규표현식
    // const expDetailAddressTxt = /[가-힣0-9]$/

    // 아이디가 정규표현식에 맞지않았을때
    if(!expIdText.test(userid.value)){   
        alert('아이디는 4자 이상 20자 이하의 영문자로 입력하세요.')
        userid.focus()   // userid로 커서가 가게함
        return false
    }
    // 비밀번호가 정규표현식에 맞지않았을때
    if(!expPwText.test(userpw.value)){   
        alert('비밀번호는 8~24자리의 영문자(대문자 1개 이상), 숫자, 특수문자를 포함하여야 합니다.')
        userpw.focus()   
        return false
    }
    // 이름이 정규표현식에 맞지않았을때
    if(!expNameText.test(username.value)){   
        alert('이름은 두 글자 이상의 영문 또는 한글로 입력하여야 합니다.')
        username.focus()   
        return false
    }

    // 핸드폰번호가 정규표현식에 맞지않았을때
    if(!expHpText.test(hp.value)){   
        alert('핸드폰 번호를 확인하세요. ')
        hp.focus()   
        return false
    }

    // 이메일이 정규표현식에 맞지않았을때
    if(!expEmailTxt.test(email.value)){   
        alert('이메일을 확인하세요. 이메일 예) example@gmail.com')
        email.focus()   
        return false
    }

    // 주민등록번호 앞자리가 정규표현식에 맞지않았을때
    // if(!expSsn1Txt.test(ssn1.value)){   
    //     alert('주민등록번호 앞자리는 6자리 이하의 숫자만 입력하세요.')
    //     ssn1.focus()   
    //     return false
    // }

    // // 주민등록번호 뒷자리가 정규표현식에 맞지않았을때
    // if(!expSsn2Txt.test(ssn2.value)){   
    //     alert('주민등록번호 뒷자리는 7자리 이하의 숫자만 입력하세요.')
    //     ssn2.focus()   
    //     return false
    // }

    // 상세주소가 정규표현식에 맞지않았을때
    // if(!expDetailAddressTxt.test(detailAddress.value)){   
    //     alert('상세주소를 입력하세요.')
    //     detailAddress.focus()   
    //     return false
    // }
    
    // 비밀번호와 비밀번호 확인이 다른경우
    if(userpw.value != userpw_re.value){
        alert('비밀번호와 비밀번호 확인의 값이 다릅니다')
        userpw.focus()
        return false;
    }

    
}

