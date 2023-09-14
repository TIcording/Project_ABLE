// API 요청 함수
async function changePassword(ui_userid, ui_name, ui_hp, newPassword) {
    try {
        const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/SearchChangePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ui_userid: ui_userid,
                ui_name: ui_name,
                ui_hp: ui_hp,
                newPassword: newPassword
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to change password');
        }
    } catch (error) {
        console.error('Failed to change password:', error);
        throw error;
    }
}

// 비밀번호 변경 처리
async function handleChangePassword() {
    const ui_userid = localStorage.getItem('ui_userid');
    const ui_name = localStorage.getItem('ui_name');
    const ui_hp = localStorage.getItem('ui_hp');

    const newPassword = document.getElementById('newPw').value;
    const newPasswordConfirm = document.getElementById('newPw__check').value;

    if (newPassword !== newPasswordConfirm) {
        alert('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
    }

    try {
        await changePassword(ui_userid, ui_name, ui_hp, newPassword);
        window.location.href = '../web/map.html';
        alert('비밀번호가 성공적으로 변경되었습니다.');
        localStorage.removeItem('ui_userid');
        localStorage.removeItem('ui_name');
        localStorage.removeItem('ui_hp');
    } catch (error) {
        console.error('Failed to change password:', error);

    }
}

// 버튼 클릭 시 비밀번호 변경 처리
const changePasswordButton = document.getElementById('btn');
changePasswordButton.addEventListener('click', handleChangePassword);
