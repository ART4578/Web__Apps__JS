//users data
let users = [
    {
        name: "Jimi Smole",
        country: "Armenia",
        age: 25,
        gender: "male"
    },
    {
        name: "Julie Doe",
        country: "USA",
        age: 18,
        gender: "female"
    },
    {
        name: "Jimi Doe",
        country: "USA",
        age: 20,
        gender: "male"
    },
    {
        name: "Jenifer Doe",
        country: "Russia",
        age: 22,
        gender: "female"
    }
];

let usersBox = document.querySelector("#users-box");
let searchText = document.querySelector("#search-text");
let searchButton = document.querySelector("#search-button");
let filtersNav = document.querySelector("#filters-nav");
let updateFiltersBtn = document.querySelector("#update-filters");
let loginBtns = document.querySelectorAll(".login-btn");
let emailInput = document.querySelector("#email");

loginBtns[0].addEventListener("click", openHideLogin);
loginBtns[1].addEventListener("click", openHideLogin);

//email input validation
emailInput.addEventListener("keyup", function() {
    let emailMessage = document.querySelector("#email-message");

    if (emailInput.value.includes("@")) {
        emailMessage.innerHTML = "OK";
        emailMessage.style.color = "green";
    } else {
        emailMessage.innerHTML = "Invalid Email Address";
        emailMessage.style.color = "red";
    };
});

//open hide login popup to buttons click
function openHideLogin() {
    let loginBox = document.querySelector("#login-box");

    if (loginBox.style.display === "" || loginBox.style.display === "none") {
        loginBox.style.display = "block";
    } else {
        loginBox.style.display = "none";
    };
};

//update filters search users country and gender
updateFiltersBtn.addEventListener("click", function() {
    let currentCountry = document.querySelector("#country-filter").value.toLocaleLowerCase();
    let currentGender = document.querySelector("#gender-filter").value.toLocaleLowerCase();

    let filteredUsers = users.filter(function(user) {
        return (
            user.country.toLocaleLowerCase().includes(currentCountry) &&
            user.gender.toLocaleLowerCase().includes(currentGender) &&
            user.name.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase())
        );
    });

    usersBox.innerHTML = "";

    for (user of filteredUsers) {
        let userElement = document.createElement("div");
        userElement.classList.add("user-item");
        userElement.innerHTML = `
            <h2>Name: ${user.name}</h2>
            <p>Country: ${user.country}</p>
            <p>Age: ${user.age}</p>
            <p>Gender: ${user.gender}</p>
        `;
    
        usersBox.appendChild(userElement);
    }; 
});

//filters box popup display and none
filtersNav.addEventListener("click", function() {
    let filtersBox = document.querySelector("#filters");

    if (filtersBox.style.display === "" || filtersBox.style.display === "none") {
        filtersBox.style.display = "block";
    } else {
        filtersBox.style.display = "none";
    };
});

//search users name
searchButton.addEventListener("click", function() {
    let filteredUsers = users.filter(function(user) {
        return user.name.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase());
    });

    usersBox.innerHTML = "";

    for (user of filteredUsers) {
        let userElement = document.createElement("div");
        userElement.classList.add("user-item");
        userElement.innerHTML = `
            <h2>Name: ${user.name}</h2>
            <p>Country: ${user.country}</p>
            <p>Age: ${user.age}</p>
            <p>Gender: ${user.gender}</p>
        `;
    
        usersBox.appendChild(userElement);
    };    
});

//draw users
for (user of users) {
    let userElement = document.createElement("div");
    userElement.classList.add("user-item");
    userElement.innerHTML = `
        <h2>Name: ${user.name}</h2>
        <p>Country: ${user.country}</p>
        <p>Age: ${user.age}</p>
        <p>Gender: ${user.gender}</p>
    `;

    usersBox.appendChild(userElement);
};