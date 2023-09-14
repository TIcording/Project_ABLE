var xhr = new XMLHttpRequest();
var url = 'http://openapi.seoul.go.kr:8088/4f6b504e4e736a7333336650786166/json/subwayTourInfo/1/457/'; /* URL */
// json -> 파일형식
// tbElecWheelChrCharge -> 서비스명
// 1/2  -> 시작 인덱스/ 종료 인덱스
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
        const jsonString = this.responseText;
        const parsedJson = JSON.parse(jsonString);
        // JSON 객체화
        const jsonString2 = parsedJson.subwayTourInfo.row;
        const station = []
        for (let i = 0; i < jsonString2.length; i++){
            let station_input = jsonString2[i].STATION
            if (!station.includes(station_input)){
                station.push(station_input)
            }
        }
        console.log(station.length)
        console.log(station)

        var infowindow = new kakao.maps.InfoWindow({zIndex:1});
        var ps = new kakao.maps.services.Places(); 

        // 키워드로 장소를 검색합니다
        ps.keywordSearch('수인분당선', placesSearchCB); 
        
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();
        
                for (var i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       
            } 
        }
        const imageSrc = "./img/pin.png"; 
        const imageSize = new kakao.maps.Size(24, 35); 
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
                image: markerImage
            });
        
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }
        
        // const imageSrc = "./img/pin.png"; 
        // const imageSize = new kakao.maps.Size(24, 35); 
        // const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        // // 지도에 마커를 표시하는 함수입니다
        // function displayMarker(place) {
        //     // 마커를 생성하고 지도에 표시합니다
        //     var marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(place.y, place.x),
        //         image: markerImage
        //     });
        
        //     // 마커에 클릭이벤트를 등록합니다
        //     kakao.maps.event.addListener(marker, 'click', function() {
        //         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        //         infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //         infowindow.open(map, marker);
        //     });
        // }
    }
};
xhr.send('');
