let allTests = [
    {
        question: '',
        aVariant: '',
        bVariant: '',
        cVariant: '',
        dVariant: '',
        answer: ''
    }
]

let correctAnswers = 0;

function add() {
    let question = document.getElementById('question').value;
    let a_variant = document.getElementById('a_variant').value;
    let b_variant = document.getElementById('b_variant').value;
    let c_variant = document.getElementById('c_variant').value;
    let d_variant = document.getElementById('d_variant').value;
    let answer = document.getElementById('correct_answer').value;
    let error = document.getElementById('errorText');

    if (question == '' || a_variant == '' || b_variant == '' || c_variant == '' || d_variant == '' || answer == '') {
        error.textContent = 'barcha malumotlar kiritilishi shart'
    } else {
        allTests.push({
            question: question, aVariant: a_variant, bVariant: b_variant, cVariant: c_variant, dVariant: d_variant, answer: answer
        })
        // console.log(allTests);
    }
}

function show() {
    let result = document.getElementById("resultOfAdded");
    let table = "<table><tr><th>№</th><th>Savol</th><th>a</th><th>b</th><th>c</th><th>d<th>To'g'ri javob</th></tr>";
    for (let i = 1; i < allTests.length; i++) {
        table +=
            "<tr><td>" + [i] + "</td><td>" + allTests[i].question +
            "</td><td>" + allTests[i].aVariant + "</td><td>" +
            allTests[i].bVariant + "</td><td>" +
            allTests[i].cVariant + "</td><td>" +
            allTests[i].dVariant + "</td><td>" +
            allTests[i].answer + "</td></tr>";
    }
    table += "</table>";

    result.innerHTML = table;

    document.getElementById('question').value = '';
    document.getElementById('a_variant').value = '';
    document.getElementById('b_variant').value = '';
    document.getElementById('c_variant').value = '';
    document.getElementById('d_variant').value = '';
    document.getElementById('correct_answer').value = '';
}

/* TIMER UCHUN KERAKLI OZGARUVCHILAR */
let second = 0;
let hour = 0;
let date = new Date();
let index = 1; // timer uchun emas, test savollarining index raqami.

function startTest() {
    let testAmount = +document.getElementById('testAmount').value;
    let testMinute = +document.getElementById('testTime').value;
    let error = document.getElementById('errorText2');

    let nextButton = document.createElement('button');
    nextButton.textContent = 'Keyingisi';
    nextButton.className = 'btn';

    let prevButton = document.createElement('button');
    prevButton.textContent = 'Oldingisi';
    prevButton.className = 'btn';

    if (testMinute != '' || testAmount != '') {
        if (Number.isInteger(testAmount) && Number.isInteger(testMinute)) {
            if (testAmount > allTests.length - 1) {
                error.textContent = 'Bunday miqdorda test mavjud emas';
            } else {
                /* 1-SAVOL VARIANTLARINI TABLE DA CHOP QILISH (START) */
                let table = "<table>";
                table += "<tr><th colspan = 5>" + allTests[1].question + "</th></tr>" +
                    "<tr><td>" + [1] +
                    "</td><td>a) " + allTests[1].aVariant + "<br><input type='radio' name = 'test' id = 'a'>" +
                    "</td><td>b) " + allTests[1].bVariant + "<br><input type='radio' name = 'test' id = 'b'>" +
                    "</td><td>c) " + allTests[1].cVariant + "<br><input type='radio' name = 'test' id = 'c'>" +
                    "</td><td>d) " + allTests[1].dVariant + "<br><input type='radio' name = 'test' id = 'd'>" + "</td></tr>";

                /* 1-SAVOL VARIANTLARINI TABLE DA CHOP QILISH (END) */

                document.body.innerHTML = '<h2>Test boshlandi</h2><div style="font-size: 26px;" id="timerPlace">00:00</div>';

                /* TIMER ORNATISH (START)*/
                setInterval(() => {
                    if (testMinute > 60) {
                        hour = testMinute / 60;
                        date.setHours(hour);
                        date.setMinutes(testMinute % 60);
                        date.setSeconds(second);
                    } else {
                        date.setHours(0);
                        date.setMinutes(testMinute);
                        date.setSeconds(second);
                    }

                    second--;
                    document.getElementById('timerPlace').textContent = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                    /* TIMERNI TUGAGANLIKKA TEKSHIRISH */
                    if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
                        console.log('tugadi');
                        return check(testAmount);
                    }

                }, 1000);
                /* TIMER ORNATISH (END)*/

                document.body.innerHTML += table;
                document.body.append(prevButton);
                document.body.append(nextButton);


                /* KEYINGI VARIANTLARNI TABLE DA CHOP QILISH (START) */
                nextButton.onclick = function () {
                    let IsvariantASelected = document.querySelector('#a');
                    let IsvariantBSelected = document.querySelector('#b');
                    let IsvariantCSelected = document.querySelector('#c');
                    let IsvariantDSelected = document.querySelector('#d');


                    /* BELGILANGAN VARIANT TO'G'RILIGIGA TEKSHIRISH (START) */
                    if (IsvariantASelected.checked && IsvariantASelected.id == allTests[index]["answer"]) {
                        correctAnswers++;
                    } else if (IsvariantBSelected.checked && IsvariantBSelected.id == allTests[index]["answer"]) {
                        correctAnswers++;
                    } else if (IsvariantCSelected.checked && IsvariantCSelected.id == allTests[index]["answer"]) {
                        correctAnswers++;
                    } else if (IsvariantDSelected.checked && IsvariantDSelected.id == allTests[index]["answer"]) {
                        correctAnswers++;
                    } else {
                        console.log('tori javob emas');
                    }
                    /* BELGILANGAN VARIANT TO'G'RILIGIGA TEKSHIRISH (END) */

                    // console.log(correctAnswers);

                    index++;

                    if (index == testAmount + 1) {
                        return check(testAmount);
                    }

                    table = "<tr><th colspan = 5>" + allTests[index].question + "</th></tr>" +
                        "<tr><td>" + [index] +
                        "</td><td>a) " + allTests[index].aVariant + "<br><input type='radio' name = 'test' id = 'a'>" +
                        "</td><td>b) " + allTests[index].bVariant + "<br><input type='radio' name = 'test' id = 'b'>" +
                        "</td><td>c) " + allTests[index].cVariant + "<br><input type='radio' name = 'test' id = 'c'>" +
                        "</td><td>d) " + allTests[index].dVariant + "<br><input type='radio' name = 'test' id = 'd'>" + "</td></tr>";

                    table += "</table>";

                    document.querySelector('table').innerHTML = table;
                }
                /* KEYINGI VARIANTLARNI TABLE DA CHOP QILISH (END) */

                /* OLDINGI VARIANTLARNI TABLE DA CHOP QILISH (START) */
                prevButton.onclick = function () {
                    index--;
                    correctAnswers--;

                    if (index == 0) {
                        index = 1;
                    }

                    if (correctAnswers < 0) {
                        correctAnswers = 0;
                    }
                    // console.log(correctAnswers);

                    table = "<tr><th colspan = 5>" + allTests[index].question + "</th></tr>" +
                        "<tr><td>" + [index] +
                        "</td><td>a) " + allTests[index].aVariant + "<br><input type='radio' name = 'test' id = 'a'>" +
                        "</td><td>b) " + allTests[index].bVariant + "<br><input type='radio' name = 'test' id = 'b'>" +
                        "</td><td>c) " + allTests[index].cVariant + "<br><input type='radio' name = 'test' id = 'c'>" +
                        "</td><td>d) " + allTests[index].dVariant + "<br><input type='radio' name = 'test' id = 'd'>" + "</td></tr>";

                    table += "</table>";

                    document.querySelector('table').innerHTML = table;
                }
                /* OLDINGI VARIANTLARNI TABLE DA CHOP QILISH (END) */
            }
        }
    } else {
        error.textContent = 'barcha malumotlar kiritilishi shart';
    }
}

function check(testAmount) {
    let percent = correctAnswers / (allTests.length - 1) * 100;

    document.body.innerHTML = `
    <h2>Test tugadi<h2>
    Siz ${testAmount} ta testdan ${correctAnswers} ta to'g'ri javob topdingiz. (${percent} %)
    Tugatilgan vaqt ${date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()} <br>
    <a href="ikkinchi.html"><button class="btn">qaytadan boshlash</button></a>
    `
}

