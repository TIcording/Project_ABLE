async function fetchMyPage() {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            console.log('로그인이 필요합니다.');
            window.location.href = './로그인창.html';
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
                window.location.href = './로그인창.html';
                reject(new Error('마이페이지 요청 실패'));
            }
        } catch (error) {
            console.error('마이페이지 요청 중 오류 발생:', error);
            window.location.href = './로그인창.html';
            reject(error);
        }
    });
}

// API 호출 함수
async function fetchFavorites() {
    try {
        const token = localStorage.getItem('token');
        const data = await fetchMyPage(); // 마이페이지 정보 조회

        const ui_idx = data.ui_idx;

        const response = await fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/favorite/getfavorite/${ui_idx}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('즐겨찾기를 가져오는데 실패했습니다');
        }

        const favorites = await response.json();
        console.log(favorites)
        renderFavorites(favorites);
    } catch (error) {
        console.error('즐겨찾기를 가져오는 중 오류 발생:', error);
        // 오류 처리 작업
    }
}

// 즐겨찾기 렌더링 함수
function renderFavorites(favorites) {
    const listElement = document.getElementById('list__container');

    // 기존 즐겨찾기 목록 초기화
    listElement.innerHTML = '';

    if (Array.isArray(favorites)) {
        favorites.forEach((favorite, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list');
            listItem.id = `list${index + 1}`;

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('favorite__title');

            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.classList.add('checkbox');
            checkboxInput.name = 'chk[]';

            const titleSpan = document.createElement('span');
            titleSpan.textContent = favorite.uf_location;

            titleDiv.appendChild(checkboxInput);
            titleDiv.appendChild(titleSpan);

            const contentsDiv = document.createElement('div');
            contentsDiv.classList.add('favortie__contents');
            contentsDiv.addEventListener('click', () => {
                // 항목 클릭 시 링크 이동
                localStorage.setItem('location_name', favorite.uf_location);
                const topHTML = `
                    <input type="text" id="departure_place" placeholder="출발지를 입력하세요">
                    <button class="search_depart"><img src="../app/images/search.png" alt="검색" id="search"></button>
                    <input type="text" id="arrival_place" placeholder="도착지를 입력하세요">
                    <button class="search_arrive"><img src="../app/images/search.png" alt="검색" id="search"></button>
                    <button class="find_road_to_destination"><img src="../app/images/road.png" alt="검색" id="search"></button>
                `;
                const mainHtml = '<img src="../app/images/destination.png" alt="길 찾기"><p>메인 페이지</p>;'
                localStorage.setItem('topHTML', topHTML);
                localStorage.setItem('mainHtml', mainHtml)
                location.href = '../web/map.html';


            });
            
            

            const contentsText = document.createElement('p');
            contentsText.classList.add('favortie__contents__text');
            contentsText.textContent = favorite.uf_address;

            contentsDiv.appendChild(contentsText);

            listItem.appendChild(titleDiv);
            listItem.appendChild(contentsDiv);

            listElement.appendChild(listItem);

            const divider = document.createElement('hr');
            divider.classList.add('divider');

            listElement.appendChild(divider);
        });
    } else if (typeof favorites === 'object' && favorites !== null) {
        // favorites가 단일 항목인 경우
        const listItem = document.createElement('li');
        listItem.classList.add('list');
        listItem.id = `list1`;

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('favorite__title');

        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.classList.add('checkbox');
        checkboxInput.name = 'chk[]';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = favorites.uf_location;

        titleDiv.appendChild(checkboxInput);
        titleDiv.appendChild(titleSpan);

        const contentsDiv = document.createElement('div');
        contentsDiv.classList.add('favortie__contents');
        contentsDiv.addEventListener('click', () => {
            // 항목 클릭 시 링크 이동
            location.href = '../web/map.html';
        });

        const contentsText = document.createElement('p');
        contentsText.classList.add('favortie__contents__text');
        contentsText.textContent = favorites.uf_address;

        contentsDiv.appendChild(contentsText);

        listItem.appendChild(titleDiv);
        listItem.appendChild(contentsDiv);

        listElement.appendChild(listItem);

        const divider = document.createElement('hr');
        divider.classList.add('divider');

        listElement.appendChild(divider);
    }
}

fetchFavorites()

const deleteAllButton = document.getElementById('delete__all');
deleteAllButton.addEventListener('click', deleteAllFavorites);

async function deleteAllFavorites() {
    try {
        const token = localStorage.getItem('token');
        const data = await fetchMyPage(); // 마이페이지 정보 조회

        const ui_idx = data.ui_idx;

        const response = await fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/favorite/deleteAll/${ui_idx}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response)
        if (response.ok) {
            console.log('모든 즐겨찾기가 삭제되었습니다.');
            // 즐겨찾기 목록 재로딩 또는 다른 동작 수행
            window.location.reload()
        } else {
            const errorData = await response.json();
            console.error('즐겨찾기 삭제 실패:', errorData.message);
            // 오류 처리 작업
        }
    } catch (error) {
        console.error('즐겨찾기 삭제 중 오류 발생:', error);
        // 오류 처리 작업
    }
}
// ---------------------------------------------------

const deleteButton = document.getElementById('delete__checked');
deleteButton.addEventListener('click', async () => {
    const favoriteList = document.querySelectorAll('#list__container .list');
    const selectedFavorites = [];

    favoriteList.forEach((favoriteItem) => {
        const checkbox = favoriteItem.querySelector('.checkbox');
        const contentsText = favoriteItem.querySelector('.favortie__contents__text');

        if (checkbox.checked) {
            // 체크된 항목의 정보를 JSON 형식으로 저장
            const favorite = {
                uf_address: contentsText.textContent
            };
            selectedFavorites.push(favorite);
        }
    });

    try {
        const token = localStorage.getItem('token');
        const data = await fetchMyPage(); // 마이페이지 정보 조회   

        const ui_idx = data.ui_idx;
        console.log(selectedFavorites)

        const response = await fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/favorite/deleteSelected/${ui_idx}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(selectedFavorites)
        });

        if (response.ok) {
            // 선택 삭제 성공
            console.log('선택 삭제 완료');
            window.location.reload()
        } else {
            console.error('선택 삭제 실패:', response.status);
            // 실패 처리 로직
        }
    } catch (error) {
        console.error('선택 삭제 중 오류 발생:', error);
        // 오류 처리 로직
    }
});


