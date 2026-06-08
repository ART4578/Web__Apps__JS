class MouseTracker {
    constructor() {
        this.container = document.querySelector(".container");

        window.addEventListener("mousemove", (event) => {
            this.updatePosition(event);
        });
    };

    updatePosition(event) {
        this.container.innerHTML = `
            <div class="mouse__event">
                ${event.clientX}
                <h4>Mouse X Position (px)</h4>
            </div>

            <div class="mouse__event">
                ${event.clientY}
                <h4>Mouse Y Position (px)</h4>
            </div>
        `;
    };
};

document.addEventListener("DOMContentLoaded", () => new MouseTracker());