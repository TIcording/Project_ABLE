function addDepart() {
  console.log('출발지 설정');
  const marker_depart = document.querySelector('#marker_name');
  const depart_input = document.getElementById('depart_place')

  let markers_etc = window.global_etc
  let markers_ambulance = window.global_ambulance
  let markers_charger = window.global_charger
  let markers_library = window.global_library
  let markers_residue = window.global_residue
  let markers_medical = window.global_medical

  if (search_depart_marker != []) {
    search_depart_marker = []
  }

  for (let i = 0; i < markers_library.length; i++) {
    let marker = markers_library[i];
    if (marker_depart.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const depart = marker.getPosition(); // depart에 값 할당
      depart_input.value = marker_depart.textContent
      search_depart_marker.push(marker.Gb)
      search_depart_marker.push(depart)
      console.log(search_depart_marker)
    }
  }
  for (let i = 0; i < markers_etc.length; i++) {
    let marker = markers_etc[i];
    if (marker_depart.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const depart = marker.getPosition(); // depart에 값 할당
      depart_input.value = marker_depart.textContent
      search_depart_marker.push(marker.Gb)
      search_depart_marker.push(depart)
      console.log(search_depart_marker)
    }
  }
  for (let i = 0; i < markers_ambulance.length; i++) {
    let marker = markers_ambulance[i];
    if (marker_depart.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const depart = marker.getPosition(); // depart에 값 할당
      depart_input.value = marker_depart.textContent
      search_depart_marker.push(marker.Gb)
      search_depart_marker.push(depart)
      console.log(search_depart_marker)
    }
  }
  for (let i = 0; i < markers_charger.length; i++) {
    let marker = markers_charger[i];
    if (marker_depart.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const depart = marker.getPosition(); // depart에 값 할당
      depart_input.value = marker_depart.textContent
      search_depart_marker.push(marker.Gb)
      search_depart_marker.push(depart)
      console.log(search_depart_marker)
    }
  }
  for (let i = 0; i < markers_residue.length; i++) {
    let marker = markers_residue[i];
    if (marker_depart.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const depart = marker.getPosition(); // depart에 값 할당
      depart_input.value = marker_depart.textContent
      search_depart_marker.push(marker.Gb)
      search_depart_marker.push(depart)
      console.log(search_depart_marker)
    }
  }
  for (let i = 0; i < markers_medical.length; i++) {
    let marker = markers_medical[i];
    if (marker_depart.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const depart = marker.getPosition(); // depart에 값 할당
      depart_input.value = marker_depart.textContent
      search_depart_marker.push(marker.Gb)
      search_depart_marker.push(depart)
      console.log(search_depart_marker)
    }
  }
  const depart_button = document.getElementById('place_depart')
  if(depart_button !== null){
    depart_button.value = search_depart_marker[0]
  }
  const depart_button_1 = document.getElementById('departure_place')
  if(depart_button_1 !== null){
    depart_button_1.value = search_depart_marker[0]
  }

  window.marker_search_depart = search_depart_marker

  // marker의 이름과 검색했을 때 value로 다 넣은 다음에 설정
  const top = document.querySelector('#top')
  const add_html =
    `
  <input type="text" id="my_place_to_depart" placeholder="출발지를 입력하세요">
  <button class="want_to_find_depart_location"><img src="../app/images/search.png" alt="검색" id="search"></button>
  <input type="text" id="my_place_to_arrive" placeholder="도착지를 입력하세요">
  <button class="want_to_find_arrive_location"><img src="../app/images/search.png" alt="검색" id="search"></button>
  <button class="search_my_route"><img src="../app/images/road.png" alt="검색" id="search"></button>
  `
  top.innerHTML = add_html

  const depart_place = document.getElementById('my_place_to_depart')
  depart_place.value = search_depart_marker[0]

  // 도착 버튼을 눌렀을 때 값이 들어가게 한다.
  const arrive_place = document.getElementById('my_place_to_arrive')
  arrive_value = window.addArrive_value
  console.log(arrive_value)
  if(arrive_value != null || arrive_value != undefined){
    arrive_place.value = arrive_value
  }
  
  const search_depart = document.querySelector('.want_to_find_depart_location')
  search_depart.addEventListener('click', () => {
    const departure = document.getElementById('my_place_to_depart')
    // 검색하여 마커를 찍은 다음 좌표만 가져오기
    var ps = new kakao.maps.services.Places();

    let search_marker = [];
    let marker_address = [];
    let marker_name = [];
    let erase_marker = [];
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다

    // 키워드 검색 완료 시 호출되는 콜백함수를 Promise로 감싸기
    function placesSearch() {
      return new Promise((resolve, reject) => {
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < data.length; i++) {
              var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(data[i].y, data[i].x)
              });
              search_marker[i] = new kakao.maps.LatLng(data[i].y, data[i].x);
              marker_address[i] = data[i].address_name;
              marker_name[i] = data[i].place_name;
              erase_marker[i] = marker
            }
            resolve(); // 검색 완료 후 Promise 해결
          } else {
            reject(new Error('Places search failed.')); // 검색 실패 시 Promise 거부
          }
        }

        // 검색 요청
        // 예시: performSearch('keyword');
        ps.keywordSearch(departure.value, placesSearchCB);
      });
    }
    // 검색 실행 및 결과 처리
    placesSearch()
      .then(() => {
        // 검색 완료 후 처리할 로직 작성
        const search_result = document.getElementById('my_search');
        search_result.style.display = "block";
        const road_search = document.getElementById('road_search')
        const x_button = document.getElementById('get_out_of_search_result')
        x_button.addEventListener('click', () => {
          search_result.style.display = "none"
        })

        let input_HTML = "";

        for (let i = 0; i < marker_name.length; i++) {
          input_HTML +=
            `
                <div id="search_result_total">
                    <p id="search_result_place">${i + 1} ${marker_name[i]}</p>
                    <p id="search_result_address">${marker_address[i]}</p>
                </div>
                `;
        }
        road_search.innerHTML = input_HTML;
        const search_place_result = document.querySelectorAll('#search_result_total')
        // console.log(search_place_result)

        for (let i = 0; i < search_place_result.length; i++) {
          console.log(search_place_result[i].textContent)
          search_place_result[i].addEventListener('click', () => {
            map.setCenter(search_marker[i])
            departure.value = marker_name[i]
            // 이미 값이 있는 경우 초기화를 해준다.
            if (search_depart_marker != []) {
              search_depart_marker = []
            }
            search_depart_marker.push(marker_name[i])
            search_depart_marker.push(erase_marker[i])
            window.addDepart_value = marker_name[i]
            search_result.style.display = 'none'
            const new_marker = []
            for (let j = 0; j < erase_marker.length; j++) {
              if (i != j) {
                new_marker.push(erase_marker[j])
              }
            }
            for (let k = 0; k < new_marker.length; k++) {
              new_marker[k].setMap(null)
            }
          })
        }
      })
      .catch(error => {
        // 검색 실패 시 처리할 로직 작성
        console.error(error);
      });
  })

  const search_arrival = document.querySelector('.want_to_find_arrive_location')
  search_arrival.addEventListener('click', () => {
    const arrival = document.getElementById('my_place_to_arrive')
    // 검색하여 마커를 찍은 다음 좌표만 가져오기
    var ps = new kakao.maps.services.Places();

    let search_marker = [];
    let marker_address = [];
    let marker_name = [];
    let erase_marker = []

    // 키워드 검색 완료 시 호출되는 콜백함수를 Promise로 감싸기
    function placesSearch() {
      return new Promise((resolve, reject) => {
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < data.length; i++) {
              var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(data[i].y, data[i].x)
              });
              search_marker[i] = new kakao.maps.LatLng(data[i].y, data[i].x);
              marker_address[i] = data[i].address_name;
              marker_name[i] = data[i].place_name;
              erase_marker[i] = marker
            }
            resolve(); // 검색 완료 후 Promise 해결
          } else {
            reject(new Error('Places search failed.')); // 검색 실패 시 Promise 거부
          }
        }

        // 검색 요청
        ps.keywordSearch(arrival.value, placesSearchCB);
      });
    }
    // 검색 실행 및 결과 처리
    placesSearch()
      .then(() => {
        // 검색 완료 후 처리할 로직 작성
        const search_result = document.getElementById('my_search');
        search_result.style.display = "block";
        const road_search = document.getElementById('road_search')
        const x_button = document.getElementById('get_out_of_search_result')
        x_button.addEventListener('click', () => {
          search_result.style.display = "none"
        })

        let input_HTML = "";

        for (let i = 0; i < marker_name.length; i++) {
          input_HTML +=
            `
                <div id="search_result_total">
                    <p id="search_result_place">${i + 1} ${marker_name[i]}</p>
                    <p id="search_result_address">${marker_address[i]}</p>
                </div>
                `;
        }
        road_search.innerHTML = input_HTML;
        const search_place_result = document.querySelectorAll('#search_result_total')
        // console.log(search_place_result)

        for (let i = 0; i < search_place_result.length; i++) {
          console.log(search_place_result[i].textContent)
          search_place_result[i].addEventListener('click', () => {
            map.setCenter(search_marker[i])
            arrival.value = marker_name[i]
            // 이미 값이 있는 경우 초기화를 해준다.
            if (search_arrive_marker != []) {
              search_arrive_marker = []
            }
            search_arrive_marker.push(marker_name[i])
            search_arrive_marker.push(erase_marker[i])
            search_result.style.display = 'none'
            const new_marker = []
            for (let j = 0; j < erase_marker.length; j++) {
              if (i != j) {
                new_marker.push(erase_marker[j])
              }
            }

            for (let k = 0; k < new_marker.length; k++) {
              new_marker[k].setMap(null)
            }
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  })
  const find_road = document.querySelector('.search_my_route')
  let polylineObj = {};
  find_road.addEventListener('click', () => {
    const button_menu_search = document.getElementById('button')
    button_menu_search.style.display = 'none'
    const info_menu = document.getElementById('search_result_path')
    info_menu.style.display = 'block'
    const result = document.getElementById('solo_result')
    result.style.display = 'block'

    const x_button = document.getElementById('get_out_of_result')
    x_button.addEventListener('click', () => {
      info_menu.style.display = 'none'
    })

    // 출발지, 도착지 좌표 얻기
    // const arrive_coordinate = arrive[1].getPosition()

    depart_coordinate = search_depart_marker[1].getPosition()
    arrive_coordinate = search_arrive_marker[1].getPosition()

    console.log(depart_coordinate)
    console.log(arrive_coordinate)

    const SX = depart_coordinate.La
    const SY = depart_coordinate.Ma

    const EX = arrive_coordinate.La
    const EY = arrive_coordinate.Ma

    // window.global_SX = SX
    // window.global_SY = SY
    // window.global_EX = EX
    // window.global_EY = EY

    // 길을 이을 총 좌표
    const total_route_coordinate = [depart_coordinate]
    var xhr = new XMLHttpRequest();
    var url = `https://api.odsay.com/v1/api/searchPubTransPathT?apiKey=u02TH3T2TTBh0B40x%2B9Tpw&SX=${SX}&SY=${SY}&EX=${EX}&EY=${EY}&SearchType=0`;
    // console.log(url)
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var resultObj = JSON.parse(xhr.responseText);
        // console.log(resultObj)
        path = resultObj.result.path;
        console.log(path);

        const path_sort_by_time = path.sort((a, b) => a.info.totalTime - b.info.totalTime);
        const path_least_time = path_sort_by_time.slice(0, 3)
        console.log(path_least_time)

        const mapObject_list = []
        let result_path = ``
        for (let i = 0; i < path_least_time.length; i++) {
          result_path +=
            `
              <p id="cost_time">최소 시간 ${i + 1}번 경로</p>
              <div id="least_route">
                <p>걸리는 시간: ${path_least_time[i].info.totalTime}분</p>
                <p>지나는 역의 총 개수: ${path_least_time[i].info.totalStationCount}개</p>
                <p>환승 횟수: ${path_least_time[i].info.subwayTransitCount}개</p>
              </div>
              `
          mapObject_list[i] = path_least_time[i].info.mapObj
        }
        result.innerHTML = result_path

        // 각 경로마다 polyline 생성하기
        const route_list = document.querySelectorAll('#least_route')
        // let polylineObj = {};
        for (let i = 0; route_list.length; i++) {
          let route = route_list[i]
          let mapObj = mapObject_list[i]
          route.addEventListener('click', () => {
            for (key in polylineObj) {
              polylineObj[key].setMap(null)
            }
            let markers_etc = window.global_etc
            let markers_ambulance = window.global_ambulance
            let markers_charger = window.global_charger
            let markers_library = window.global_library
            let markers_residue = window.global_residue
            let markers_medical = window.global_medical
            for (marker of markers_etc) {
              marker.setMap(map)
            }
            for (marker of markers_ambulance) {
              marker.setMap(map)
            }
            for (marker of markers_charger) {
              marker.setMap(map)
            }
            for (marker of markers_library) {
              marker.setMap(map)
            }
            for (marker of markers_residue) {
              marker.setMap(map)
            }
            for (marker of markers_medical) {
              marker.setMap(map)
            }
            info_menu.style.display = "none"
            // 노선 그래픽 데이터 이용하여 길 찾기
            // console.log(total_route_coordinate)
            if (mapObj.includes('@')) {
              map_obj = mapObj.split('@')
            } else {
              map_obj = mapObj
            }

            function loadLane(j) {
              return new Promise(function (resolve, reject) {
                var xhr2 = new XMLHttpRequest();
                var url2 = `https://api.odsay.com/v1/api/loadLane?apiKey=u02TH3T2TTBh0B40x%2B9Tpw&mapObject=127:37@${map_obj[j]}`;
                xhr2.open("GET", url2, true);
                xhr2.onreadystatechange = function () {
                  if (xhr2.readyState == 4) {
                    if (xhr2.status == 200) {
                      let resultObj = JSON.parse(xhr2.responseText);
                      const position = resultObj.result.lane[0].section[0].graphPos;

                      let line_position = [];

                      for (let i = 0; i < position.length; i++) {
                        line_position[i] = new kakao.maps.LatLng(37 + position[i].y, 127 + position[i].x);
                      }

                      resolve(line_position);
                    } else {
                      reject(xhr2.status);
                    }
                  }
                };
                xhr2.send();
              });
            }
            function loadlane(map_obj) {
              return new Promise(function (resolve, reject) {
                var xhr2 = new XMLHttpRequest();
                // console.log(map_obj[j])
                var url2 = `https://api.odsay.com/v1/api/loadLane?apiKey=u02TH3T2TTBh0B40x%2B9Tpw&mapObject=127:37@${map_obj}`;
                xhr2.open("GET", url2, true);
                xhr2.onreadystatechange = function () {
                  if (xhr2.readyState == 4) {
                    if (xhr2.status == 200) {
                      let resultObj = JSON.parse(xhr2.responseText);
                      const position = resultObj.result.lane[0].section[0].graphPos;

                      let line_position = [];

                      for (let i = 0; i < position.length; i++) {
                        line_position[i] = new kakao.maps.LatLng(37 + position[i].y, 127 + position[i].x);
                      }

                      resolve(line_position);
                    } else {
                      reject(xhr2.status);
                    }
                  }
                };
                xhr2.send();
              });
            }

            // Create an array to store promises for each iteration
            let promises = [];

            // Loop through the map_obj array using a for loop
            if (Array.isArray(map_obj)) {
              for (let j = 0; j < map_obj.length; j++) {
                promises.push(loadLane(j));
              }
            } else {
              promises.push(loadlane(map_obj))
            }

            // Use Promise.all to wait for all promises to resolve
            Promise.all(promises)
              .then(function (linePositionsArray) {
                console.log(promises)
                // Create a new polyline
                let total_route_coordinate = linePositionsArray.flat();
                total_route_coordinate.push(arrive_coordinate)
                total_route_coordinate.unshift(depart_coordinate)
                console.log(total_route_coordinate)
                let polylineVarName = 'polyline_' + i;

                polylineObj[polylineVarName] = new kakao.maps.Polyline({
                  path: total_route_coordinate,
                  strokeWeight: 8,
                  strokeColor: 'rgb(72, 250, 244)',
                  strokeOpacity: 1,
                  strokeStyle: 'solid'
                });

                // polylineObj[polylineVarName].setMap(map);
                console.log(polylineObj)
                // Hide all other polylines
                for (let key in polylineObj) {
                  if (key === polylineVarName) {
                    console.log('포함')
                    polylineObj[key].setMap(map)
                  } else {
                    console.log('포함 X')
                    polylineObj[key].setMap(null)
                  }
                }

                // 250m 내에 마커가 있으면 띄우고 나머지는 지우기

                // charger 마커중에서 반경 범위에 있으면 출력
                let show_charger_marker = []
                for (let i = 0; i < markers_charger.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_charger[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_charger_marker.push(markers_charger[i].Gb)
                      console.log(markers_charger[i].Gb)
                    }
                  }
                }
                const set_show_charger = new Set(show_charger_marker)

                const uniqueCharger = [...set_show_charger];

                for (let k = 0; k < markers_charger.length; k++) {
                  if (!uniqueCharger.includes(markers_charger[k].Gb)) {
                    markers_charger[k].setMap(null)
                  }
                }

                // library 마커중에서 반경 범위에 있으면 출력
                let show_library_marker = []
                for (let i = 0; i < markers_library.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_library[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_library_marker.push(markers_library[i].Gb)
                      console.log(markers_library[i].Gb)
                    }
                  }
                }
                const set_show_library = new Set(show_library_marker)

                const uniqueLibrary = [...set_show_library];

                for (let k = 0; k < markers_library.length; k++) {
                  if (!uniqueLibrary.includes(markers_library[k].Gb)) {
                    markers_library[k].setMap(null)
                  }
                }

                // 기타 시설 확인
                let show_etc_marker = []
                for (let i = 0; i < markers_etc.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_etc[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_etc_marker.push(markers_etc[i].Gb)
                      console.log(markers_etc[i].Gb)
                    }
                  }
                }
                const set_show_etc = new Set(show_etc_marker)

                const uniqueEtc = [...set_show_etc];

                for (let k = 0; k < markers_etc.length; k++) {
                  if (!uniqueEtc.includes(markers_etc[k].Gb)) {
                    markers_etc[k].setMap(null)
                  }
                }

                // 응급실 확인
                let show_ambulance_marker = []
                for (let i = 0; i < markers_ambulance.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_ambulance[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_ambulance_marker.push(markers_ambulance[i].Gb)
                      console.log(markers_ambulance[i].Gb)
                    }
                  }
                }
                const set_show_ambulance = new Set(show_ambulance_marker)

                const uniqueAmbulance = [...set_show_ambulance];

                for (let k = 0; k < markers_ambulance.length; k++) {
                  if (!uniqueAmbulance.includes(markers_ambulance[k].Gb)) {
                    markers_ambulance[k].setMap(null)
                  }
                }

                // 거주시설 확인
                let show_residue_marker = []
                for (let i = 0; i < markers_residue.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_residue[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_residue_marker.push(markers_residue[i].Gb)
                      console.log(markers_residue[i].Gb)
                    }
                  }
                }
                const set_show_residue = new Set(show_residue_marker)

                const uniqueResidue = [...set_show_residue];

                for (let k = 0; k < markers_residue.length; k++) {
                  if (!uniqueResidue.includes(markers_residue[k].Gb)) {
                    markers_residue[k].setMap(null)
                  }
                }

                // 의료시설 확인
                let show_medical_marker = []
                for (let i = 0; i < markers_medical.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_medical[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_medical_marker.push(markers_medical[i].Gb)
                      console.log(markers_medical[i].Gb)
                    }
                  }
                }
                const set_show_medical = new Set(show_medical_marker)

                const uniqueMedical = [...set_show_medical];

                for (let k = 0; k < markers_medical.length; k++) {
                  if (!uniqueMedical.includes(markers_medical[k].Gb)) {
                    markers_medical[k].setMap(null)
                  }
                }
              })
              .catch(function (error) {
                console.error("Error: " + error);
              });
          }) // 경로별 polyline 삽입
        }
      } // openAPI if문 종료
    }// onreadystatechange
  })
}


function addArrive() {

  console.log('도착지 설정');
  const marker_arrive = document.querySelector('#marker_name');
  const arrive_input = document.getElementById('arrive_place')

  let markers_etc = window.global_etc
  let markers_ambulance = window.global_ambulance
  let markers_charger = window.global_charger
  let markers_library = window.global_library
  let markers_residue = window.global_residue
  let markers_medical = window.global_medical

  if (search_arrive_marker != []) {
    search_arrive_marker = []
  }
  for (let i = 0; i < markers_library.length; i++) {
    let marker = markers_library[i];
    if (marker_arrive.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const arrive = marker.getPosition(); // depart에 값 할당
      arrive_input.value = marker_arrive.textContent
      search_arrive_marker.push(marker.Gb)
      search_arrive_marker.push(arrive)
      console.log(search_arrive_marker)
    }
  }
  for (let i = 0; i < markers_etc.length; i++) {
    let marker = markers_etc[i];
    if (marker_arrive.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const arrive = marker.getPosition(); // depart에 값 할당
      arrive_input.value = marker_arrive.textContent
      search_arrive_marker.push(marker.Gb)
      search_arrive_marker.push(arrive)
      console.log(search_arrive_marker)
    }
  }
  for (let i = 0; i < markers_ambulance.length; i++) {
    let marker = markers_ambulance[i];
    if (marker_arrive.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const arrive = marker.getPosition(); // depart에 값 할당
      arrive_input.value = marker_arrive.textContent
      search_arrive_marker.push(marker.Gb)
      search_arrive_marker.push(arrive)
      console.log(search_arrive_marker)
    }
  }
  for (let i = 0; i < markers_charger.length; i++) {
    let marker = markers_charger[i];
    if (marker_arrive.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const arrive = marker.getPosition(); // depart에 값 할당
      arrive_input.value = marker_arrive.textContent
      search_arrive_marker.push(marker.Gb)
      search_arrive_marker.push(arrive)
      console.log(search_arrive_marker)
    }
  }
  for (let i = 0; i < markers_residue.length; i++) {
    let marker = markers_residue[i];
    if (marker_arrive.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const arrive = marker.getPosition(); // depart에 값 할당
      arrive_input.value = marker_arrive.textContent
      search_arrive_marker.push(marker.Gb)
      search_arrive_marker.push(arrive)
      console.log(search_arrive_marker)
    }
  }
  for (let i = 0; i < markers_medical.length; i++) {
    let marker = markers_medical[i];
    if (marker_arrive.textContent == marker.Gb) {
      // window.location.href = '../find_road/test.html';
      const arrive = marker.getPosition(); // depart에 값 할당
      arrive_input.value = marker_arrive.textContent
      search_arrive_marker.push(marker.Gb)
      search_arrive_marker.push(arrive)
      console.log(search_arrive_marker)
    }
  }
  const arrive_button = document.getElementById('place_arrive')
  if(arrive_button !== null){
    arrive_button.value = search_arrive_marker[0]
  }
  const arrive_button_1 = document.getElementById('arrival_place')
  if(arrive_button_1 !== null){
    arrive_button_1.value = search_arrive_marker[0]
  }
  window.marker_search_arrive = search_arrive_marker

  const top = document.querySelector('#top')
  const add_html =
    `
  <input type="text" id="my_place_to_depart" placeholder="출발지를 입력하세요">
  <button class="want_to_find_depart_location"><img src="../app/images/search.png" alt="검색" id="search"></button>
  <input type="text" id="my_place_to_arrive" placeholder="도착지를 입력하세요">
  <button class="want_to_find_arrive_location"><img src="../app/images/search.png" alt="검색" id="search"></button>
  <button class="search_my_route"><img src="../app/images/road.png" alt="검색" id="search"></button>
  `
  top.innerHTML = add_html
  const depart_origin = document.getElementById('my_place_to_depart')
  // const value_depart = depart_origin.value
  // // const addDepart = window.marker_search_depart
  // if(value_depart !== null){
  //   console.log(value_depart)
  //   depart_origin.value = value_depart
  // }
  depart_value = window.addDepart_value
  if(depart_value != null || depart_value != undefined){
    depart_origin.value = depart_value
  }

  const arrive_place = document.getElementById('my_place_to_arrive')
  arrive_place.value = search_arrive_marker[0]


  const search_depart = document.querySelector('.want_to_find_depart_location')
  search_depart.addEventListener('click', () => {
    const departure = document.getElementById('my_place_to_depart')
    // 검색하여 마커를 찍은 다음 좌표만 가져오기
    var ps = new kakao.maps.services.Places();

    let search_marker = [];
    let marker_address = [];
    let marker_name = [];
    let erase_marker = [];
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다

    // 키워드 검색 완료 시 호출되는 콜백함수를 Promise로 감싸기
    function placesSearch() {
      return new Promise((resolve, reject) => {
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < data.length; i++) {
              var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(data[i].y, data[i].x)
              });
              search_marker[i] = new kakao.maps.LatLng(data[i].y, data[i].x);
              marker_address[i] = data[i].address_name;
              marker_name[i] = data[i].place_name;
              erase_marker[i] = marker
            }
            resolve(); // 검색 완료 후 Promise 해결
          } else {
            reject(new Error('Places search failed.')); // 검색 실패 시 Promise 거부
          }
        }

        // 검색 요청
        // 예시: performSearch('keyword');
        ps.keywordSearch(departure.value, placesSearchCB);
      });
    }
    // 검색 실행 및 결과 처리
    placesSearch()
      .then(() => {
        // 검색 완료 후 처리할 로직 작성
        const search_result = document.getElementById('my_search');
        search_result.style.display = "block";
        const road_search = document.getElementById('road_search')
        const x_button = document.getElementById('get_out_of_search_result')
        x_button.addEventListener('click', () => {
          search_result.style.display = "none"
        })

        let input_HTML = "";

        for (let i = 0; i < marker_name.length; i++) {
          input_HTML +=
            `
                <div id="search_result_total">
                    <p id="search_result_place">${i + 1} ${marker_name[i]}</p>
                    <p id="search_result_address">${marker_address[i]}</p>
                </div>
                `;
        }
        road_search.innerHTML = input_HTML;
        const search_place_result = document.querySelectorAll('#search_result_total')
        // console.log(search_place_result)

        for (let i = 0; i < search_place_result.length; i++) {
          console.log(search_place_result[i].textContent)
          search_place_result[i].addEventListener('click', () => {
            map.setCenter(search_marker[i])
            departure.value = marker_name[i]
            // 이미 값이 있는 경우 초기화를 해준다.
            if (search_depart_marker != []) {
              search_depart_marker = []
            }
            search_depart_marker.push(marker_name[i])
            search_depart_marker.push(erase_marker[i])
            window.addArrive_value = marker_name[i]
            search_result.style.display = 'none'
            const new_marker = []
            for (let j = 0; j < erase_marker.length; j++) {
              if (i != j) {
                new_marker.push(erase_marker[j])
              }
            }
            for (let k = 0; k < new_marker.length; k++) {
              new_marker[k].setMap(null)
            }
          })
        }
      })
      .catch(error => {
        // 검색 실패 시 처리할 로직 작성
        console.error(error);
      });
  })

  const search_arrival = document.querySelector('.want_to_find_arrive_location')
  search_arrival.addEventListener('click', () => {
    const arrival = document.getElementById('my_place_to_arrive')
    // 검색하여 마커를 찍은 다음 좌표만 가져오기
    var ps = new kakao.maps.services.Places();

    let search_marker = [];
    let marker_address = [];
    let marker_name = [];
    let erase_marker = []

    // 키워드 검색 완료 시 호출되는 콜백함수를 Promise로 감싸기
    function placesSearch() {
      return new Promise((resolve, reject) => {
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < data.length; i++) {
              var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(data[i].y, data[i].x)
              });
              search_marker[i] = new kakao.maps.LatLng(data[i].y, data[i].x);
              marker_address[i] = data[i].address_name;
              marker_name[i] = data[i].place_name;
              erase_marker[i] = marker
            }
            resolve(); // 검색 완료 후 Promise 해결
          } else {
            reject(new Error('Places search failed.')); // 검색 실패 시 Promise 거부
          }
        }

        // 검색 요청
        ps.keywordSearch(arrival.value, placesSearchCB);
      });
    }
    // 검색 실행 및 결과 처리
    placesSearch()
      .then(() => {
        // 검색 완료 후 처리할 로직 작성
        const search_result = document.getElementById('my_search');
        search_result.style.display = "block";
        const road_search = document.getElementById('road_search')
        const x_button = document.getElementById('get_out_of_search_result')
        x_button.addEventListener('click', () => {
          search_result.style.display = "none"
        })

        let input_HTML = "";

        for (let i = 0; i < marker_name.length; i++) {
          input_HTML +=
            `
                <div id="search_result_total">
                    <p id="search_result_place">${i + 1} ${marker_name[i]}</p>
                    <p id="search_result_address">${marker_address[i]}</p>
                </div>
                `;
        }
        road_search.innerHTML = input_HTML;
        const search_place_result = document.querySelectorAll('#search_result_total')
        // console.log(search_place_result)

        for (let i = 0; i < search_place_result.length; i++) {
          console.log(search_place_result[i].textContent)
          search_place_result[i].addEventListener('click', () => {
            map.setCenter(search_marker[i])
            arrival.value = marker_name[i]
            // 이미 값이 있는 경우 초기화를 해준다.
            if (search_arrive_marker != []) {
              search_arrive_marker = []
            }
            search_arrive_marker.push(marker_name[i])
            search_arrive_marker.push(erase_marker[i])
            search_result.style.display = 'none'
            const new_marker = []
            for (let j = 0; j < erase_marker.length; j++) {
              if (i != j) {
                new_marker.push(erase_marker[j])
              }
            }

            for (let k = 0; k < new_marker.length; k++) {
              new_marker[k].setMap(null)
            }
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  })
  const find_road = document.querySelector('.search_my_route')
  let polylineObj = {};
  find_road.addEventListener('click', () => {
    const button_menu_search = document.getElementById('button')
    button_menu_search.style.display = 'none'
    const info_menu = document.getElementById('search_result_path')
    info_menu.style.display = 'block'
    const result = document.getElementById('solo_result')
    result.style.display = 'block'

    const x_button = document.getElementById('get_out_of_result')
    x_button.addEventListener('click', () => {
      info_menu.style.display = 'none'
    })

    // 출발지, 도착지 좌표 얻기
    // const arrive_coordinate = arrive[1].getPosition()

    depart_coordinate = search_depart_marker[1].getPosition()
    arrive_coordinate = search_arrive_marker[1].getPosition()
    
    console.log(depart_coordinate)
    console.log(arrive_coordinate)

    const SX = depart_coordinate.La
    const SY = depart_coordinate.Ma

    const EX = arrive_coordinate.La
    const EY = arrive_coordinate.Ma

    // window.global_SX = SX
    // window.global_SY = SY
    // window.global_EX = EX
    // window.global_EY = EY

    // 길을 이을 총 좌표
    const total_route_coordinate = [depart_coordinate]
    var xhr = new XMLHttpRequest();
    var url = `https://api.odsay.com/v1/api/searchPubTransPathT?apiKey=u02TH3T2TTBh0B40x%2B9Tpw&SX=${SX}&SY=${SY}&EX=${EX}&EY=${EY}&SearchType=0`;
    // console.log(url)
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var resultObj = JSON.parse(xhr.responseText);
        // console.log(resultObj)
        path = resultObj.result.path;
        console.log(path);

        const path_sort_by_time = path.sort((a, b) => a.info.totalTime - b.info.totalTime);
        const path_least_time = path_sort_by_time.slice(0, 3)
        console.log(path_least_time)

        const mapObject_list = []
        let result_path = ``
        for (let i = 0; i < path_least_time.length; i++) {
          result_path +=
            `
              <p id="cost_time">최소 시간 ${i + 1}번 경로</p>
              <div id="least_route">
                <p>걸리는 시간: ${path_least_time[i].info.totalTime}분</p>
                <p>지나는 역의 총 개수: ${path_least_time[i].info.totalStationCount}개</p>
                <p>환승 횟수: ${path_least_time[i].info.subwayTransitCount}개</p>
              </div>
              `
          mapObject_list[i] = path_least_time[i].info.mapObj
        }
        result.innerHTML = result_path

        // 각 경로마다 polyline 생성하기
        const route_list = document.querySelectorAll('#least_route')
        // let polylineObj = {};
        for (let i = 0; route_list.length; i++) {
          let route = route_list[i]
          let mapObj = mapObject_list[i]
          route.addEventListener('click', () => {
            for (key in polylineObj) {
              polylineObj[key].setMap(null)
            }
            let markers_etc = window.global_etc
            let markers_ambulance = window.global_ambulance
            let markers_charger = window.global_charger
            let markers_library = window.global_library
            let markers_residue = window.global_residue
            let markers_medical = window.global_medical
            for (marker of markers_etc) {
              marker.setMap(map)
            }
            for (marker of markers_ambulance) {
              marker.setMap(map)
            }
            for (marker of markers_charger) {
              marker.setMap(map)
            }
            for (marker of markers_library) {
              marker.setMap(map)
            }
            for (marker of markers_residue) {
              marker.setMap(map)
            }
            for (marker of markers_medical) {
              marker.setMap(map)
            }
            info_menu.style.display = "none"
            // 노선 그래픽 데이터 이용하여 길 찾기
            // console.log(total_route_coordinate)
            if (mapObj.includes('@')) {
              map_obj = mapObj.split('@')
            } else {
              map_obj = mapObj
            }

            function loadLane(j) {
              return new Promise(function (resolve, reject) {
                var xhr2 = new XMLHttpRequest();
                var url2 = `https://api.odsay.com/v1/api/loadLane?apiKey=u02TH3T2TTBh0B40x%2B9Tpw&mapObject=127:37@${map_obj[j]}`;
                xhr2.open("GET", url2, true);
                xhr2.onreadystatechange = function () {
                  if (xhr2.readyState == 4) {
                    if (xhr2.status == 200) {
                      let resultObj = JSON.parse(xhr2.responseText);
                      const position = resultObj.result.lane[0].section[0].graphPos;

                      let line_position = [];

                      for (let i = 0; i < position.length; i++) {
                        line_position[i] = new kakao.maps.LatLng(37 + position[i].y, 127 + position[i].x);
                      }

                      resolve(line_position);
                    } else {
                      reject(xhr2.status);
                    }
                  }
                };
                xhr2.send();
              });
            }
            function loadlane(map_obj) {
              return new Promise(function (resolve, reject) {
                var xhr2 = new XMLHttpRequest();
                var url2 = `https://api.odsay.com/v1/api/loadLane?apiKey=u02TH3T2TTBh0B40x%2B9Tpw&mapObject=127:37@${map_obj}`;
                xhr2.open("GET", url2, true);
                xhr2.onreadystatechange = function () {
                  if (xhr2.readyState == 4) {
                    if (xhr2.status == 200) {
                      let resultObj = JSON.parse(xhr2.responseText);
                      const position = resultObj.result.lane[0].section[0].graphPos;

                      let line_position = [];

                      for (let i = 0; i < position.length; i++) {
                        line_position[i] = new kakao.maps.LatLng(37 + position[i].y, 127 + position[i].x);
                      }

                      resolve(line_position);
                    } else {
                      reject(xhr2.status);
                    }
                  }
                };
                xhr2.send();
              });
            }

            // Create an array to store promises for each iteration
            let promises = [];

            // Loop through the map_obj array using a for loop
            if (Array.isArray(map_obj)) {
              for (let j = 0; j < map_obj.length; j++) {
                promises.push(loadLane(j));
              }
            } else {
              promises.push(loadlane(map_obj))
            }

            // Use Promise.all to wait for all promises to resolve
            Promise.all(promises)
              .then(function (linePositionsArray) {
                console.log(promises)
                // Create a new polyline
                let total_route_coordinate = linePositionsArray.flat();
                total_route_coordinate.push(arrive_coordinate)
                total_route_coordinate.unshift(depart_coordinate)
                console.log(total_route_coordinate)
                let polylineVarName = 'polyline_' + i;

                polylineObj[polylineVarName] = new kakao.maps.Polyline({
                  path: total_route_coordinate,
                  strokeWeight: 8,
                  strokeColor: 'rgb(72, 250, 244)',
                  strokeOpacity: 1,
                  strokeStyle: 'solid'
                });

                console.log(polylineObj)
                // Hide all other polylines
                for (let key in polylineObj) {
                  if (key === polylineVarName) {
                    console.log('포함')
                    polylineObj[key].setMap(map)
                  } else {
                    console.log('포함 X')
                    polylineObj[key].setMap(null)
                  }
                }

                // 250m 내에 마커가 있으면 띄우고 나머지는 지우기

                // charger 마커중에서 반경 범위에 있으면 출력
                let show_charger_marker = []
                for (let i = 0; i < markers_charger.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_charger[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 500) {
                      show_charger_marker.push(markers_charger[i].Gb)
                      console.log(markers_charger[i].Gb)
                    }
                  }
                }
                const set_show_charger = new Set(show_charger_marker)

                const uniqueCharger = [...set_show_charger];

                for (let k = 0; k < markers_charger.length; k++) {
                  if (!uniqueCharger.includes(markers_charger[k].Gb)) {
                    markers_charger[k].setMap(null)
                  }
                }

                // library 마커중에서 반경 범위에 있으면 출력
                let show_library_marker = []
                for (let i = 0; i < markers_library.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_library[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_library_marker.push(markers_library[i].Gb)
                      console.log(markers_library[i].Gb)
                    }
                  }
                }
                const set_show_library = new Set(show_library_marker)

                const uniqueLibrary = [...set_show_library];

                for (let k = 0; k < markers_library.length; k++) {
                  if (!uniqueLibrary.includes(markers_library[k].Gb)) {
                    markers_library[k].setMap(null)
                  }
                }

                // 기타 시설 확인
                let show_etc_marker = []
                for (let i = 0; i < markers_etc.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_etc[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_etc_marker.push(markers_etc[i].Gb)
                      console.log(markers_etc[i].Gb)
                    }
                  }
                }
                const set_show_etc = new Set(show_etc_marker)

                const uniqueEtc = [...set_show_etc];

                for (let k = 0; k < markers_etc.length; k++) {
                  if (!uniqueEtc.includes(markers_etc[k].Gb)) {
                    markers_etc[k].setMap(null)
                  }
                }

                // 응급실 확인
                let show_ambulance_marker = []
                for (let i = 0; i < markers_ambulance.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_ambulance[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_ambulance_marker.push(markers_ambulance[i].Gb)
                      console.log(markers_ambulance[i].Gb)
                    }
                  }
                }
                const set_show_ambulance = new Set(show_ambulance_marker)

                const uniqueAmbulance = [...set_show_ambulance];

                for (let k = 0; k < markers_ambulance.length; k++) {
                  if (!uniqueAmbulance.includes(markers_ambulance[k].Gb)) {
                    markers_ambulance[k].setMap(null)
                  }
                }

                // 거주시설 확인
                let show_residue_marker = []
                for (let i = 0; i < markers_residue.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_residue[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_residue_marker.push(markers_residue[i].Gb)
                      console.log(markers_residue[i].Gb)
                    }
                  }
                }
                const set_show_residue = new Set(show_residue_marker)

                const uniqueResidue = [...set_show_residue];

                for (let k = 0; k < markers_residue.length; k++) {
                  if (!uniqueResidue.includes(markers_residue[k].Gb)) {
                    markers_residue[k].setMap(null)
                  }
                }

                // 의료시설 확인
                let show_medical_marker = []
                for (let i = 0; i < markers_medical.length; i++) {
                  for (let j = 0; j < total_route_coordinate.length; j++) {
                    c1 = total_route_coordinate[j]
                    c2 = markers_medical[i].getPosition()
                    var poly_check_line = new kakao.maps.Polyline({
                      // map: map, 을 하지 않아도 거리는 구할 수 있다.
                      path: [c1, c2]
                    });
                    var dist = poly_check_line.getLength();

                    if (dist <= 250) {
                      show_medical_marker.push(markers_medical[i].Gb)
                      console.log(markers_medical[i].Gb)
                    }
                  }
                }
                const set_show_medical = new Set(show_medical_marker)

                const uniqueMedical = [...set_show_medical];

                for (let k = 0; k < markers_medical.length; k++) {
                  if (!uniqueMedical.includes(markers_medical[k].Gb)) {
                    markers_medical[k].setMap(null)
                  }
                }
              })
              .catch(function (error) {
                console.error("Error: " + error);
              });
          }) // 경로별 polyline 삽입
        }
      } // openAPI if문 종료
    }// onreadystatechange
  })
}
