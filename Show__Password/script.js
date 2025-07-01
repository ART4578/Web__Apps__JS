const eyeIcon = document.getElementById("eye-icon");
const passwordInput = document.getElementById("password");

eyeIcon.onclick = function() {
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
        eyeIcon.src = "img/eye-open.png";
    } else {
        passwordInput.type = "password";
        eyeIcon.src = "img/eye-close.png";
    };
};