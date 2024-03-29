const signMail = document.getElementById('signinMail');
const signPass = document.getElementById('signinPass');
const loginForm = document.querySelector('#loginForm');
let mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LOGIN_URL = "https://mybrand-be-x023.onrender.com/api/v1/users/auth"


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

const popupContent = document.getElementById("popup-content");
const openPopup = (message, success) => {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
  
    popupMessage.innerHTML = message;
    popup.style.display = "block";

    const closeBtn  = document.getElementById("popup-ok-button");
    closeBtn.addEventListener("click", () => {
        if(success){
            closePopupAndRedirect()
        } else {
            closePopup()
        }
    })
  }
  
  const closePopup = () => {
      const popup = document.getElementById("popup");
      popup.style.display = "none";
    }

let userRole;

  const closePopupAndRedirect = () => {
    closePopup();
    if(userRole === "admin"){
        window.location.href = '../admin_panel/admin.html'
    } else{
        window.location.href = '/'
    }
  }

const signinBtn = document.getElementById("signin-btn");
const buttonText = signinBtn.textContent;

const validateSignIn = async () => {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();

    if (isValidEmail && isValidPassword) {
        const email = signMail.value;
        const password = signPass.value;

        try{
            signinBtn.textContent = "Loading..."
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            signinBtn.textContent = buttonText
            const data = await response.json()
            if(response.ok){
                popupContent.style.color = "#40CF8E"
                sessionStorage.setItem("accessToken", data.token);
                userRole = data.role;
                localStorage.setItem("userRole", userRole)
                openPopup(`Success: ${data.message}`, true)
            } else {
                popupContent.style.color = "red"
                openPopup(`Error: ${data.message}`, false)
            }
            console.log(data);
        } catch(err){
            signinBtn.textContent = buttonText
            console.log(err)
            popupContent.style.color = "red"
            openPopup(`Error: ${err.message}`, false)
        }
    }
}
