class FetchUsers {
    constructor() {
        this.rootDiv = document.getElementById("root");

        this.allUsers = [];

        this.init();
    };

    init() {
        this.searchDiv();
        this.fetchData();
    };

    async fetchData() {
        const res = await fetch("https://api.github.com/users");
        const users = await res.json();

        this.setUsers(users);

        this.allUsers = users;
    };

    setUsers(users) {
        const oldUsers = document.querySelectorAll(".child");

        oldUsers.forEach((user) => user.remove());


        users.map((user) => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("child");

            this.rootDiv.appendChild(userDiv);

            this.userName(user.login, userDiv);
            this.userImage(user.avatar_url, userDiv);
            this.userDeleteBtn(userDiv);
        });
    };

    searchDiv() {
        const searchDiv = document.createElement("div");
        searchDiv.classList.add("search-div");

        this.rootDiv.appendChild(searchDiv);

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search...";
        searchInput.classList.add("search-input");

        searchInput.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase();

            const filteredUsers = this.allUsers.filter((user) => {
                return user.login.toLowerCase().includes(value);
            });

            this.setUsers(filteredUsers);
        });

        searchDiv.appendChild(searchInput);
    };

    userName(userLogin, userDiv) {
        const userName = document.createElement("p");
        userName.innerText = userLogin;
        userName.classList.add("child-name");

        userDiv.appendChild(userName);
    };

    userImage(userImage, userDiv) {
        const userImageDiv = document.createElement("div");

        userDiv.appendChild(userImageDiv);

        const userImg = document.createElement("img");
        userImg.src = userImage;
        userImg.classList.add("child-image");

        userImageDiv.appendChild(userImg);
    };

    userDeleteBtn(userDiv) {
        const deleteUser = document.createElement("button");
        deleteUser.innerText = "DELETE";
        deleteUser.classList.add("btn-delete");
        deleteUser.addEventListener("click", () => userDiv.remove());      

        userDiv.appendChild(deleteUser);
    };
};

document.addEventListener("DOMContentLoaded", () => new FetchUsers());