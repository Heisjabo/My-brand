
let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".nav-list");

const BLOGS_URL = "https://mybrand-be-x023.onrender.com/api/v1/blogs"

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

// ====== tracking the active tab =========

(function activeNav() {
  const nav = document.querySelector("nav").querySelectorAll("a");

  nav.forEach((element) => {
    element.addEventListener("click", function () {
      nav.forEach((a) => a.classList.remove("active"));
      this.classList.add("active");
    });
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  fetchBlogs();
  fetchUser()
})

// ====== displaying the blogs ========

let blogPosts;

const loader = document.getElementById("loader-element");

const checkUserLiked = async (id) => {
  let authorization = sessionStorage.getItem("accessToken")
  try {
    if (!authorization) {
      return false;
    }
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${id}/likes`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    for (const like of data.data) {
      if (like.user === userId) {
        return true;
      }
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const fetchBlogs = async () => {
  try{
    loader.style.display = "flex";
    const response = await fetch(BLOGS_URL, {
      method: "GET",
    });
    loader.style.display = "none"
    const data = await response.json();
    blogPosts = data.data;
    console.log(blogPosts);
    blogPosts.forEach( async (item) => {
      const blogsContainer = document.querySelector('.blogs-container');
      const likes = await getLikes(item._id);
      const comments = await getComments(item._id);
      let isLiked = await checkUserLiked(item._id);
      const blogHTML = `
      <div class="blog-card">
                <a href="./screens/singleBlog.html?id=${item._id}"><img alt="" src=${item.image} /></a>
                <div class="blog-text">
                    <h3>${item.title}</h3>
                    <div class="date-stats">
                        <p>Oct 9, 2023</p>
                        <button class="like">${likes} <i class="fa-regular fa-heart ${isLiked ? "liked" : ""}"></i></button>
                        <button class="like">${comments} <i class="fa-regular fa-comment"></i></button>
                    </div>
                    <p>
                    <div>${item.description.slice(0, 50) + "..."}</div>
                </div>
            </div>
      `;
      blogsContainer.innerHTML += blogHTML;
    });
    // slideBlogs();
  } catch(err){
    loader.style.display = "none";
    console.log(err)
  }
};

const getLikes = async (blogId) => {
  try{
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/likes`);
    const data = await response.json();
    const likes = await data.likes
    return likes
  } catch(err){
    console.log("Error" + err)
  }
}

const getComments = async (blogId) => {
  try{
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/comments`);
    const data = await response.json();
    return data.comments
  } catch(err){
    console.log(err)
  }
}

const accesssToken = sessionStorage.getItem("accessToken");

function decodeJwt(token) {
  if(token){
    const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
  } 
}
const decoded = decodeJwt(accesssToken);
const userId = decoded.userId;

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



// logged user tracking


const navList = document.querySelector('.nav-list');
const signInLink = document.querySelector('.nav-list a[href="./screens/signin.html"]');
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
      window.location.href = "./screens/signin.html";
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

// logged user tracking end

//  contact me form

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");
const error = document.getElementById("error");

name.addEventListener("input", () => {
  validateName();
});

email.addEventListener("input", () => {
  validateEmail();
});

message.addEventListener("input", () => {
  validateMessage();
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function validateName() {
  const nameEl = name.value.trim();

  if (nameEl == "") {
    document.getElementById("name-err").innerHTML = "please enter your name";
    return false;
  } else {
    document.getElementById("name-err").innerHTML = "";
    return true;
  }
}

function validateEmail() {
  const emailEl = email.value.trim();

  if (emailEl == "") {
    document.getElementById("email-err").innerHTML = "please enter your email";
    return false;
  } else if (!emailEl.match(emailRegex)) {
    document.getElementById("email-err").innerHTML =
      "please enter a valid email";
    return false;
  } else {
    document.getElementById("email-err").innerHTML = "";
    return true;
  }
}

function validateMessage() {
  const messageEl = message.value.trim();

  if (messageEl == "") {
    document.getElementById("msg-err").innerHTML = "please type a message";
    return false;
  } else {
    document.getElementById("msg-err").innerHTML = "";
    return true;
  }
}

const popupContent = document.getElementById("popup-content");
const openPopup = (message) => {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
  
    popupMessage.innerHTML = message;
    popup.style.display = "block";

    const closeBtn  = document.getElementById("popup-ok-button");
    closeBtn.addEventListener("click", () => {
            closePopup()
    })
  }
  
  const closePopup = () => {
      const popup = document.getElementById("popup");
      popup.style.display = "none";
}

const sendBtn = document.getElementById("sent-message")

async function validateForm() {
  const isValidName = validateName();
  const isValidEmail = validateEmail();
  const isValidMessage = validateMessage();

  if (isValidName && isValidEmail && isValidMessage) {
    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    try{
      sendBtn.textContent = "Loading..."
      const response = await fetch("https://mybrand-be-x023.onrender.com/api/v1/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json()
      console.log(data)
      sendBtn.textContent = "Send Message"
      openPopup(`${data.message}`)
      // alert("your message was sent successfully!")
      form.reset()
    } catch(err){
      sendBtn.textContent = "Send Message"
      console.log(err)
    }
  }
}


function slideBlogs() {
  const container = document.querySelector(".blogs-container");
  const cards = document.querySelectorAll(".blog-card");
  if (cards <= 1 || (window.innerWidth > 768 && cards <= 3)) {
    return;
  }
  const firstCard = cards[0];
  const cardWidth =
    firstCard.offsetWidth +
    parseInt(window.getComputedStyle(firstCard).marginRight);

  let position = 0;

  function slideLeft() {
    position -= cardWidth;
    container.style.transform = `translateX(${position}px)`;
    container.style.transition = "transform 1s ease-in-out";

    if (position <= -container.scrollWidth + cardWidth) {
      setTimeout(() => {
        position = 0;
        container.style.transform = `translateX(${position}px)`;
        container.style.transition = "none";
      }, 1000);
    }
  }

  setInterval(slideLeft, 5000);

  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");
  container.parentNode.insertBefore(paginationContainer, container.nextSibling);

  // Calculate the number of pagination dots needed
  const numPaginationDots = cards.length;

  for (let i = 0; i < numPaginationDots; i++) {
    const paginationDot = document.createElement("span");
    paginationDot.classList.add("pagination-dot");

    // Add click event listener to each pagination dot
    paginationDot.addEventListener("click", () => {
      position = -i * cardWidth;
      container.style.transform = `translateX(${position}px)`;
      container.style.transition = "transform 1s ease-in-out";
    });

    paginationContainer.appendChild(paginationDot);
  }

  function highlightPaginationDot() {
    const activeIndex = Math.abs(position / cardWidth);
    const paginationDots = paginationContainer.querySelectorAll(".pagination-dot");
    paginationDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", highlightPaginationDot);
  container.addEventListener("transitionend", highlightPaginationDot);
}

