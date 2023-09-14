

const img_search = document.querySelector('.img1');
img_search.addEventListener('click', () => {
  const search_value = document.getElementById('search_medical').value;
  console.log(search_value);
  console.log(localStorage.length)


  // 결과창 보이게 하기
  const show_result = document.getElementById('search_result');
  show_result.style.display = 'block';

  const hospital = document.getElementById('hospital__info__container');
  hospital.style.display = 'none';

  var ps = new kakao.maps.services.Places();

  // 좌표 넣어놈
  let coordiante = [];
  let marker_address = [];
  let marker_name = [];

  // 키워드 검색 완료 시 호출되는 콜백함수를 Promise로 감싸기
  function placesSearch() {
    return new Promise((resolve, reject) => {
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          for (var i = 0; i < data.length; i++) {
            var marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(data[i].y, data[i].x)
            });
            coordiante[i] = new kakao.maps.LatLng(data[i].y, data[i].x);
            marker_address[i] = data[i].address_name;
            marker_name[i] = data[i].place_name;
          }
          resolve(); // 검색 완료 후 Promise 해결
        } else {
          reject(new Error('Places search failed.')); // 검색 실패 시 Promise 거부
        }
      }

      // 검색 요청
      // 예시: performSearch('keyword');
      ps.keywordSearch(search_value, placesSearchCB);
    });
  }

  // 검색 실행 및 결과 처리
  placesSearch()
    .then(() => {
      // 검색 완료 후 처리할 로직 작성

      // 검색 결과를 넣을 필드 보이게 하기
      const road_search = document.getElementById('road_search');
      const search_result = document.getElementById('search_result')
      const x_button = document.getElementById('get_out_of_search_result');
      x_button.addEventListener('click', () => {
        search_result.style.display = 'none';
        hospital.style.display = 'block';
      });

      let input_HTML = '';

      for (let i = 0; i < marker_name.length; i++) {
        input_HTML += `
          <div id="search_result_total">
              <p id="search_result_place">${i + 1} ${marker_name[i]}</p>
              <p id="search_result_address">${marker_address[i]}</p>
          </div>
        `;
      }
      road_search.innerHTML = input_HTML;
      const search_place_result = document.querySelectorAll('#search_result_total');

      for (let i = 0; i < search_place_result.length; i++) {
        search_place_result[i].addEventListener('click', () => {
          search_result.style.display = 'none';
          hospital.style.display = 'block';
          const add_input = document.getElementById('search_medical')
          add_input.value = marker_name[i]
          // 응급실 마커들간의 간격 구하기
          const ambulance_marker = localStorage.getItem('ambulance_coordinate');
          const markers_ambulance = JSON.parse(ambulance_marker);
          // localStorage.removeItem('ambulance_coordinate')
          console.log(markers_ambulance[0]);
          // localStorage.removeItem('data')
          console.log(coordiante[0])
          let distance_ambulance = [];
          if (markers_ambulance != undefined) {
            for (let j = 0; j < markers_ambulance.length; j++) {
              let La = markers_ambulance[j].La
              let Ma = markers_ambulance[j].Ma
              c1 = coordiante[i];
              c2 = new kakao.maps.LatLng(Ma, La)
              console.log(c1, c2)
              var poly_check_line = new kakao.maps.Polyline({
                // map: map, 을 하지 않아도 거리는 구할 수 있다.
                path: [c1, c2]
              });
              // console.log(poly_check_line)
              var dist = poly_check_line.getLength();
              distance_ambulance.push(dist)
            }
          }
          console.log(distance_ambulance)
          // 가장 짧은거 2개 추출

          const medical_marker = localStorage.getItem('medical_coordinate');
          const markers_medical = JSON.parse(medical_marker);

          const ambulance_repre = localStorage.getItem('ambulance_repre');
          const ambulance_repre_number = JSON.parse(ambulance_repre);

          const ambulance_num = localStorage.getItem('ambulance_num');
          const ambulance_number = JSON.parse(ambulance_num);

          const medical_tel = localStorage.getItem('medical_tel');
          const medical_number = JSON.parse(medical_tel);

          const medical_name = localStorage.getItem('medical_name');
          const medical_fac_name = JSON.parse(medical_name);

          const ambulance_address = localStorage.getItem('ambulance_address');
          const ambulance_address_detail = JSON.parse(ambulance_address);

          const medical_address = localStorage.getItem('medical_address');
          const medical_address_detail = JSON.parse(medical_address);

          const ambulance_name = localStorage.getItem('ambulance_name');
          const ambulance_name_detail = JSON.parse(ambulance_name)
          // localStorage.removeItem('medical_coordinate')
          console.log(markers_medical[0]);
          // localStorage.removeItem('data')
          console.log(coordiante[0])
          let distance_medical = [];
          if (markers_medical != undefined) {
            for (let j = 0; j < markers_medical.length; j++) {
              let La = markers_medical[j].La
              let Ma = markers_medical[j].Ma
              c1 = coordiante[i];
              c2 = new kakao.maps.LatLng(Ma, La)
              var poly_check_line = new kakao.maps.Polyline({
                // map: map, 을 하지 않아도 거리는 구할 수 있다.
                path: [c1, c2]
              });
              // console.log(poly_check_line)
              var dist = poly_check_line.getLength();
              distance_medical.push(dist)
            }
          }
          console.log(distance_medical)

          const ambulance_array = distance_ambulance.map((value, index) => ({ value, index }));
          const medical_array = distance_medical.map((value, index) => ({ value, index }));

          ambulance_array.sort((a, b) => a.value - b.value);
          medical_array.sort((a, b) => a.value - b.value);

          const ambulance_min_1 = ambulance_array[0].value
          const ambulance_min_2 = ambulance_array[1].value
          const medical_min_1 = medical_array[0].value
          const medical_min_2 = medical_array[1].value

          const new_array = [ambulance_min_1, ambulance_min_2, medical_min_1, medical_min_2]
          new_array.sort((a, b) => a - b);

          // 데이터를 수신하여 처리하는 함수
          const data = document.querySelectorAll('.hospital__info__container')
          const indices = [];
          for (let i = 0; i < data.length; i++) {
            const value = new_array[i];
            let index;

            if (value === ambulance_min_1) {
              index = ambulance_array[0].index;
              inner = 
              `
              <p>이름: ${ambulance_name_detail[index]}</p>
              <p>주소: ${ambulance_address_detail[index]}</p>
              <a href="tel:${ambulance_repre_number[index]}">대표 전화: ${ambulance_repre_number[index]}</p>
              <a href="tel:${ambulance_number[index]}">응급실 번호: ${ambulance_number[index]}</a>
              <p>거리: ${parseInt(ambulance_array[0].value)}m</p>
              
              `
              data[i].innerHTML = inner
            } else if (value === ambulance_min_2) {
              index = ambulance_array[1].index;
              inner = 
              `
              <p>이름: ${ambulance_name_detail[index]}</p>
              <p>주소: ${ambulance_address_detail[index]}</p>
              <a href="tel:${ambulance_repre_number[index]}">대표 전화: ${ambulance_repre_number[index]}</p>
              <a href="tel:${ambulance_number[index]}">응급실 번호: ${ambulance_number[index]}</a>
              <p>거리: ${parseInt(ambulance_array[1].value)}m</p>
              `
              data[i].innerHTML = inner
            } else if (value === medical_min_1) {
              index = medical_array[0].index;
              inner = 
              `
              <p>이름: ${medical_fac_name[index]}</p>
              <p>주소: ${medical_address_detail[index]}</p>
              <a href="tel:${medical_number[index]}">의료 시설 번호: ${medical_number[index]}</a>
              <p>거리: ${parseInt(medical_array[0].value)}m</p>
              `
              data[i].innerHTML = inner
            } else if (value === medical_min_2) {
              inner = 
              `
              <p>이름: ${medical_fac_name[index]}</p>
              <p>주소: ${medical_address_detail[index]}</p>
              <a href="tel:${medical_number[index]}">의료 시설 번호: ${medical_number[index]}</a>
              <p>거리: ${parseInt(medical_array[1].value)}m</p>
              `
              data[i].innerHTML = inner
            }
            console.log(index)
            indices.push(index);
          }
          console.log(indices);
        })
      }
    })
    .catch(error => {
      // 검색 실패 시 처리할 로직 작성
      console.error(error);
    });
});