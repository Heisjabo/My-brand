let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".nav-list");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

window.onscroll = function () {
  myFunction();
};

let header = document.querySelector("nav");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 100);
});

let sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    navlist.classList.remove("open");
    menu.classList.remove("bx-x");
  } else {
    header.classList.remove("sticky");
  }
}

const accesssToken = sessionStorage.getItem("accessToken");

function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
let decoded;
if(accesssToken){
  decoded = decodeJwt(accesssToken);
}

const userId = decoded?.userId;

// logged user tracking

const navList = document.querySelector('.nav-list');
const signInLink = document.querySelector('.nav-list a[href="./signin.html"]');
const contactBtn = document.querySelector('.contact-btn');
const navbar = document.querySelector('nav')

const trackLoggedUser = async (user) => {
  if (user) {
    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('avatar-container');

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.textContent = user.name.split(' ').map(name => name[0]).join('').toUpperCase();
  
    const signOutLink = document.createElement('a');
    signOutLink.setAttribute('href', '#');
    signOutLink.textContent = 'Logout';
    signOutLink.id = 'signOut';
    signOutLink.addEventListener('click', () => {
      sessionStorage.removeItem('accessToken');
      window.location.href = "./signin.html";
    });
    
    avatarContainer.appendChild(avatar);
    avatarContainer.appendChild(signOutLink);

    signInLink?.remove();
    navbar.appendChild(avatarContainer);
    contactBtn.remove();
  } else {
    document.querySelector('.avatar-container').remove();
    navList.innerHTML += '<li><a href="./screens/signin.html">SignIn</a></li>';
  }
  
  if (user) {
    contactBtn.innerHTML = '<a href="#contact"><i class="fa-regular fa-envelope"></i> Contact me</a>';
  } else {
    contactBtn.innerHTML = '<a href="./screens/signin.html"><i class="fa-regular fa-envelope"></i> Contact me</a>';
  }
}


const fetchUser = async () => {
  try{
    const res = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/users/${userId}`);
    const data = await res.json();
    const loggedUser = data.data;
    trackLoggedUser(loggedUser)
  } catch(err){
    console.log(err)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUser()
})


