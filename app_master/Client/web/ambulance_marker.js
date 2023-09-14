var xhr = new XMLHttpRequest();
var url = 'http://openapi.seoul.go.kr:8088/	7663485172736a733337515151496a/json/TvEmgcHospitalInfo/1/67/'; /* URL */
// json -> 파일형식
// tbElecWheelChrCharge -> 서비스명
// 1/2  -> 시작 인덱스/ 종료 인덱스
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
        const jsonString = this.responseText;
        const parsedJson = JSON.parse(jsonString);
        // JSON 객체화
        const jsonString2 = parsedJson.TvEmgcHospitalInfo.row;

        const address = [] // 주소
        const facility = [] // 기관명
        const etc = [] //비고
        const TEL_1 = [] // 대표전화
        const TEL_2 = [] // 응급실 전화
        const Mon_open = []  // 월요일 진료시작
        const Mon_close = [] // 월요일 진료 종료
        const Tue_open = [] // 화요일 진료시작
        const Tue_close = []// 화요일 진료 종료
        const Wed_open = [] // 수요일 진료시작
        const Wed_close = []// 수요일 진료 종료
        const Thu_open = []// 목요일 진료시작
        const Thu_close = []// 목요일 진료 종료
        const Fri_open = []// 금요일 진료시작
        const Fri_close = []// 금요일 진료 종료
        const Sat_open = []// 토요일 진료시작
        const Sat_close = []// 토요일 진료 종료
        const Sun_open = []// 일요일 진료시작
        const Sun_close = []// 일요일 진료 종료
        const Hol_open = []// 공휴일 진료시작
        const Hol_close = []// 공휴일 진료 종료

        for (let i = 0; i < jsonString2.length; i++) {
            address[i] = jsonString2[i].DUTYADDR
            facility[i] = jsonString2[i].DUTYNAME
            etc[i] = jsonString2[i].DUTYETC
            TEL_1[i] = jsonString2[i].DUTYTEL1
            TEL_2[i] = jsonString2[i].DUTYTEL3
            Mon_open[i] = jsonString2[i].DUTYTIME1S
            Mon_close[i] = jsonString2[i].DUTYTIME1C
            Tue_open[i] = jsonString2[i].DUTYTIME2S
            Tue_close[i] = jsonString2[i].DUTYTIME2C
            Wed_open[i] = jsonString2[i].DUTYTIME3S
            Wed_close[i] = jsonString2[i].DUTYTIME3C
            Thu_open[i] = jsonString2[i].DUTYTIME4S
            Thu_close[i] = jsonString2[i].DUTYTIME4C
            Fri_open[i] = jsonString2[i].DUTYTIME5S
            Fri_close[i] = jsonString2[i].DUTYTIME5C
            Sat_open[i] = jsonString2[i].DUTYTIME6S
            Sat_close[i] = jsonString2[i].DUTYTIME6C
            Sun_open[i] = jsonString2[i].DUTYTIME7S
            Sun_close[i] = jsonString2[i].DUTYTIME7C
            Hol_open[i] = jsonString2[i].DUTYTIME8S
            Hol_close[i] = jsonString2[i].DUTYTIME8C
        }
        // console.log(facility)
        // 주소에 맞게 마커 찍기
        // 주소로 좌표를 검색합니다
        var ambulance_name = JSON.stringify(facility);
        localStorage.setItem('ambulance_name', ambulance_name)
        var ambulance_address = JSON.stringify(address);
        localStorage.setItem('ambulance_address', ambulance_address);
        var ambulance_repre = JSON.stringify(TEL_1);
        localStorage.setItem('ambulance_repre', ambulance_repre);
        var ambulance_num = JSON.stringify(TEL_2);
        localStorage.setItem('ambulance_num', ambulance_num);

        window.global_ambulance_name = facility
        // ambulance_facility = facility
        // ambulance_address = address
        // ambulance_tel_1 = TEL_1
        // ambulance_tel_2 = TEL_2

        // window.parent.postMessage(ambulance_facility, '*');
        // window.parent.postMessage(ambulance_address, '*');
        // window.parent.postMessage(ambulance_tel_1, '*');
        // window.parent.postMessage(ambulance_tel_2, '*');


        let ambulance_markers = []
        let marker_ambulance = []
        var imageSrc = "./마커/gray.png";
        for (let i = 0; i < address.length; i++) {
            var imageSize = new kakao.maps.Size(50, 60);
            // var imageSize = new kakao.maps.Size(50, 50); 

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
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

                    ambulance_markers.push(marker)
                    marker_ambulance.push(marker.getPosition())
                    // console.log(ambulance_markers.length)
                    // console.log(address.length)
                    if (ambulance_markers.length == 66) {
                        var markersString = JSON.stringify(marker_ambulance);
                        localStorage.setItem('ambulance_coordinate', markersString);
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

                                for (let i = 0; i < facility.length; i++) {
                                    if (facility[i] == marker.Gb) {
                                        marker_name.innerHTML = `<img src="./img/ambulance.png" alt="병원">${marker.Gb}`
                                        marker_info.innerHTML = `<p>주소: ${address[i]}</p>
                                    <p>대표 전화: ${TEL_1[i]}</p>
                                    <p>응급실 번호: ${TEL_2[i]}`
                                        get_button.innerHTML = `
                                    <img id="ambulance_favorite" src="./test_img/white_star.png">
                                    <button class="depart" onclick="addDepart()">출발지</button>
                                    <button class="arrive" onclick="addArrive()">도착지</button>
                                    `
                                        const favorite = document.getElementById('ambulance_favorite')
                                        favorite.addEventListener('click', ambulance_star)
                                        // ----------------------------------------------------------------------------
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

                                        function ambulance_star() {
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



                                        // ----------------------------------------------------------------------------


                                        marker_name.addEventListener('click', () => {
                                            const detail = document.querySelector('#detail')

                                            detail.style.display = "block";
                                            const detail_name = document.querySelector('#detail_marker_name')
                                            detail_name.innerHTML = `<img src="./img/ambulance.png" alt="응급실">${marker.Gb}<img src="./img/x.png" alt="get_out" class="out_img">`
                                            const detail_info = document.querySelector('#detail_marker_info')
                                            detail_info.innerHTML = `
                                        <div id="ambulance_address">
                                            <div id="ambulance_address_img">
                                                <img src="./information_img/address.png">
                                                주소
                                            </div>
                                            <p>${address[i]}</p>
                                        </div>
                                        <div id="ambulance_phone">
                                            <div id="ambulance_phone_img">
                                                <img src="./information_img/phone.png">
                                                전화번호
                                            </div>
                                            <p>대표: ${TEL_1[i]}</p>
                                            <p>응급실: ${TEL_2[i]}</p>
                                        </div>
                                        <div id="ambulance_information">
                                            <div id="ambulance_information_img">
                                                <img src="./information_img/information.png">
                                                추가 정보
                                            </div>
                                            <p>${etc[i]}</p>
                                        </div>
                                        <div id="ambulance_operation_time">
                                            <div id="ambulance_time_img">
                                                <img src="./information_img/clock.png">
                                                운영 시간
                                            </div>
                                            <p>월요일 진료시간: ${Mon_open[i]} ~ ${Mon_close[i]}</p>
                                            <p>화요일 진료시간: ${Tue_open[i]} ~ ${Tue_close[i]}</p>
                                            <p>수요일 진료시간: ${Wed_open[i]} ~ ${Wed_close[i]}</p>
                                            <p>목요일 진료시간: ${Thu_open[i]} ~ ${Thu_close[i]}</p>
                                            <p>금요일 진료시간: ${Fri_open[i]} ~ ${Fri_close[i]}</p>
                                            <p>토요일 진료시간: ${Sat_open[i]} ~ ${Sat_close[i]}</p>
                                            <p>일요일 진료시간: ${Sun_open[i]} ~ ${Sun_close[i]}</p>
                                            <p>공휴일 진료시간: ${Hol_open[i]} ~ ${Hol_close[i]}</p>
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
        window.global_ambulance = ambulance_markers


        const ambulance_button = document.getElementsByClassName('ambulance')[0]
        const charger_button = document.getElementsByClassName('charger')[0]
        const etc_button = document.getElementsByClassName('others')[0]
        const library_button = document.getElementsByClassName('library')[0]
        const medical_button = document.getElementsByClassName('facility')[0]
        const residue_button = document.getElementsByClassName('residue')[0]

        ambulance_button.addEventListener('click', () => {
            let markers_library = window.global_library
            let markers_charger = window.global_charger
            let markers_etc = window.global_etc
            let markers_medical = window.global_medical
            let markers_residue = window.global_residue

            if (ambulance_markers[0].getMap() && markers_library[0].getMap() && markers_charger[0].getMap() && markers_etc[0].getMap() && markers_medical[0].getMap() && markers_residue[0].getMap()) {
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(null)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(null)
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
                ambulance_button.classList.add('press')
            }

            else if (!markers_library[0].getMap() && !markers_charger[0].getMap() && !markers_etc[0].getMap() && !markers_medical[0].getMap() && !markers_residue[0].getMap()) {
                for (let i = 0; i < markers_library.length; i++) {
                    markers_library[i].setMap(map)
                }
                for (let i = 0; i < markers_charger.length; i++) {
                    markers_charger[i].setMap(map)
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
                ambulance_button.classList.remove('press')
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
                    markers_charger[i].setMap(null)
                }

                for (let i = 0; i < ambulance_markers.length; i++) {
                    ambulance_markers[i].setMap(map)
                }
                ambulance_button.classList.add('press')
                charger_button.classList.remove('press')
                etc_button.classList.remove('press')
                library_button.classList.remove('press')
                medical_button.classList.remove('press')
                residue_button.classList.remove('press')
            }

        })




    }
};
xhr.send('');