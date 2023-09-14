const submitButton = document.getElementById('submit_btn');
submitButton.addEventListener('click', () => {
    if (!checkUserId()) {
        return;
    } else if (!checkPassword()) {
        return;
    } else if (!checkName()) {
        return;
    } else if (!checkEmail()) {
        return;
    } else if (!checkHp()) {
        return;
    } else if (!checkAddress()) {
        return;
    }

    // signup();
});

function showErrorMessage(element, message) {
    const errorContainer = element.parentNode.querySelector('.error-message');
    if (errorContainer) {
        errorContainer.textContent = message;
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        element.parentNode.appendChild(errorMessage);
    }
}

function hideErrorMessage(element) {
    const errorContainer = element.parentNode.querySelector('.error-message');
    if (errorContainer) {
        errorContainer.remove();
    }
}

function checkUserId() {
    const userIdInput = document.getElementById('input__id');
    const userId = userIdInput.value.trim();
    if (userId === '') {
        showErrorMessage(userIdInput, '아이디를 입력해주세요!');
        return false;
    }

    const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
    if (!idRegExp.test(userId)) {
        showErrorMessage(userIdInput, '아이디는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!');
        return false;
    }

    hideErrorMessage(userIdInput);
    return true;
}

function checkPassword() {
    const passwordInput = document.getElementById('input__pw');
    const password = passwordInput.value;
    if (password === '') {
        showErrorMessage(passwordInput, '비밀번호를 입력해주세요!');
        return false;
    }

    const passwordCheckInput = document.getElementById('input__pw__check');
    const passwordCheck = passwordCheckInput.value;
    if (passwordCheck === '') {
        showErrorMessage(passwordCheckInput, '비밀번호 확인을 입력해주세요!');
        return false;
    }

    const passwordRegExp = /^[a-zA-Z0-9]{4,12}$/;
    if (!passwordRegExp.test(password)) {
        showErrorMessage(passwordInput, '비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!');
        return false;
    }

    if (password !== passwordCheck) {
        showErrorMessage(passwordCheckInput, '두 비밀번호가 맞지 않습니다.');
        return false;
    }

    const userIdInput = document.getElementById('input__id');
    const userId = userIdInput.value.trim();
    if (password === userId) {
        showErrorMessage(passwordInput, '비밀번호와 아이디는 동일할 수 없습니다.');
        return false;
    }

    hideErrorMessage(passwordInput);
    hideErrorMessage(passwordCheckInput);
    return true;
}

function checkName() {
    const nameInput = document.getElementById('input__name');
    const name = nameInput.value.trim();
    if (name === '') {
        showErrorMessage(nameInput, '이름을 입력해주세요!');
        return false;
    }

    const nameRegExp = /^[가-힣]{2,10}$/;
    if (!nameRegExp.test(name)) {
        showErrorMessage(nameInput, '이름이 올바르지 않습니다.');
        return false;
    }

    hideErrorMessage(nameInput);
    return true;
}

function checkEmail() {
    const emailInput = document.getElementById('input__email');
    const email = emailInput.value.trim();
    if (email === '') {
        showErrorMessage(emailInput, '이메일을 입력해주세요!');
        return false;
    }

    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (!emailRegExp.test(email)) {
        showErrorMessage(emailInput, '이메일 형식이 올바르지 않습니다!');
        return false;
    }

    hideErrorMessage(emailInput);
    return true;
}

function checkHp() {
    const hpInput = document.getElementById('input__hp');
    const hp = hpInput.value.trim();
    if (hp === '') {
        showErrorMessage(hpInput, '핸드폰 번호를 입력해주세요!');
        return false;
    }

    const hpRegExp = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
    if (!hpRegExp.test(hp)) {
        showErrorMessage(hpInput, '핸드폰 번호는 "010-0000-0000" 양식으로 입력하세요!');
        return false;
    }

    hideErrorMessage(hpInput);
    return true;
}

function checkAddress() {
    const addressInput = document.getElementById('input__address');
    const address = addressInput.value.trim();
    if (address === '') {
        showErrorMessage(addressInput, '주소를 입력해주세요!');
        return false;
    }

    hideErrorMessage(addressInput);
    return true;
}

const inputElements = document.querySelectorAll('.inputBox');
inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
        const errorContainer = inputElement.parentNode.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.remove();
        }
    });
});
