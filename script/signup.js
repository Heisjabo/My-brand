const REGISTER_URL = "https://mybrand-be-x023.onrender.com/api/v1/users"

const signUpForm = document.getElementById("signup-form");

const validateUserEmail = () => {
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

document.getElementById('fullname').addEventListener("input", () => {
    validateFullName();
});

document.getElementById('email').addEventListener("input", () => {
    validateUserEmail();
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

  const closePopupAndRedirect = () => {
    closePopup();
    window.location.href = "./signin.html"
  }

const validateSignUp = async () => {
    const isValidFullName = validateFullName();
    const isValidEmail = validateUserEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    if (isValidFullName && isValidEmail && isValidPassword && isValidConfirmPassword) {
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = {
            name: fullName,
            email: email,
            password: password,
        };

        const signUpBtn = document.getElementById("signup-btn");
        const originalButtonText = signUpBtn.textContent;

        try{
            signUpBtn.textContent = "Loading...";
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            },
            );
            signUpBtn.textContent = originalButtonText
            if (response.ok) {
                const data = await response.json();
                popupContent.style.color = "#40CF8E"
                openPopup("Your account was created successfully", true);
              } else {
                const errorData = await response.json();
                popupContent.style.color = "red"
                openPopup(`Error:  ${errorData.message}`, false);
              }
        } catch(err){
            signUpBtn.textContent = originalButtonText
            console.log(err)
            popupContent.style.color = "red"
            openPopup("An error occurred. Please try again later.", false); 
        }
    }
}
