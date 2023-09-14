search_button = document.getElementsByClassName('search')[0]

search_button.addEventListener('click', () => {
    const search = document.getElementById('facility_name').value
    const total_data = document.getElementById('my_search')

    const library_text = document.getElementById('library_text')
    const ambulance_text = document.getElementById('ambulance_text')
    const charger_text = document.getElementById('charger_text')
    const etc_text = document.getElementById('etc_text')
    const medical_text = document.getElementById('medical_text')
    const residue_text = document.getElementById('residue_text')
    // console.log(library_text)

    const x_button = document.getElementById('get_out_of_search_result')
    x_button.addEventListener('click', () => {
      total_data.style.display = "none"  
    })

    if(library_text.innerHTML !== "" || ambulance_text.innerHTML !== "" || charger_text.innerHTML !== "" || etc_text.innerHTML !== "" || medical_text.innerHTML !== "" || residue_text.innerHTML !== ""){
        const library_block = document.getElementById('search__library')
        const ambulance_block = document.getElementById('search__ambulance')
        const charger_block = document.getElementById('search__charger')
        const etc_block = document.getElementById('search__etc')
        const medical_block = document.getElementById('search__medical')
        const residue_block = document.getElementById('search__residue')

        library_block.style.display = "none"
        ambulance_block.style.display = "none"
        charger_block.style.display = "none"
        etc_block.style.display = "none"
        medical_block.style.display = "none"
        residue_block.style.display = "none"

        library_text.innerHTML = ""
        ambulance_text.innerHTML = ""
        charger_text.innerHTML = ""
        etc_text.innerHTML = ""
        medical_text.innerHTML = ""
        residue_text.innerHTML = ""
    }

    let data_library = ""
    let data_ambulance = ""
    let data_charger = ""
    let data_etc = ""
    let data_medical = ""
    let data_residue = ""

    let library_name = window.global_library_name
    let ambulance_name = window.global_ambulance_name
    let charger_name = window.global_charger_name
    let etc_name = window.global_etc_name
    let medical_name = window.global_medical_name
    let residue_name = window.global_residue_name

    let markers_etc = window.global_etc
    let markers_ambulance = window.global_ambulance
    let markers_charger = window.global_charger
    let markers_library = window.global_library
    let markers_residue = window.global_residue
    let markers_medical = window.global_medical
    // for(let i = 0; i < markers_charger.length; i++){
    //     const marker_name = markers_charger[i].Gb
    //     if(marker_name.includes('호선')){
    //         console.log(marker_name)
    //     }
    // }
    // 결과가 있을 경우 innerhtml을 대비
    // let data_library = ""
    // let data_ambulance = ""
    // let data_charger = ""
    // let data_etc = ""
    // let data_medical = ""
    // let data_residue = ""

    // 아무것도 입력하지 않았는데 자동으로 내용들이 다 튀어나와서 추가함
    if (search == ""){
        return null
    }

    let j = 1;
    for (let i = 0; i < library_name.length; i++) {
        if (library_name[i].includes(search)) {
            data_library += `<p id="library_data">${j} ${library_name[i]}</p>`;
            j++;
        }
    }

    j = 1;
    for (let i = 0; i < ambulance_name.length; i++) {
        if (ambulance_name[i].includes(search)) {
            data_ambulance += `<p id="ambulance_data">${j} ${ambulance_name[i]}</p>`;
            j++;
        }
    }

    j = 1;
    for (let i = 0; i < charger_name.length; i++) {
        if (charger_name[i].includes(search)) {
            data_charger += `<p id="charger_data">${j} ${charger_name[i]}</p>`;
            j++;
        }
    }

    j = 1;
    for (let i = 0; i < etc_name.length; i++) {
        if (etc_name[i].includes(search)) {
            data_etc += `<p id="etc_data">${j} ${etc_name[i]}</p>`;
            j++;
        }
    }

    j = 1;
    for (let i = 0; i < medical_name.length; i++) {
        if (medical_name[i].includes(search)) {
            data_medical += `<p id="medical_data">${j} ${medical_name[i]}</p>`;
            j++;
        }
    }

    j = 1;
    for (let i = 0; i < residue_name.length; i++) {
        if (residue_name[i].includes(search)) {
            data_residue += `<p id="residue_data">${j} ${residue_name[i]}</p>`;
            j++;
        }
    }



    total_data.style.display="block"
    if(data_library == "" && data_ambulance == "" && data_charger == "" && data_etc == "" && data_medical == "" && data_residue == ""){
        // total_data.style.display="block"
        total_data.innerHTML = "검색 결과가 없습니다."
    }
    // library_text.innerHTML = data_library
    // ambulance_text.innerHTML = data_ambulance
    // charger_text.innerHTML = data_charger
    // etc_text.innerHTML = data_etc
    // medical_text.innerHTML = data_medical
    // residue_text.innerHTML = data_residue
    
    if(data_library != ""){
        const library_block = document.getElementById('search__library')
        library_block.style.display = "block"
        console.log("도서관 데이터 있음")
        library_text.innerHTML = data_library
    }
    if(data_ambulance != ""){
        const ambulance_block = document.getElementById('search__ambulance')
        ambulance_block.style.display = "block"
        console.log("응급실 데이터 있음")
        ambulance_text.innerHTML = data_ambulance
    }
    if(data_charger != ""){
        const charger_block = document.getElementById('search__charger')
        charger_block.style.display = "block"
        console.log("충전소 데이터 있음")
        charger_text.innerHTML = data_charger
    }
    if(data_etc != ""){
        const etc_block = document.getElementById('search__etc')
        etc_block.style.display = "block"
        console.log("기타시설 데이터 있음")
        etc_text.innerHTML = data_etc
    }
    if(data_medical != ""){
        const medical_block = document.getElementById('search__medical')
        medical_block.style.display = "block"
        console.log("의료시설 데이터 있음")
        medical_text.innerHTML = data_medical
    }
    if(data_residue != ""){
        const residue_block = document.getElementById('search__residue')
        residue_block.style.display = "block"
        console.log("거주시설 데이터 있음")
        residue_text.innerHTML = data_residue
    }
    
    const library_marker_data = document.querySelectorAll('#library_data')
    // console.log(library_marker_data[0].textContent.split(' ')[1])
    const ambulance_marker_data = document.querySelectorAll('#ambulance_data')
    const charger_marker_data = document.querySelectorAll('#charger_data')
    const etc_marker_data = document.querySelectorAll('#etc_data')
    const medical_marker_data = document.querySelectorAll('#medical_data')
    const residue_marker_data = document.querySelectorAll('#residue_data')

    for (let i = 0; i<library_marker_data.length; i++){
        for (let j = 0; j < markers_library.length; j++){
            let libraryname = library_marker_data[i].textContent.substring(library_marker_data[i].textContent.indexOf(' ') + 1);
            if(markers_library[j].Gb == libraryname){
                library_marker_data[i].addEventListener('click', () => {
                    let latlng = markers_library[j].getPosition()
                    map.setCenter(latlng);
                    total_data.style.display = "none"
                })
            }
        }
    }
    for (let i = 0; i<ambulance_marker_data.length; i++){
        for (let j = 0; j < markers_ambulance.length; j++){
            let ambulancename = ambulance_marker_data[i].textContent.substring(ambulance_marker_data[i].textContent.indexOf(' ') + 1);
            if(markers_ambulance[j].Gb == ambulancename){
                ambulance_marker_data[i].addEventListener('click', () => {
                    let latlng = markers_ambulance[j].getPosition()
                    map.setCenter(latlng);
                    total_data.style.display = "none"
                })
            }
        }
    }
    for (let i = 0; i<charger_marker_data.length; i++){
        for (let j = 0; j < markers_charger.length; j++){
            let chargername = charger_marker_data[i].textContent.substring(charger_marker_data[i].textContent.indexOf(' ') + 1);
            if(markers_charger[j].Gb == chargername){
                charger_marker_data[i].addEventListener('click', () => {
                    let latlng = markers_charger[j].getPosition()
                    map.setCenter(latlng);
                    total_data.style.display = "none"
                })
            }
        }
    }
    for (let i = 0; i<etc_marker_data.length; i++){
        for (let j = 0; j < markers_etc.length; j++){
            let etcname = etc_marker_data[i].textContent.substring(etc_marker_data[i].textContent.indexOf(' ') + 1);
            if(markers_etc[j].Gb == etcname){
                etc_marker_data[i].addEventListener('click', () => {
                    let latlng = markers_etc[j].getPosition()
                    map.setCenter(latlng);
                    total_data.style.display = "none"
                })
            }
        }
    }
    for (let i = 0; i<medical_marker_data.length; i++){
        for (let j = 0; j < markers_medical.length; j++){
            let medicalname = medical_marker_data[i].textContent.substring(medical_marker_data[i].textContent.indexOf(' ') + 1);
            if(markers_medical[j].Gb == medicalname){
                medical_marker_data[i].addEventListener('click', () => {
                    let latlng = markers_medical[j].getPosition()
                    map.setCenter(latlng);
                    total_data.style.display = "none"
                })
            }
        }
    }
    for (let i = 0; i<residue_marker_data.length; i++){
        for (let j = 0; j < markers_residue.length; j++){
            let residuename = residue_marker_data[i].textContent.substring(residue_marker_data[i].textContent.indexOf(' ') + 1);
            if(markers_residue[j].Gb == residuename){
                residue_marker_data[i].addEventListener('click', () => {
                    let latlng = markers_residue[j].getPosition()
                    map.setCenter(latlng);
                    total_data.style.display = "none"
                })
            }
        }
    }
    // x 버튼 누를 때 모달 창 사라지면서 현재 위치 버튼 다시 보이게 하기

})
