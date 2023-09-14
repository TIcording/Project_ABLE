async function fetchMyPage() {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            console.log('로그인이 필요합니다.');
            // window.location.href = './로그인창.html';
            reject(new Error('로그인이 필요합니다.'));
            return;
        }

        try {
            const response = await fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();


                resolve(data);
            } else {
                const errorData = await response.json();
                console.error('마이페이지 요청 실패:', errorData.message);
                // window.location.href = './로그인창.html';
                reject(new Error('마이페이지 요청 실패'));
            }
        } catch (error) {
            console.error('마이페이지 요청 중 오류 발생:', error);
            // window.location.href = './로그인창.html';
            reject(error);
        }
    });
}


// API를 통해 주소 데이터 가져오기
async function fetchAddresses() {

    const data2 = await fetchMyPage(); //
    const ui_idx = data2.ui_idx;

    fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/address/getAddress/${ui_idx}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('주소 데이터를 가져오는데 실패했습니다.');
            }
        })
        .then(data => {
            // 주소 데이터를 받아와서 표시하는 함수 호출
            displayAddresses(data);
        })
        .catch(error => {
            console.error('API 호출 중 에러:', error);
        });
}

function getIconByPlace(place) {
    switch (place) {
        case 'home':
            return 'house-chimney';
        case 'school':
            return 'school';
        case 'working':
            return 'briefcase';
        case 'hospital':
            return 'house-chimney-medical';
        case 'etc':
            return 'thumbtack';
        default:
            return 'circle';
    }
}

function getPlaceName(category) {
    switch (category) {
        case 'home':
            return '집';
        case 'school':
            return '학교';
        case 'working':
            return '직장';
        case 'hospital':
            return '병원';
        case 'etc':
            return '기타';
        default:
            return '';
    }
}

// 페이지 로드 시 주소 데이터 가져오기 및 표시하기
fetchAddresses();

function displayAddresses(addresses) {
    const addressWrapper = document.querySelector('.address__wrapper');
    addressWrapper.innerHTML = '';

    addresses.forEach((address, index) => {
        const addressContainer = document.createElement('div');
        addressContainer.classList.add('address__container');

        const addressIconContainer = document.createElement('div');
        addressIconContainer.classList.add('address__icon__container');
        addressIconContainer.id = `${address.uad_category.toLowerCase()}__address${index + 1}`;

        const addressIcon = document.createElement('i');
        addressIcon.classList.add('fa-solid', `fa-${getIconByPlace(address.uad_category)}`);

        addressIconContainer.appendChild(addressIcon);
        addressContainer.appendChild(addressIconContainer);

        const addressContentsContainer = document.createElement('div');
        addressContentsContainer.classList.add('address__contents__container');
        addressContentsContainer.id = `${address.uad_category.toLowerCase()}__name${index + 1}`;

        const addressKind = document.createElement('p');
        addressKind.classList.add('address__kind');
        addressKind.textContent = getPlaceName(address.uad_category);

        const locationName = document.createElement('p');
        locationName.classList.add('location__name');
        locationName.textContent = address.uad_location;

        const addressText = document.createElement('p');
        addressText.classList.add('address');
        addressText.textContent = address.uad_address;

        addressContentsContainer.appendChild(addressKind);
        addressContentsContainer.appendChild(locationName);
        addressContentsContainer.appendChild(addressText);
        addressContainer.appendChild(addressContentsContainer);

        locationName.addEventListener('click', () => {
            localStorage.setItem('address', address.uad_address);
            const topHTML = `
          <input type="text" id="place_depart" placeholder="출발지를 입력하세요">
          <button class="departure_search"><img src="../app/images/search.png" alt="검색" id="search"></button>
          <input type="text" id="place_arrive" placeholder="도착지를 입력하세요">
          <button class="arrival_search"><img src="../app/images/search.png" alt="검색" id="search"></button>
          <button class="road_find"><img src="../app/images/road.png" alt="검색" id="search"></button>
            `;
            const mainHtml = '<img src="../app/images/destination.png" alt="길 찾기"><p>메인 페이지</p>;'
            localStorage.setItem('topHTML', topHTML);
            localStorage.setItem('mainHtml', mainHtml)
            location.href = '../web/map.html';
        });




        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.classList.add('edit__btn');
        deleteBtn.textContent = '주소 삭제';

        deleteBtn.addEventListener('click', () => {

            deleteAddress(address.uad_idx);
        });

        addressContainer.appendChild(deleteBtn);

        // 고유 번호 추가
        const addressId = address.uad_idx;
        const addressIdText = document.createElement('p');
        addressIdText.classList.add('address__id');
        addressIdText.textContent = `${addressId}`;
        addressIdText.style.display = 'none';
        addressIdText.style.width = '1px';

        addressContainer.appendChild(addressIdText);

        addressWrapper.appendChild(addressContainer);
    });
}

function deleteAddress(uad_idx) {
    // API를 통해 주소 삭제 요청 전송
    fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/address/${uad_idx}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uad_idx: uad_idx,
        }),
    })
        .then(response => {
            if (response.ok) {
                // 주소 삭제 성공 처리
                console.log('주소 삭제 성공');
                window.location.reload()
            } else {
                // 주소 삭제 실패 처리
                console.log('주소 삭제 실패');
                // 필요한 경우 실패 처리를 수행할 수 있습니다.
            }
        })
        .catch(error => {
            // 오류 처리
            console.error('주소 삭제 오류:', error);
            // 필요한 경우 오류 처리를 수행할 수 있습니다.
        });
}
