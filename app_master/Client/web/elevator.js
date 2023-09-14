// import { 함수명 } from '../fhksfskl'
var xhr = new XMLHttpRequest();
var url = 'http://openapi.seoul.go.kr:8088/67724c44507268643131395759454f4c/json/SeoulMetroFaciInfo/1/1000/';
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
        // for (let i =0; i<3; i++){
        // }
        const jsonString = this.responseText;
        const parsedJson = JSON.parse(jsonString);
        // JSON 객체화
        const jsonString2 = parsedJson.SeoulMetroFaciInfo.row;

        const jsonString3 = JSON.stringify(jsonString2, null, 2);


        // JSON 객체를 문자열로 변환하고, 들여쓰기와 함께 포맷팅된 문자열 얻기
        // const jsonOutputElement = document.getElementById("jsonOutput");
        // jsonOutputElement.textContent = jsonString3;

        // let station_name = station_name
        console.log("check:elevator:  " + station_name);

        const result = [];
        for (i = 0; i < jsonString2.length; i++) {
            // 사용자에게 입력 받은 역 이름(역을 빼고)와 json에서 파싱해온 STATION_NM과 비교
            // console.log(jsonString2[i].STATION_NM)
            const STATION_NAME = jsonString2[i].STATION_NM.slice(0, num) // 서울대입구
            // console.log(STATION_NAME)
            if (station_name == STATION_NAME) {
                // 엘리베이터 정보 가져오기
                let inAndOut;
                let gubun;
                // console.log(typeOf(jsonString2[i].GUBUN))
                if (jsonString2[i].GUBUN == 'EV' || jsonString2[i].GUBUN == 'WL') {
                    // console.log(jsonString2[i].FACI_NM[(jsonString2[i].FACI_NM).length - 4])
                    // console.log(jsonString2[i].FACI_NM.length)

                    //if 승강기)엘리베이터 2 와 승강기)엘리베이터 내부#1 비교할수 있는 조건문
                    if (jsonString2[i].FACI_NM.length >= 12) {
                        if (jsonString2[i].GUBUN == 'EV') {
                            inAndOut = jsonString2[i].FACI_NM[(jsonString2[i].FACI_NM).length - 4];
                            gubun = 'EV'
                        } else {
                            inAndOut = jsonString2[i].FACI_NM[(jsonString2[i].FACI_NM).length - 3];
                            gubun = 'WL'
                        }
                    }
                    else {
                        if (jsonString2[i].GUBUN == 'EV') {
                            // inAndOut = jsonString2[i].FACI_NM[(jsonString2[i].FACI_NM).length - 4];
                            inAndOut = '전'
                            gubun = 'EV'
                        } else {
                            // inAndOut = jsonString2[i].FACI_NM[(jsonString2[i].FACI_NM).length - 3];
                            inAndOut = '전'
                            gubun = 'WL'
                        }
                    }
                    //else gubun = 'ev' inAndOut = '#'
                    result.push({
                        station_name: jsonString2[i].STATION_NM,
                        //구분 
                        gubun,
                        inAndOut,  // '외' 또는 '내' 또는 '전' 만 뽑음
                        location: jsonString2[i].LOCATION
                    });

                }
                const elevator_info = document.querySelector('#elevator__context__container');
                const wheelchair_info = document.querySelector
                    ('#wheelchairLift__context__container');
                let html = '';
                let html2 = '';
                let boolValue = false;
                let boolValue2 = false;
                for (let j = 0; j < result.length; j++) {

                    // result[j].gubun == 'EV'일때
                    if (result[j].gubun == 'EV') {
                        boolValue = true;
                        if (result[j].inAndOut == '외') {
                            // console.log(result[j].inAndOut)
                            html += `<div class="elevator__container">`;
                            html += `<div class="inner__outer__separator outer">${result[j].inAndOut}</div>`;
                        } else if (result[j].inAndOut == '내') {
                            html += `<div class="elevator__container">`;
                            html += `<div class="inner__outer__separator">${result[j].inAndOut}</div>`;
                        } else {
                            html += `<div class="elevator__container">`;
                            html += `<div class="inner__outer__separator all">${result[j].inAndOut}</div>`;
                        }
                        html += `<p>${result[j].location}</p>`;
                        html += `</div>`;
                    }

                    //result[j].gubun == 'WL'일때
                    if (result[j].gubun == 'WL') {
                        console.log('휠ㅊㅔ어는 바보야')
                        boolValue2 = true;
                        if (result[j].inAndOut == '외') {
                            html2 += `<div class="wheelchair__container">`;
                            html2 += `<div class="inner__outer__separator outer">${result[j].inAndOut}</div>`;
                            html2 += `<p>${result[j].location}</p>`;
                            html2 += `</div>`;
                        } else {
                            html2 += `<div class="wheelchair__container">`;
                            html2 += `<div class="inner__outer__separator">${result[j].inAndOut}</div>`;
                            html2 += `<p>${result[j].location}</p>`;
                            html2 += `</div>`;
                        }
                    }
                }
                // console.log(boolValue2)
                if (!boolValue) {
                    html = `<div class="elevator__container" id="no_info3">정보 없음</div>`;
                }
                // console.log(boolValue)
                if (!boolValue2) {
                    html2 = `<div class="wheelchair__container" id="no_info2">정보 없음</div>`;
                }
                elevator_info.innerHTML = html;
                wheelchair_info.innerHTML = html2;
            }
        }
    }
}



xhr.send('');
