class Calendar {
    constructor() {
        this.daysTag = document.querySelector(".days");
        this.currentDate = document.querySelector(".current-date");
        this.prevNextIcon = document.querySelectorAll(".icons span");
        this.weeks = document.querySelector(".weeks");

        this.date = new Date();
        this.currYear = this.date.getFullYear();
        this.currMonth = this.date.getMonth();

        this.weekDays = [
            "Sun", "Mon", "Tue", "Wed",
            "Thu", "Fri", "Sat"
        ];

        this.months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        this.renderWeeks();
        this.renderCalendar();
        this.addEvents();
    };

    renderWeeks() {
        this.weekDays.forEach((day) => {
            const li = document.createElement("li");
            li.textContent = day;
            this.weeks.appendChild(li);
        });
    };

    renderCalendar() {
        let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
        let lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();

        let lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
        let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();

        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `
                <li class="inactive">
                    ${lastDateofLastMonth - i + 1}
                </li>
            `;
        };

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday =
                i === this.date.getDate() &&
                this.currMonth === new Date().getMonth() &&
                this.currYear === new Date().getFullYear() ? "active" : "";

            liTag += `<li class="${isToday}">${i}</li>`;
        };

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `
                <li class="inactive">
                    ${i - lastDayofMonth + 1}
                </li>
            `;
        };

        this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
        this.daysTag.innerHTML = liTag;
    };

    addEvents() {
        this.prevNextIcon.forEach(icon => {
            icon.addEventListener("click", () => {
                this.currMonth = icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;

                if (this.currMonth < 0 || this.currMonth > 11) {
                    this.date = new Date(this.currYear, this.currMonth, new Date().getDate());
                    this.currYear = this.date.getFullYear();
                    this.currMonth = this.date.getMonth();
                } else {
                    this.date = new Date();
                };

                this.renderCalendar();
            });
        });
    };
};

document.addEventListener("DOMContentLoaded", () => new Calendar());