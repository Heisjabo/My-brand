const signMail = document.getElementById('signinMail');
const signPass = document.getElementById('signinPass');
const loginForm = document.querySelector('#loginForm');
let mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateSignIn();
});

const validateSignIn = () => {
    const email = signMail.value.trim();
    const password = signPass.value.trim();

    if (email == "") {
        document.querySelector('.email-err').innerHTML = "Email is required"
    } else if (email.match(mailRegex)) {
        document.querySelector('.email-err').innerHTML = "";
    } else {
        document.querySelector('.email-err').innerHTML = "Please enter a valid email";
    }

    if (password == "") {
        document.querySelector('.pass-err').innerHTML = "Password is required"
    } else if (password.length < 6) {
        document.querySelector('.pass-err').innerHTML = "Password must be at least 6 characters long";
    } else if (!/[A-Z]/.test(password)) {
        document.querySelector('.pass-err').innerHTML = "Password must include a capital letter";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        document.querySelector('.pass-err').innerHTML = "Password must include a special character";
    } else {
        document.querySelector('.pass-err').innerHTML = "";
    }
}
