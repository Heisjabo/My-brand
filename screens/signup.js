const signUpForm = document.getElementById("signup-form");

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateSignUp();
})

let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateSignUp = () => {
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (fullName == "") {
        document.querySelector('.fullname-err').innerHTML = "Fullname is required";
    } else {
        document.querySelector('.fullname-err').innerHTML = "";
    }

    if (email == "") {
        document.querySelector('.email-err').innerHTML = "Email is required";
    } else if (!email.match(regex)) {
        document.querySelector('.email-err').innerHTML = "Please enter a valid email";
    } else {
        document.querySelector('.email-err').innerHTML = "";
    }

    if (password == "") {
        document.querySelector('.password-err').innerHTML = "Password is required";
    } else if (password.length < 6) {
        document.querySelector('.password-err').innerHTML = "Password must be at least 6 characters long";
    } else if (!/[A-Z]/.test(password)) {
        document.querySelector('.password-err').innerHTML = "Password must include a capital letter";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        document.querySelector('.password-err').innerHTML = "Password must include a special character";
    } else {
        document.querySelector('.password-err').innerHTML = "";
    }

    if (confirmPassword == "") {
        document.querySelector('.confirmPassword-err').innerHTML = "Confirm Password is required";
    } else if (confirmPassword !== password) {
        document.querySelector('.confirmPassword-err').innerHTML = "Passwords do not match";
    } else {
        document.querySelector('.confirmPassword-err').innerHTML = "";
    }
}
