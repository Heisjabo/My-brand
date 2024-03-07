const signUpForm = document.getElementById("signup-form");

document.getElementById('fullname').addEventListener("input", () => {
    validateFullName();
});

document.getElementById('email').addEventListener("input", () => {
    validateEmail();
});

document.getElementById('password').addEventListener("input", () => {
    validatePassword();
});

document.getElementById('confirmPassword').addEventListener("input", () => {
    validateConfirmPassword();
});

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateSignUp();
});

let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateFullName = () => {
    const fullName = document.getElementById('fullname').value.trim();

    if (fullName == "") {
        document.querySelector('.fullname-err').innerHTML = "Fullname is required";
        return false;
    } else {
        document.querySelector('.fullname-err').innerHTML = "";
        return true;
    }
}

const validateEmail = () => {
    const email = document.getElementById('email').value.trim();

    if (email == "") {
        document.querySelector('.email-err').innerHTML = "Email is required";
        return false;
    } else if (!email.match(regex)) {
        document.querySelector('.email-err').innerHTML = "Please enter a valid email";
        return false;
    } else {
        document.querySelector('.email-err').innerHTML = "";
        return true;
    }
}

const validatePassword = () => {
    const password = document.getElementById('password').value.trim();

    if (password == "") {
        document.querySelector('.password-err').innerHTML = "Password is required";
        return false;
    } else if (password.length < 6) {
        document.querySelector('.password-err').innerHTML = "Password must be at least 6 characters long";
        return false;
    } else if (!/[A-Z]/.test(password)) {
        document.querySelector('.password-err').innerHTML = "Password must include a capital letter";
        return false;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        document.querySelector('.password-err').innerHTML = "Password must include a special character";
        return false;
    } else {
        document.querySelector('.password-err').innerHTML = "";
        return true;
    }
}

const validateConfirmPassword = () => {
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const password = document.getElementById('password').value.trim();

    if (confirmPassword == "") {
        document.querySelector('.confirmPassword-err').innerHTML = "Confirm Password is required";
        return false;
    } else if (confirmPassword !== password) {
        document.querySelector('.confirmPassword-err').innerHTML = "Passwords do not match";
        return false;
    } else {
        document.querySelector('.confirmPassword-err').innerHTML = "";
        return true;
    }
}

const validateSignUp = () => {
    const isValidFullName = validateFullName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    if (isValidFullName && isValidEmail && isValidPassword && isValidConfirmPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        const fullName = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            document.querySelector('.email-err').innerHTML = "Email already exists";
            return;
        }

        const user = {
            fullName: fullName,
            email: email,
            password: password,
            role: 'user'
        };

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));

        alert('Account was created successfully.');

        document.getElementById('fullname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
    }
}
