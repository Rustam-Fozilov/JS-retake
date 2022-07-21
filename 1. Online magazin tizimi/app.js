let products = [
    { name: '', amount: 0, price: 0 }
]

let buyedProducts = [
    { name: '', amount: 0, price: 0 }
]

function add() {
    let name = document.getElementById("name").value

    let amount = +document.getElementById("amount").value

    let price = +document.getElementById("price").value

    let tovarList = document.getElementById('tovarList')
    let list = "<select>"

    if (name == '' || amount == null || price == null) {
        document.getElementById("error").innerText = "Barcha ma'lumotlar kiritilishi shart !"
    } else if (Number.isInteger(amount) && Number.isInteger(price)) {
        for (let i = 0; i < products.length; i++) {
            if (name == products[i].name) {
                products[i].name = name
                products[i].amount = amount
                products[i].price = price

                products.splice(i, 1)
            }
        }

        products.push({
            name: name, amount: amount, price: price
        })
        //console.log(products);

        for (let i = 0; i < products.length; i++) {
            list += "<option>" + products[i].name + "</option>"
        }

    } else {
        document.getElementById("errorText").innerText = "Xatolik bor to'g'ri kiriting"
    }

    list += "</select>"
    tovarList.innerHTML = list
}

function show() {
    let sum1 = 0
    let sum2 = 0
    let resultAdd = document.getElementById("resultAdd")
    let table = "<table class='table table-bordered'><tr><th>№</th><th>Tovar nomi</th><th>Tovar miqdori</th><th>Tovar narxi</th></tr>"

    for (let i = 1; i < products.length; i++) {
        if (products[i].amount < 3) {
            table += "<tr><td class = 'red'>" + [i] + "</td><td class = 'red'>" +
                products[i].name + "</td><td class = 'red'>" + products[i].amount +
                "</td><td class = 'red'>" + products[i].price + "</td></tr>"

            sum1 = sum1 + products[i].amount
            sum2 = sum2 + products[i].price
        } else {
            table += "<tr><td>" + [i] + "</td><td>" +
                products[i].name + "</td><td>" + products[i].amount +
                "</td><td>" + products[i].price + "</td></tr>"

            sum1 = sum1 + products[i].amount
            sum2 = sum2 + products[i].price
        }
    }

    table += "<tr><th colspan = 2>Jami</th><td>" + sum1 + "</td><td>" + sum2 + "</td></tr></table>"
    resultAdd.innerHTML = table
}

function buy() {
    let price = 0;
    let tanlanganTovar = document.getElementById('tovarList').value
    let amount = +document.getElementById('amount2').value
    let error = document.getElementById('errorText2')

    if (Number.isInteger(amount)) {
        for (let i = 0; i < products.length; i++) {
            if (tanlanganTovar == products[i].name) {
                price = products[i].price
                products[i].amount -= amount;
            }
        }

        for (let i = 0; i < buyedProducts.length; i++) {
            if (tanlanganTovar == buyedProducts[i].name) {
                buyedProducts[i].name = tanlanganTovar
                buyedProducts[i].amount = amount
                buyedProducts[i].price = price

                buyedProducts.splice(i, 1)
            }
        }

        buyedProducts.push({
            name: tanlanganTovar, amount: amount, price: price
        })
        // console.log(buyedProducts);

    } else {
        error.innerText = 'Xatolik bor tori kiriting'
    }
}

function showBuyed() {
    let sum1 = 0
    let sum2 = 0
    let resultBuy = document.getElementById('resultBuy')
    let table = "<table class='table table-bordered'><tr><th>№</th><th>Tovar nomi</th><th>Tovar miqdori</th><th>Umumiy narxi</th></tr>"

    for (let i = 1; i < buyedProducts.length; i++) {
        if (buyedProducts[i].amount < 3) {
            table += "<tr><td class = 'red'>" + [i] + "</td><td class = 'red'>" +
                buyedProducts[i].name + "</td><td class = 'red'>" + buyedProducts[i].amount +
                "</td><td class = 'red'>" + buyedProducts[i].price * buyedProducts[i].amount + "</td></tr>"

            sum1 = sum1 + buyedProducts[i].amount
            sum2 = sum2 + buyedProducts[i].price * buyedProducts[i].amount
        } else {
            table += "<tr><td>" + [i] + "</td><td>" +
                buyedProducts[i].name + "</td><td>" + buyedProducts[i].amount +
                "</td><td>" + buyedProducts[i].price * buyedProducts[i].amount + "</td></tr>"

            sum1 = sum1 + buyedProducts[i].amount
            sum2 = sum2 + buyedProducts[i].price * buyedProducts[i].amount
        }
    }

    table += "<tr><th colspan = 2>Jami</th><td>" + sum1 + "</td><td>" + sum2 + "</td></tr></table>"
    resultBuy.innerHTML = table
}
