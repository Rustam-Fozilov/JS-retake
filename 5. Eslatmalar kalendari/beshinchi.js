let allReminders = [{
    title: '',
    date: '',
    time: '',
}];

function add() {
    let text = document.getElementById('text').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let priority = document.getElementById('priority').value;
    let error = document.querySelector('.error');

    if (text == '' || date == '' || time == '' || priority == '') {
        return error.innerHTML = 'Xatoliklar mavjud!';
    }

    for (let i = 1; i < allReminders.length; i++) {
        if (date == allReminders[i].date && time == allReminders[i].time) {
            return error.innerHTML = 'Bu kunga eslatma mavjud !';
        }
    }

    allReminders.push({
        title: text,
        date: date,
        time: time,
        priority: priority
    });
}

function show() {
    let table = '<table class = table><tr><th>№</th><th>Matni</th><th>Sana</th><th>Vaqt</th><th>Muhimlik darajasi</th><th></th></tr>';
    let result = document.getElementById('result');

    for (let i = 1; i < allReminders.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${allReminders[i].title}</td>
            <td>${allReminders[i].date}</td>
            <td>${allReminders[i].time}</td>
            <td>${allReminders[i].priority}</td>
            <td><button onclick = "editReminder()" id="edit-btn">Tahrirlash</button></td>
            <td><button onclick = "deleteReminder()" id="delete-btn">Ochirish</button></td>
        </tr>
        `;
    }

    table += '</table>';
    result.innerHTML = table;


    // sorting table by clicking (start)
    document.querySelector('table').onclick = function (e) {
        if (e.target.textContent == 'Sana') {
            allReminders.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            show();
        } else if (e.target.textContent == 'Vaqt') {
            allReminders.sort((a, b) => {
                return a.time.localeCompare(b.time);
            });

            show();
        } else if (e.target.textContent == 'Matni') {
            allReminders.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            show();
        }
    }
    // sorting table by clicking (end)
}

function editReminder() {
    let tr = event.target.closest('tr');
    if (!tr) return;

    let text = prompt('Yangi matnni kiriting:');
    let date = prompt('Yangi sana:');
    let time = prompt('Yangi vaqt:');
    let priority = prompt('Yangi muhimlik darajasi:');

    tr.innerHTML = `
        <td>${tr.rowIndex}</td>
        <td>${text}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${priority}</td>
        <td><button onclick = "editReminder()" id="edit-btn">Tahrirlash</button></td>
        <td><button onclick = "deleteReminder()" id="delete-btn">Ochirish</button></td>
    `

    allReminders[tr.rowIndex] = {
        title: text,
        date: date,
        time: time,
        priority: priority
    }
}

function deleteReminder() {
    let tr = event.target.closest('tr');
    if (!tr) return;

    if (confirm('Ochirishni istaysizmi ?')) {
        allReminders.splice(tr.rowIndex, 1);
        show();
    }
}


/**
 * Calendar funksiyasi uchun hafta kunini qaytaradi 0=dushanba 6=yakshanba.
 * @param {date} date hozirgi sana.
 * @returns {number} hafta kunini qaytaradi son qiymatida (0-6, 0 dushanba).
 */

function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

/**
 * Calendar qurish funksiyasi.
 * @param elem shu elementga kalendar ornatadi.
 */

let curDate = new Date();
let globalMonth = curDate.getMonth() + 1;
let globalYear = curDate.getFullYear();

function calendar(elem, year, month) {
    elem = document.querySelector(elem);
    let mon = month - 1;
    let date = new Date(year, mon);

    let table = `
        <table>
            <tr>
                <th>Du</th>
                <th>Se</th>
                <th>Ch</th>
                <th>Pa</th>
                <th>Ju</th>
                <th>Sh</th>
                <th>Ya</th>    
            </tr>
            <tr>
    `;

    for (let i = 0; i < getDay(date); i++) {
        table += `<td></td>`;
    }

    while (date.getMonth() == mon) {
        table += `<td> ${date.getDate()}</td>`;

        if (getDay(date) % 7 == 6) {
            table += `</tr><tr>`;
        }
        date.setDate(date.getDate() + 1);
    }

    if (getDay(date) != 0) {
        for (let i = getDay(date); i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';
    elem.innerHTML = table;
}

function showCalendar() {
    let nextBtn = document.getElementById('next-btn');
    let prevBtn = document.getElementById('prev-btn');

    nextBtn.hidden = false;
    prevBtn.hidden = false;

    calendar('#result', globalYear, globalMonth);

    nextBtn.addEventListener('click', function () {
        globalMonth++;
        if (globalMonth > 12) {
            globalMonth = 1;
            globalYear++;
        }
        calendar('#result', globalYear, globalMonth);
    });

    prevBtn.addEventListener('click', function () {
        globalMonth--;
        if (globalMonth < 1) {
            globalMonth = 12;
            globalYear--;
        }
        calendar('#result', globalYear, globalMonth);
    });
}

