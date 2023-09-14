var xhr = new XMLHttpRequest();
var url = 'http://openapi.seoul.go.kr:8088/67724c44507268643131395759454f4c/json/StationAdresTelno/1/288/'; /* URL */
// json -> 파일형식
// subwayTourInfo -> 서비스명
// 1/2  -> 시작 인덱스/ 종료 인덱스


xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
        const jsonString = this.responseText;
        const parsedJson = JSON.parse(jsonString);
        // JSON 객체화
        const jsonString2 = parsedJson.StationAdresTelno.row;
        //console.log("jsonString2:" + jsonString2)
        // console.log("check:office" + station_name);
        const result = [];
        let line_num;
        let check_bool = false;
        // console.log(jsonString2[0].LINE[0])
        for (let i =0; i<jsonString2.length; i++) {
            const STATION_NAME = jsonString2[i].STATN_NM.slice(0,num)
            // console.log(jsonString2[i].STATN_NM.slice(0,2))
            if(station_name == STATION_NAME){
                check_bool = true;
                // console.log("check_bool :" + check_bool)
                // console.log(jsonString2[i].LINE[0])
                result.push({
                    line_num: jsonString2[i].LINE[0],
                    line_name: jsonString2[i].LINE,
                    station_name: jsonString2[i].STATN_NM,
                    station_telNum: jsonString2[i].TELNO
                })
                // console.log(result)
            }
            
        }
        //check_bool =!false -> true
        if (!check_bool){
            window.location.href  = './no_subway_detail.html'

        }

        const station_title = document.querySelector('#sub__convenience__title')
        station_title.innerHTML = `<div id="lineNumber__continer" class="lineNumber__continer">${result[0].line_num}</div>
        <p id="stationName__name" class="title__text">${result[0].station_name}역</p>
        <p id="stationName__lineNumber" class="title__text">${result[0].line_name}</p>`;
        const line_color = document.querySelector('.lineNumber__continer')
        const stationName__lineNumber = document.querySelector('#stationName__lineNumber');
        const telNum = document.querySelector('#sub__officephoneNumber__container')
        telNum.innerHTML=`<p id="sub__officephoneNumber">${result[0].station_telNum}</p>`
        if(result[0].line_num == 1 && result[0].line_name[0] == 1){
            line_color.style.backgroundColor = 'rgb(42, 95, 202)'
            stationName__lineNumber.style.color = 'rgb(42, 95, 202)'

        }if(result[0].line_num == 2 && result[0].line_name[0] == 2){
            line_color.style.backgroundColor = 'rgb(68, 170, 28)'
            stationName__lineNumber.style.color = 'rgb(68, 170, 28)'

        }if(result[0].line_num == 3 && result[0].line_name[0] == 3){
            line_color.style.backgroundColor = 'rgb(214, 117, 5)'
            stationName__lineNumber.style.color = 'rgb(214, 117, 5)'

        }if(result[0].line_num == 4 && result[0].line_name[0] == 4){
            line_color.style.backgroundColor = 'rgb(5, 186, 214)'
            stationName__lineNumber.style.color = 'rgb(5, 186, 214)'

        }if(result[0].line_num == 5 && result[0].line_name[0] == 5){
            line_color.style.backgroundColor = 'rgb(151, 49, 214)'
            stationName__lineNumber.style.color = 'rgb(151, 49, 214)'

        }if(result[0].line_num == 6 && result[0].line_name[0] == 6){
            line_color.style.backgroundColor = 'rgb(138, 83, 25)'
            stationName__lineNumber.style.color = 'rgb(138, 83, 25)'

        }if(result[0].line_num == 7 && result[0].line_name[0] == 7){
            line_color.style.backgroundColor = 'rgb(79, 119, 3)'
            stationName__lineNumber.style.color = 'rgb(79, 119, 3)'

        }if(result[0].line_num == 8 && result[0].line_name[0] == 8){
            line_color.style.backgroundColor = 'rgb(211, 36, 118)'
            stationName__lineNumber.style.color = 'rgb(211, 36, 118)'

        }
        if(result[0].line_num == 9 && result[0].line_name[0] == 9){
            line_color.style.backgroundColor = 'rgb(158, 139, 98)'
            stationName__lineNumber.style.color = 'rgb(158, 139, 98)'

        }
    }}



xhr.send('');
