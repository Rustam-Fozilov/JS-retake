let allLectures = [
    {
        speaker: '',
        section: '',
        title: '',
        fromTime: '',
        toTime: '',
    }
]

let lectureDates = [{
    fromTime: '',
    toTime: '',
}]

function sortBySection(a, b) {
    if(a.section < b.section) {
        return -1;
    }

    if(a.section > b.section) {
        return 1;
    }
}

function dateSplitter(date, arr) {
    for (let i = 1; i < date.length; i++) {
        arr.push({
            fromTime: date[i]["fromTime"].split(' '),
            toTime: date[i]["toTime"].split(' '),
        });
    }
}

function add() {
    let speaker = document.getElementById('fio').value;
    let section = document.getElementById('section').value;
    let title = document.getElementById('title').value;
    let fromTime = document.getElementById('fromTime').value;
    let toTime = document.getElementById('toTime').value;
    let selectLectureres = document.getElementById('selectLectureres');
    let list = '';

    allLectures.push({
        speaker: speaker, section: section, title: title, fromTime: fromTime, toTime, toTime
    });

    allLectures.sort(sortBySection);

    for (let i = 0; i < allLectures.length; i++) {
        list += "<option>" + allLectures[i].speaker + "</option>"
    }
    selectLectureres.innerHTML = list;
    // console.log(allLectures);
}

function show() {
    let result = document.getElementById('resultOfAdded');
    let table = "<table><tr><th>Sana</th><th>Vaqt</th><th>Maruza sarlavhasi</th><th>Maruzachi</th></tr>";

    dateSplitter(allLectures, lectureDates);

    for (let i = 1; i < allLectures.length; i++) {

        let speakerName = allLectures[i]["speaker"].split(' ');

        table += `
        <tr>
            <td colspan="4" align="center">${allLectures[i].section}</td>
        </tr>
        <tr>
            <td>${lectureDates[i]["fromTime"][0]}</td>
            <td>
                ${lectureDates[i]["fromTime"][1]} <br>
                ${lectureDates[i]["toTime"][1]}
                <td>${allLectures[i]["title"]}</td>
                <td>
                    ${speakerName[0] + ' ' +
                    speakerName[1][0].toUpperCase() + '.' +
                    speakerName[2][0].toUpperCase()}
                </td>
            </td>
        </tr>
        `;
    }

    table += '</table>';
    result.innerHTML = table;
}

function search() {
    let result = document.getElementById('resultOfSearch');
    let searchTime = document.getElementById('searchTime');
    let searchDate = document.getElementById('searchDate');
    let selectLectureres = document.getElementById('selectLectureres');
    let table = "<table><tr><th>Sana</th><th>Seksiya</th><th>Maruza ma'lumotlari</th></tr>";
    let error = document.querySelector('.error');

    dateSplitter(allLectures, lectureDates);

    if(searchTime.value == '' && searchDate.value == '' && selectLectureres.value == '') {
        error.textContent = 'malumot kiritilmadi !';
        table = '';
    } else {
        for(let i = 1; i < allLectures.length; i++) {
            let speakerName = allLectures[i]["speaker"].split(' ');

            if(
                (searchDate.value == lectureDates[i].fromTime[0] && searchTime.value == '' && selectLectureres.value == '') ||
                (searchDate.value == '' && searchTime.value == lectureDates[i].fromTime[1] && selectLectureres.value == '') ||
                (searchDate.value == '' && searchTime.value == '' && selectLectureres.value == allLectures[i].speaker)
            ) {
                // console.log('man iwladim 0');
                table += `
                    <tr>
                        <td>${lectureDates[i]["fromTime"][0]} <br>
                            ${lectureDates[i]["fromTime"][1]} <br>
                            ${lectureDates[i]["toTime"][1]}
                        </td>
                        <td>${allLectures[i]["section"]}</td>
                        <td>
                            ${speakerName[0] + ' ' +
                            speakerName[1][0].toUpperCase() + '.' +
                            speakerName[2][0].toUpperCase() + ' ' +
                            allLectures[i]["title"]
                            } 
                        </td>
                    </tr>
                    `;
            }
        }

        if(searchDate.value != '' && searchTime.value != '' && selectLectureres.value != '') {
            for(let i = 1; i < allLectures.length; i++) {
                let speakerName = allLectures[i]["speaker"].split(' ');

                if(lectureDates[i].fromTime[0] == searchDate.value && lectureDates[i].fromTime[1] == searchTime.value && allLectures[i].speaker == selectLectureres.value) {
                    // console.log('man iwladim 1');
                    table += `
                    <tr>
                        <td>${lectureDates[i]["fromTime"][0]} <br>
                            ${lectureDates[i]["fromTime"][1]} <br>
                            ${lectureDates[i]["toTime"][1]}
                        </td>
                        <td>${allLectures[i]["section"]}</td>
                        <td>
                            ${speakerName[0] + ' ' +
                            speakerName[1][0].toUpperCase() + '.' +
                            speakerName[2][0].toUpperCase() + ' ' +
                            allLectures[i]["title"]
                            } 
                        </td>
                    </tr>
                    `;
                }
            }
        }
        
        if(searchDate.value != '' && searchTime != '') {
            for(let i = 1; i < allLectures.length; i++) {
                let speakerName = allLectures[i]["speaker"].split(' ');

                if(lectureDates[i].fromTime[0] == searchDate.value && lectureDates[i].fromTime[1] == searchTime.value) {
                    // console.log('man iwladim 2');
                    table += `
                    <tr>
                        <td>${lectureDates[i]["fromTime"][0]} <br>
                            ${lectureDates[i]["fromTime"][1]} <br>
                            ${lectureDates[i]["toTime"][1]}
                        </td>
                        <td>${allLectures[i]["section"]}</td>
                        <td>
                            ${speakerName[0] + ' ' +
                            speakerName[1][0].toUpperCase() + '.' +
                            speakerName[2][0].toUpperCase() + ' ' +
                            allLectures[i]["title"]
                            } 
                        </td>
                    </tr>
                    `;
                }
            }
        }
        
        if(searchDate.value != '' && selectLectureres.value != '') {
            for(let i = 1; i < allLectures.length; i++) {
                let speakerName = allLectures[i]["speaker"].split(' ');

                if(lectureDates[i].fromTime[0] == searchDate.value && allLectures[i].speaker == selectLectureres.value) {
                    // console.log('man iwladim 3');
                    table += `
                    <tr>
                        <td>${lectureDates[i]["fromTime"][0]} <br>
                            ${lectureDates[i]["fromTime"][1]} <br>
                            ${lectureDates[i]["toTime"][1]}
                        </td>
                        <td>${allLectures[i]["section"]}</td>
                        <td>
                            ${speakerName[0] + ' ' +
                            speakerName[1][0].toUpperCase() + '.' +
                            speakerName[2][0].toUpperCase() + ' ' +
                            allLectures[i]["title"]
                            } 
                        </td>
                    </tr>
                    `;
                }
            }
        }
        
        if(searchTime.value != '' && selectLectureres != '') {
            for(let i = 1; i < allLectures.length; i++) {
                let speakerName = allLectures[i]["speaker"].split(' ');

                if(lectureDates[i].fromTime[1] == searchTime.value && allLectures[i].speaker == selectLectureres.value) {
                    // console.log('man iwladim 4');
                    table += `
                    <tr>
                        <td>${lectureDates[i]["fromTime"][0]} <br>
                            ${lectureDates[i]["fromTime"][1]} <br>
                            ${lectureDates[i]["toTime"][1]}
                        </td>
                        <td>${allLectures[i]["section"]}</td>
                        <td>
                            ${speakerName[0] + ' ' +
                            speakerName[1][0].toUpperCase() + '.' +
                            speakerName[2][0].toUpperCase() + ' ' +
                            allLectures[i]["title"]
                            } 
                        </td>
                    </tr>
                    `;
                }
            }
        }

        
    }
    
    
    if(table == "<table><tr><th>Sana</th><th>Seksiya</th><th>Maruza ma'lumotlari</th></tr>") {
        error.textContent = 'Hech narsa topilmadi';
        table = '';
    }
    
    table += '</table>';
    result.innerHTML = table;
}