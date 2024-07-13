const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

//open shopping cart
openShopping.addEventListener("click", function() {
    body.classList.add("active");
});

//close shopping cart
closeShopping.addEventListener("click", function() {
    body.classList.remove("active");
});

//products data
let products = [
    {
        id: 1,
        name: "Samsung M5",
        img: "product1.png",
        price: 2000
    },
    {
        id: 2,
        name: "Samsung A53",
        img: "product2.png",
        price: 2200
    },
    {
        id: 3,
        name: "Samsung A33",
        img: "product3.png",
        price: 2400
    },
    {
        id: 4,
        name: "Samsung S10",
        img: "product4.png",
        price: 2600
    },
    {
        id: 5,
        name: "Samsung J5",
        img: "product5.png",
        price: 1800
    },
    {
        id: 6,
        name: "Samsung J7",
        img: "product6.png",
        price: 1600
    }
];

let listCards = [];

//draw products the HTML
function initApp() {
    products.forEach(function(value, key) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="./img/${value.img}" alt="">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>
        `;

        list.appendChild(newDiv);
    });
};

initApp();

//add to card
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    };

    reloadCard();
};

//reload products
function reloadCard() {
    listCard.innerHTML = "";

    let count = 0;
    let totalPrice = 0;

    listCards.forEach(function(value, key) {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;   
        
        //add product the shopping cart
        if (value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div>
                    <img src="./img/${value.img}" alt="">
                </div>
                <div class="cardTitle">${value.name}</div>
                <div class="cardPrice">${value.price.toLocaleString()}</div>
                <div>
                    <button class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${count}</div>
                    <button class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;

            listCard.appendChild(newDiv);
        };

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    });
};

//change product quantity
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    };

    reloadCard();
};