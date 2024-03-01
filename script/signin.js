const signMail = document.getElementById('signinMail');
const signPass = document.getElementById('signinPass');
const loginForm = document.querySelector('#loginForm');
let mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


signMail.addEventListener('input', () => {
    validateEmail();
});

signPass.addEventListener('input', () => {
    validatePassword();
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateSignIn();
});

const validateEmail = () => {
    const email = signMail.value.trim();

    if (email == "") {
        document.querySelector('.email-err').innerHTML = "Email is required";
        return false;
    } else if (!email.match(mailRegex)) {
        document.querySelector('.email-err').innerHTML = "Please enter a valid email";
        return false;
    } else {
        document.querySelector('.email-err').innerHTML = "";
        return true;
    }
}

const validatePassword = () => {
    const password = signPass.value.trim();

    if (password == "") {
        document.querySelector('.pass-err').innerHTML = "Password is required";
        return false;
    } else if (password.length < 6) {
        document.querySelector('.pass-err').innerHTML = "Password must be at least 6 characters long";
        return false;
    } else if (!/[A-Z]/.test(password)) {
        document.querySelector('.pass-err').innerHTML = "Password must include a capital letter";
        return false;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        document.querySelector('.pass-err').innerHTML = "Password must include a special character";
        return false;
    } else {
        document.querySelector('.pass-err').innerHTML = "";
        return true;
    }
}

const validateSignIn = () => {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();

    if (isValidEmail && isValidPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
  
        const email = signMail.value.trim();
        const password = signPass.value.trim();

        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            document.querySelector('.email-err').innerHTML = "Invalid email or password";
            return;
        }

        sessionStorage.setItem('user', JSON.stringify(user));

        if (user.role === 'user') {
            window.location.href = '/';
        } else if (user.role === 'admin') {
            window.location.href = '/admin_panel/admin.html';
        }
    }
}
