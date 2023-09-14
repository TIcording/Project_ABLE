var xhr = new XMLHttpRequest();
var url = 'http://openapi.seoul.go.kr:8088/53744d7065736a7339346e4775786a/json/tbElecWheelChrCharge/1/559/'; /* URL */
// json -> 파일형식
// tbElecWheelChrCharge -> 서비스명
// 1/2  -> 시작 인덱스/ 종료 인덱스
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
        const jsonString = this.responseText;
        const parsedJson = JSON.parse(jsonString);
        // JSON 객체화
        const jsonString2 = parsedJson.tbElecWheelChrCharge.row;
        // 위도, 경도, 도서관 이름 얻기
        const latitude = [] // 위도
        const longitude = [] // 경도
        const facility = [] // 충전소명
        const road_adr = []// 소재지도로명주소
        const LN_adr = []// 소재지지번주소
        const weekday_open = [] // 평일운영시작
        const weekday_close = [] // 평일운영종료
        const saturday_open = [] // 토요일운영시작
        const saturday_close = [] // 토요일운영종료
        const Holiday_open = [] // 공휴일운영시작
        const Holiday_close = [] // 공휴일운영종료
        const simultaneous = [] // 동시사용가능대수
        const airpump = [] // 공기주입가능여부
        const institue = [] // 관리기관명
        const institue_num = [] // 관리기관전화번호

        for (let i = 0; i < jsonString2.length; i++) {
            latitude[i] = jsonString2[i].LATITUDE // 위도 데이터 넣기
            longitude[i] = jsonString2[i].LONGITUDE // 경도 데이터 넣기
            facility[i] = jsonString2[i].FCLTYNM // 도서관 이름 넣기
            road_adr[i] = jsonString2[i].RDNMADR
            LN_adr[i] = jsonString2[i].LNMADR
            weekday_open[i] = jsonString2[i].WEEKDAYOPEROPENHHMM
            weekday_close[i] = jsonString2[i].WEEKDAYOPERCOLSEHHMM
            saturday_open[i] = jsonString2[i].SATOPEROPEROPENHHMM
            saturday_close[i] = jsonString2[i].SATOPERCLOSEHHMM
            Holiday_open[i] = jsonString2[i].HOLIDAYOPEROPENHHMM
            Holiday_close[i] = jsonString2[i].HOLIDAYCLOSEOPENHHMM
            simultaneous[i] = jsonString2[i].SMTMUSECO
            airpump[i] = jsonString2[i].AIRINJECTORYN
            institue[i] = jsonString2[i].INSTITUTIONNM
            institue_num[i] = jsonString2[i].INSTITUTIONPHONENUMBER
        }
        window.global_charger_name = facility

        
        // 각 마커 찍기
        let markers_charger = []
        var imageSrc = "./마커/green.png"; // 마커 이미지
        for (let i = 0; i < facility.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            if(facility[i] != "전동휠체어급속충전기"){
                var imageSize = new kakao.maps.Size(50,60);

                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도 (1. 연결)
                    position: new kakao.maps.LatLng(latitude[i], longitude[i]), // 마커를 표시할 위치
                    title: facility[i], // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage // 마커 이미지 
                });
                markers_charger.push(marker)
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
                            marker_name.innerHTML = `<img src="./test_img/star.png" alt="충전소">${marker.Gb}`
                            marker_info.innerHTML = `<p>소재지 도로명 주소: ${road_adr[i]}</p>
                            <p>소재지 지번 주소: ${LN_adr[i]}</p>
                            <p>관리 기관명: ${institue[i]}</p>
                            <p>관리 기관 전화번호: ${institue_num[i]}</p>`
                            get_button.innerHTML = `
                            <img id="charger_favorite" src="./test_img/white_star.png">
                            <button class="depart" onclick="addDepart()">출발지</button>
                            <button class="arrive" onclick="addArrive()">도착지</button>
                            `
                            const favorite = document.getElementById('charger_favorite')
                            favorite.addEventListener('click', charger_star)
                            // function charger_star() {
                            //     if(favorite.src.endsWith('white_star.png')){
                            //         favorite.src = './test_img/yellow_star.png'
                            //         console.log('즐겨찾기 추가')
                            //     }else{
                            //         console.log('즐겨찾기 제거')
                            //         favorite.src = './test_img/white_star.png'
                            //     }
                            // }

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
                            
                            function charger_star() {
                                if (favorite.src.endsWith('white_star.png')) {
                                    favorite.src = './test_img/yellow_star.png';
                                    addToFavorites(marker.Gb, LN_adr[i]);
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
                                detail_name.innerHTML = `<img src="./charger_icon/charger.png" alt="충전소">${marker.Gb}<img src="./img/x.png" alt="get_out" class="out_img">`
                                const detail_info = document.querySelector('#detail_marker_info')
                                detail_info.innerHTML = `
                                <div id="charger_address">
                                    <div id="charger_img">
                                        <img src="./charger_icon/address.png">
                                        주소
                                    </div>
                                    <p>도로명 주소: ${road_adr[i]}</p>
                                    <p>지번 주소: ${LN_adr[i]}</p>
                                </div>
                                <div id="charger_operation_time">
                                    <div id="charger_time">
                                        <img src="./charger_icon/clock.png">
                                        운영 시간
                                    </div>
                                    <p>평일 운영 시간: ${weekday_open[i]} ~ ${weekday_close[i]}</p>
                                    <p>토요일 운영 시간: ${saturday_open[i]} ~ ${saturday_close[i]}</p>
                                    <p>공휴일 운영 시간: ${Holiday_open[i]} ~ ${Holiday_close[i]}</p>
                                </div>
                                <div id="charger_information">
                                    <div id="information">
                                        <img src="./charger_icon/information.png">
                                        충전 정보
                                    </div>
                                    <p>동시 사용 가능 대수: ${simultaneous[i]}</p>
                                    <p>공기 주입 가능 여부: ${airpump[i]}</p>
                                </div>
                                <div id="charger_manage">
                                    <div id="management">
                                        <img src="./charger_icon/management.png">
                                        운영 기관
                                    </div>
                                    <p>이름: ${institue[i]}</p>
                                    <p>전화번호: ${institue_num[i]}</p>
                                </div>
                                <div id="depart_arrival">
                                    <img src="./test_img/star.png">
                                    <button onclick="addDepart()">출발지</button>
                                    <button onclick="addArrive()">도착지</button>
                                </div>
                                `
                                const exit = document.querySelector('.out_img')
                                exit.addEventListener('click', () => {
                                    detail.style.display="none"
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
        window.global_charger = markers_charger


        const ambulance_button = document.getElementsByClassName('ambulance')[0]
        const charger_button = document.getElementsByClassName('charger')[0]
        const etc_button = document.getElementsByClassName('others')[0]
        const library_button = document.getElementsByClassName('library')[0]
        const medical_button = document.getElementsByClassName('facility')[0]
        const residue_button = document.getElementsByClassName('residue')[0]


        charger_button.addEventListener('click', () => {
            let markers_library = window.global_library
            let markers_ambulance = window.global_ambulance
            let markers_etc = window.global_etc
            let markers_medical = window.global_medical
            let markers_residue = window.global_residue

            if (markers_ambulance[0].getMap() && markers_library[0].getMap() && markers_charger[0].getMap() && markers_etc[0].getMap() && markers_medical[0].getMap() && markers_residue[0].getMap()) {
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(null)
                }
                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(null)
                }
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(null)
                }
                for (let i = 0; i < markers_medical.length; i++) {
                    markers_medical[i].setMap(null)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(null)
                }
                charger_button.classList.add('press')
            }

            else if (!markers_library[0].getMap() && !markers_ambulance[0].getMap() && !markers_etc[0].getMap() && !markers_medical[0].getMap() && !markers_residue[0].getMap()) {
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(map)
                }
                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(map)
                }
                for (let i = 0; i < markers_etc.length; i++) {
                    markers_etc[i].setMap(map)
                }
                for (let i = 0; i < markers_medical.length; i++) {
                    markers_medical[i].setMap(map)
                }
                for (let i = 0; i < markers_residue.length; i++) {
                    markers_residue[i].setMap(map)
                }
                charger_button.classList.remove('press')
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
                    markers_library[i].setMap(null)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(map)
                }

                for (let i = 0; i < markers_ambulance.length; i++) {
                    markers_ambulance[i].setMap(null)
                }
                ambulance_button.classList.remove('press')
                charger_button.classList.add('press')
                etc_button.classList.remove('press')
                library_button.classList.remove('press')
                medical_button.classList.remove('press')
                residue_button.classList.remove('press')
            }

        })




    }
};
xhr.send('');