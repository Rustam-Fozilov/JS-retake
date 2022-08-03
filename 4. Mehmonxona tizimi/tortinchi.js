let allClasses = [{
    classNumber: '',
    classType: '',
    classPrice: ''
}];

let bookedClasses = [{
    fromDate: '',
    toDate: '',
    classNumber: '',
    classType: '',
    classPrice: ''
}];

function sortByNumber(a, b) {
    if(a.classNumber < b.classNumber) {
        return -1;
    }

    if(a.classNumber > b.classNumber) {
        return 1;
    }
}


function add() {
    const classNumber = document.getElementById('classNumber').value;
    const classType = document.getElementById('classType').value;
    const error = document.querySelector('.error');
    const roomsList = document.getElementById('roomsList');
    let list = '';

    if (classNumber == '' || classType == '') {
        error.innerHTML = 'Please fill all fields';
        return;
    }

    if(classType.toLowerCase() != 'bir kishilik' && classType.toLowerCase() != 'ikki kishilik' && classType.toLowerCase() != 'uch kishilik') {
        error.innerHTML = 'Please enter correct class type';
        return;
    }

    for(let i = 1; i < allClasses.length; i++) {
        if(classNumber == allClasses[i].classNumber) {
            allClasses[i].classNumber = classNumber;
            allClasses[i].classType = classType;

            allClasses.splice(i, 1);
        }
    }

    allClasses.push({
        classNumber: classNumber,
        classType: classType,
    });

    allClasses.sort(sortByNumber);

    for(let i = 1; i < allClasses.length; i++) {
        list += `<option>${allClasses[i].classNumber}</option>`;
    }

    roomsList.innerHTML = list;
}

function show() {
    let result = document.getElementById("resultOfAdded");
    let table = "<table class='table'><tr><th>№</th><th>Xona nomeri</th><th>Turi</th><th>Narxi</th></tr>";
    
    for (let i = 1; i < allClasses.length; i++) {
        if(allClasses[i].classType.toLowerCase() == 'bir kishilik') {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${allClasses[i].classNumber}</td>
                    <td>${allClasses[i].classType}</td>
                    <td>180 000</td>
                </tr>
            `
        } else if(allClasses[i].classType.toLowerCase() == 'ikki kishilik') {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${allClasses[i].classNumber}</td>
                    <td>${allClasses[i].classType}</td>
                    <td>260 000</td>
                </tr>
            `
        } else if(allClasses[i].classType.toLowerCase() == 'uch kishilik') {
            table += `
                <tr>
                
                    <td>${i}</td>
                    <td>${allClasses[i].classNumber}</td>
                    <td>${allClasses[i].classType}</td>
                    <td>280 000</td>
                </tr>
            `
        }

    }

    table += "</table>";
    result.innerHTML = table;
}

function book() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const classType = document.getElementById('classType2').value;
    const roomList = document.getElementById('roomsList').value;
    const error = document.getElementById('error2');

    if(fromDate == '' || toDate == '' || roomList.value == '' || classType == '') {
        error.innerHTML = 'Please fill all fields';
        return;
    }

    if(classType.toLowerCase() == 'bir kishilik') {
        for(let i = 1; i < bookedClasses.length; i++) {
            if(fromDate < bookedClasses[i].toDate && bookedClasses[i].classType.toLowerCase() == 'bir kishilik') {
                error.innerHTML = 'This room is already booked';
                return;
            }
        }

        bookedClasses.push({
            fromDate: fromDate,
            toDate: toDate,
            classNumber: roomList,
            classType: classType,
            classPrice: '180 000'
        });
    }
    
    if(classType.toLowerCase() == 'ikki kishilik') {
        for(let i = 1; i < bookedClasses.length; i++) {
            if(fromDate < bookedClasses[i].toDate && bookedClasses[i].classType.toLowerCase() == 'ikki kishilik') {
                error.innerHTML = 'This room is already booked';
                return;
            }
        }

        bookedClasses.push({
            fromDate: fromDate,
            toDate: toDate,
            classNumber: roomList,
            classType: classType,
            classPrice: '260 000'
        });
    }
    
    if(classType.toLowerCase() == 'uch kishilik') {
        for(let i = 1; i < bookedClasses.length; i++) {
            if(fromDate < bookedClasses[i].toDate && bookedClasses[i].classType.toLowerCase() == 'uch kishilik') {
                error.innerHTML = 'This room is already booked';
                return;
            }
        }

        bookedClasses.push({
            fromDate: fromDate,
            toDate: toDate,
            classNumber: roomList,
            classType: classType,
            classPrice: '280 000'
        });
    }

    bookedClasses.sort((a, b) => {
        return new Date(a.fromDate) - new Date(b.fromDate);
    });
}

function showBooked() {
    let table = "<table class=table><tr><th rowspan = 2 >№</th><th rowspan = 2 >Xona nomeri</th><th colspan = 2 >Buyurtma sanasi</th><th rowspan = 2 >Kun miqdori</th><th rowspan = 2 >Umumiy narx</th></tr><tr><th>Dan</th><th>Gacha</th></tr>";
    let result = document.getElementById('resultOfBooked');
    let sum = 0;
    let all = 0;

    for(let i = 1; i < bookedClasses.length; i++) {
        if(bookedClasses[i].classType.toLowerCase() == 'bir kishilik') {
            let time = Math.abs(new Date(bookedClasses[i].toDate) - new Date(bookedClasses[i].fromDate));
            let days = Math.ceil(time / (1000 * 60 * 60 * 24));
            sum = days * 180000;

            table += `
                <tr>
                    <td>${i}</td>
                    <td>${bookedClasses[i].classNumber}</td>
                    <td>${bookedClasses[i].fromDate}</td>
                    <td>${bookedClasses[i].toDate}</td>
                    <td>${days}</td>
                    <td>${sum}</td>
                </tr>
            `

            all += sum;
        } else if(bookedClasses[i].classType.toLowerCase() == 'ikki kishilik') {
            let time = Math.abs(new Date(bookedClasses[i].toDate) - new Date(bookedClasses[i].fromDate));
            let days = Math.ceil(time / (1000 * 60 * 60 * 24));
            sum = days * 260000;

            table += `
                <tr>
                    <td>${i}</td>
                    <td>${bookedClasses[i].classNumber}</td>
                    <td>${bookedClasses[i].fromDate}</td>
                    <td>${bookedClasses[i].toDate}</td>
                    <td>${days}</td>
                    <td>${sum}</td>
                </tr>
            `

            all += sum;
        } else if(bookedClasses[i].classType.toLowerCase() == 'uch kishilik') {
            let time = Math.abs(new Date(bookedClasses[i].toDate) - new Date(bookedClasses[i].fromDate));
            let days = Math.ceil(time / (1000 * 60 * 60 * 24));
            sum = days * 280000;

            table += `
                <tr>
                    <td>${i}</td>
                    <td>${bookedClasses[i].classNumber}</td>
                    <td>${bookedClasses[i].fromDate}</td>
                    <td>${bookedClasses[i].toDate}</td>
                    <td>${days}</td>
                    <td>${sum}</td>
                </tr>
            `

            all += sum;
        }
    }

    table += `<tr><th colspan = 5>Jami</th><th>${all}</th></tr></table>`;
    result.innerHTML = table;

}