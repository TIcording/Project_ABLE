// 의료시설

var xhr = new XMLHttpRequest();
var url = 'http://openapi.seoul.go.kr:8088/694b64424a616e6434316d49484d70/json/fcltOpenInfo_OMSI/1/6/'; /* URL */
// json -> 파일형식
// tbElecWheelChrCharge -> 서비스명
// 1/2  -> 시작 인덱스/ 종료 인덱스
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
        const jsonString = this.responseText;
        const parsedJson = JSON.parse(jsonString);
        // JSON 객체화
        const jsonString2 = parsedJson.fcltOpenInfo_OMSI.row;

        const address = [] // 주소
        const facility = [] // 시설 이름
        const detail_facility = [] // 시설 종류 상세명
        const total = [] // 정원(수용인원)
        const current = [] // 현 인원
        const tel = [] // 전화 번호

        for (let i = 0; i < jsonString2.length; i++) {
            address[i] = jsonString2[i].FCLT_ADDR
            facility[i] = jsonString2[i].FCLT_NM
            detail_facility[i] = jsonString2[i].FCLT_KIND_DTL_NM
            total[i] = jsonString2[i].INMT_GRDN_CNT
            current[i] = jsonString2[i].LVLH_NMPR
            tel[i] = jsonString2[i].FCLT_TEL_NO
        }
        var medical_name = JSON.stringify(facility);
        localStorage.setItem('medical_name', medical_name)
        var medical_address = JSON.stringify(address);
        localStorage.setItem('medical_address', medical_address)
        var medical_tel = JSON.stringify(tel);
        localStorage.setItem('medical_tel', medical_tel)

        // medical_facility = facility
        // medical_address = address
        // medical_tel = tel

        // window.parent.postMessage(medical_facility, '*');
        // window.parent.postMessage(medical_address, '*');
        // window.parent.postMessage(medical_tel, '*');

        window.global_medical_name = facility
        let medical_markers = []
        let marker_medical = []
        var imageSrc = "./마커/violet.png";
        var imageSize = new kakao.maps.Size(50,60);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        for (let i = 0; i < address.length; i++) {
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address[i], function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords,
                        title: facility[i],
                        image: markerImage
                    });
                    medical_markers.push(marker)
                    marker_medical.push(marker.getPosition())
                    // console.log(marker_medical.length)
                    if(marker_medical.length == address.length){
                        var markersString = JSON.stringify(marker_medical);
                        localStorage.setItem('medical_coordinate', markersString);
                    }
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
                            for (let i = 0; i < facility.length; i++){
                                if (facility[i] == marker.Gb){
                                    marker_name.innerHTML = `<img src="./menu_img/ambulance.png" alt="장애인의료시설">${marker.Gb}`
                                    marker_info.innerHTML = `<p>주소: ${address[i]}</p>
                                    <p>전화번호: ${tel[i]}</p>`
                                    get_button.innerHTML = `
                                    <img id="medical_favorite" src="./test_img/white_star.png">
                                    <button class="depart" onclick="addDepart()">출발지</button>
                                    <button class="arrive" onclick="addArrive()">도착지</button>
                                    `
                                    const favorite = document.getElementById('medical_favorite')
                                    favorite.addEventListener('click', medical_star)

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
                            
                            function medical_star() {
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
                                        detail.style.display = "block";
                                        const detail_name = document.querySelector('#detail_marker_name')
                                        detail_name.innerHTML = `<img src="./menu_img/ambulance.png" alt="장애인의료시설">${marker.Gb}<img src="./img/x.png" alt="get_out" class="out_img">`
                                        const detail_info = document.querySelector('#detail_marker_info')
                                        detail_info.innerHTML = `
                                        <div id="medical_address">
                                            <div id="medical_address_img">
                                                <img src="./information_img/address.png">
                                                주소
                                            </div>
                                            <p>${address[i]}</p>
                                        </div>
                                        <div id="medical_phone">
                                            <div id="medical_phone_img">
                                                <img src="./information_img/phone.png">
                                                전화번호
                                            </div>
                                            <p>${tel[i]}</p>
                                        </div>
                                        <div id="medical_facility_name">
                                            <div id="medical_facility_img">
                                                <img src="./test_img/home.png">
                                                시설 종류 상세명
                                            </div>
                                            <p>${detail_facility[i]}</p>
                                        </div>
                                        <div id="medical_information">
                                            <div id="medical_information_img">
                                                <img src="./information_img/information.png">
                                                인원
                                            </div>
                                            <p>정원(수용인원): ${total[i]}</p>
                                            <p>현 인원: ${current[i]}</p>
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
            });
        }

        window.global_medical = medical_markers

        // 마커 제거 및 띄우기
        const ambulance_button = document.getElementsByClassName('ambulance')[0]
        const charger_button = document.getElementsByClassName('charger')[0]
        const etc_button = document.getElementsByClassName('others')[0]
        const library_button = document.getElementsByClassName('library')[0]
        const medical_button = document.getElementsByClassName('facility')[0]
        const residue_button = document.getElementsByClassName('residue')[0]

        medical_button.addEventListener('click', () => {
            let markers_etc = window.global_etc
            let markers_ambulance = window.global_ambulance
            let markers_charger = window.global_charger
            let markers_library = window.global_library
            let markers_residue = window.global_residue

            if (markers_ambulance[0].getMap() && markers_library[0].getMap() && markers_charger[0].getMap() && markers_etc[0].getMap() && medical_markers[0].getMap() && markers_residue[0].getMap()) {
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(null)
                }
                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(null)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(null)
                }
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(null)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(null)
                }
                medical_button.classList.add('press')
            }

            else if (!markers_etc[0].getMap() && !markers_ambulance[0].getMap() && !markers_charger[0].getMap() && !markers_library[0].getMap() && !markers_residue[0].getMap()) {
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(map)
                }
                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(map)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(map)
                }
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(map)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(map)
                }
                medical_button.classList.remove('press')
            }

            else {
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(null)
                }
                for (let i = 0; i < medical_markers.length; i++) {
                    medical_markers[i].setMap(map)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(null)
                }
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(null)
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
                library_button.classList.remove('press')
                medical_button.classList.add('press')
                residue_button.classList.remove('press')
            }

        })
    }
};
xhr.send('');