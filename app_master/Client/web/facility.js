var xhr = new XMLHttpRequest();
	var url = 'http://openapi.seoul.go.kr:8088/55717a6c51736a733537466a744965/json/fcltOpenInfo_ORSSI/1/10/'; /* URL */
	// json -> 파일형식
	// tbElecWheelChrCharge -> 서비스명
	// 1/2  -> 시작 인덱스/ 종료 인덱스
	xhr.open('GET', url);
	xhr.onreadystatechange = function () {
		if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
			const jsonString = this.responseText;
			const parsedJson = JSON.parse(jsonString);
			// JSON 객체화
			const jsonString2 = parsedJson.fcltOpenInfo_ORSSI.row;

			// 주소와 시설 이름 모으기
			address = []
			facility = []
			for (let i = 0; i<jsonString2.length; i++){
				address[i] = jsonString2[i].FCLT_ADDR
				facility[i] = jsonString2[i].FCLT_NM
			}

			// 주소에 맞게 마커 찍기
			// 주소로 좌표를 검색합니다
            var imageSrc = "./img/pin.png";
			for(let i = 0; i<address.length;i++){
				// 주소-좌표 변환 객체를 생성합니다
                var imageSize = new kakao.maps.Size(24, 35); 
            
                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

				var geocoder = new kakao.maps.services.Geocoder();
				geocoder.addressSearch(address[i], function(result, status) {
				// 정상적으로 검색이 완료됐으면 
				if (status === kakao.maps.services.Status.OK) {
					var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
					// 결과값으로 받은 위치를 마커로 표시합니다
					var marker = new kakao.maps.Marker({
						map: map,
						position: coords,
                        image : markerImage,
					});
					// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
				}
				});
			}
		}
	};
	xhr.send('');