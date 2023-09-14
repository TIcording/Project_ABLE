var xhr = new XMLHttpRequest();
var url = 'http://openapi.seoul.go.kr:8088/514b70576b736a7337346a7541474b/json/SeoulDisableLibraryInfo/1/10'; /* URL */
// json -> 파일형식
// tbElecWheelChrCharge -> 서비스명
// 1/2  -> 시작 인덱스/ 종료 인덱스
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
        const jsonString = this.responseText;
        const parsedJson = JSON.parse(jsonString);
        // JSON 객체화
        const jsonString2 = parsedJson.SeoulDisableLibraryInfo.row;
        const list_total_count = parsedJson.SeoulDisableLibraryInfo.list_total_count
        // 위도, 경도, 도서관 이름 얻기
        const latitude = [] // 위도
        const longitude = [] // 경도
        let library = [] // 도서관

        // 마커를 찍을 때마다 필요한 내용들 담기
        const address = []
        const phone_num = []
        const URL = []
        const operation_time = []
        const close_date = []

        for (let i = 0; i < jsonString2.length; i++) {
            latitude[i] = jsonString2[i].XCNTS // 위도 데이터 넣기
            longitude[i] = jsonString2[i].YDNTS // 경도 데이터 넣기
            library[i] = jsonString2[i].LBRRY_NAME // 도서관 이름 넣기
            address[i] = jsonString2[i].ADRES
            phone_num[i] = jsonString2[i].TEL_NO
            URL[i] = jsonString2[i].HMPG_URL
            operation_time[i] = jsonString2[i].OP_TIME
            close_date[i] = jsonString2[i].FDRM_CLOSE_DATE
        }
        let markers_library = [];
        


        // 각 마커 찍기
        var imageSrc = "./마커/blue.png"; // 마커 이미지
        for (let i = 0; i < library.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(50, 60);
            // var imageSize = new kakao.maps.Size(50, 50); 

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도 (1. 연결)
                position: new kakao.maps.LatLng(latitude[i], longitude[i]), // 마커를 표시할 위치
                title: library[i], // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });
            markers_library.push(marker)
            // 마커를 누르면 정보창이 열리게 한다.
            
            // 모달창에 정보 띄우기
            //클로저 문제로 인해서 함수를 따로 만듬
            function createClickHandler(marker) {
                return function () {
                const information = document.getElementById('info')
                if(information.style.display == 'block'){
                    information.style.display = 'none'
                }
                if (information.style.display == 'none') {
                    information.removeAttribute("style");
                    information.style.display = 'block';
                    const marker_name = document.querySelector('#marker_name')
                    const marker_info = document.querySelector('#marker_info')
                    const get_button = document.getElementById('button_de_arr')
                    for (let i = 0; i < library.length; i++){
                        if (library[i] == marker.Gb){
                            marker_name.innerHTML = `<img src="./img/library.png" alt="도서관">${marker.Gb}`
                            marker_info.innerHTML = `<p>주소: ${address[i]}</p>
                            <p>전화번호: ${phone_num[i]}</p>`
                            get_button.innerHTML = `
                            <img id="library_favorite" src="./test_img/white_star.png">
                            <button class="depart" onclick="addDepart()">출발지</button>
                            <button class="arrive" onclick="addArrive()">도착지</button>
                            `

                            const favorite = document.getElementById('library_favorite')
                            favorite.addEventListener('click', library_star)
                            
                              // -------------------------------------------------------------------------------------------
                              async function fetchMyPage() {
                                return new Promise(async (resolve, reject) => {
                                    const token = localStorage.getItem('token');
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
                            
                            function library_star() {
                                if (favorite.src.endsWith('white_star.png')) {
                                    favorite.src = './test_img/yellow_star.png';
                                    addToFavorites(marker.Gb, address[i]);
                                } else {
                                    favorite.src = './test_img/white_star.png';
                                    removeFromFavorites(marker.Gb);
                                }
                            }

                            async function addToFavorites(uf_location, uf_address) {
                                const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져오는 함수
                                const data2 = await fetchMyPage(); // 마이페이지 정보 조회
                                const ui_idx = data2.ui_idx; // 토큰에서 사용자 ID를 추출하는 함수
                                

                                const data = {
                                    ui_idx,
                                    uf_location,
                                    uf_address
                                };

                                fetch('https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/favorite/addfavorite', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}` // 토큰을 헤더에 추가
                                    },
                                    body: JSON.stringify(data)
                                })
                                    .then(response => response.json())
                                    .then(result => {
                                        console.log('즐겨찾기 추가:', result);
                                        // 추가된 즐겨찾기에 대한 처리 작업
                                    })
                                    .catch(error => {
                                        console.error('즐겨찾기 추가 실패:', error);
                                        // 실패 시 에러 처리 작업
                                    });
                            }

                            async function removeFromFavorites(uf_location) {
                                const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져오는 함수
                                const data2 = await fetchMyPage(); // 마이페이지 정보 조회
                                const ui_idx = data2.ui_idx; // 토큰에서 사용자 ID를 추출하는 함수

                                const data = {
                                    uf_location
                                };

                                fetch(`https://port-0-teamprojectserver-pi0mb2blhqyfirt.sel4.cloudtype.app/favorite/delfavorite/${ui_idx}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}` // 토큰을 헤더에 추가
                                    },
                                    body: JSON.stringify(data)
                                })
                                    .then(response => {
                                        if (response.ok) {
                                            console.log('즐겨찾기 제거 성공');
                                            // 제거 성공에 대한 처리 작업
                                        } else {
                                            console.error('즐겨찾기 제거 실패');
                                            // 제거 실패에 대한 처리 작업
                                        }
                                    })
                                    .catch(error => {
                                        console.error('즐겨찾기 제거 실패:', error);
                                        // 실패 시 에러 처리 작업
                                    });
                            }

                            // -------------------------------------------------------------------------------------------


                            marker_name.addEventListener('click', () => {
                                const detail = document.querySelector('#detail')
                                // const exit = document.querySelector('.out_img')
                                detail.style.display = "block";
                                const detail_name = document.querySelector('#detail_marker_name')
                                detail_name.innerHTML = `<img src="./img/library.png" alt="도서관">${marker.Gb}<img src="./img/x.png" alt="get_out" class="out_img">`
                                const detail_info = document.querySelector('#detail_marker_info')
                                detail_info.innerHTML = `
                                <div id="library_address">
                                    <div id="library_address_img">
                                        <img src="./information_img/address.png">
                                        주소
                                    </div>
                                    <p>${address[i]}</p>
                                </div>
                                <div id="library_phone">
                                    <div id="library_phone_img">
                                        <img src="./information_img/phone.png">
                                        전화번호
                                    </div>
                                    <p>${phone_num[i]}</p>
                                </div>
                                <div id="library_time">
                                    <div id="library_time_img">
                                        <img src="./information_img/clock.png">
                                        운영시간
                                    </div>
                                    <p>${operation_time[i]}</p>
                                </div>
                                <div id="library_break">
                                    <div id="library_break_img">
                                        <img src="./information_img/break_time.png">
                                        휴관일
                                    </div>
                                    <p>${close_date[i]}</p>
                                </div>
                                <div id="library_URL">
                                    <div id="library_URL_img">
                                        <img src="./information_img/management.png">
                                        홈페이지 주소
                                    </div>
                                    <p>${URL[i]}</p>
                                </div>
                                <div id="depart_arrival">
                                    <img src="./test_img/star.png">
                                    <button onclick="addDepart()">출발지</button>
                                    <button onclick="addArrive">도착지</button>
                                </div>
                                `
                                const exit = document.querySelector('.out_img')
                                exit.addEventListener('click', () => {
                                    detail.style.display = "none"
                                })

                            })
                            // marker_name.addEventListener('click', detail_information(marker))
                        }
                    }
                  }
                }
            }

            kakao.maps.event.addListener(marker, 'click', createClickHandler(marker));

            kakao.maps.event.addListener(map, 'click', function () {
                const information = document.getElementById('info')
                if (information.style.display == 'block') {
                    information.removeAttribute("style");
                    information.style.display = 'none';
                }
            });

        }
        window.global_library = markers_library
        window.global_library_name = library
        // console.log(window.global_library_name)


        // 마커 제거 및 띄우기
        const ambulance_button = document.getElementsByClassName('ambulance')[0]
        const charger_button = document.getElementsByClassName('charger')[0]
        const etc_button = document.getElementsByClassName('others')[0]
        const library_button = document.getElementsByClassName('library')[0]
        const medical_button = document.getElementsByClassName('facility')[0]
        const residue_button = document.getElementsByClassName('residue')[0]

        library_button.addEventListener('click', () => {
            let markers_etc = window.global_etc
            let markers_ambulance = window.global_ambulance
            let markers_charger = window.global_charger
            let markers_medical = window.global_medical
            let markers_residue = window.global_residue

            if (markers_ambulance[0].getMap() && markers_library[0].getMap() && markers_charger[0].getMap() && markers_etc[0].getMap() && markers_medical[0].getMap() && markers_residue[0].getMap()) {
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(null)
                }
                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(null)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(null)
                }
                for (let i = 0; i < markers_medical.length; i++) {
                    markers_medical[i].setMap(null)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(null)
                }
                library_button.classList.add('press')
            }

            else if (!markers_etc[0].getMap() && !markers_ambulance[0].getMap() && !markers_charger[0].getMap() && !markers_medical[0].getMap() && !markers_residue[0].getMap()) {
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(map)
                }
                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(map)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(map)
                }
                for (let i = 0; i < markers_medical.length; i++) {
                    markers_medical[i].setMap(map)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(map)
                }
                library_button.classList.remove('press')
            }

            else {
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(null)
                }
                for (let i = 0; i < markers_medical.length; i++) {
                    markers_medical[i].setMap(null)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(null)
                }
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(map)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(null)
                }

                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(null)
                }
                ambulance_button.classList.remove('press')
                charger_button.classList.remove('press')
                etc_button.classList.remove('press')
                library_button.classList.add('press')
                medical_button.classList.remove('press')
                residue_button.classList.remove('press')
            }

        })



    };

}
xhr.send('');



