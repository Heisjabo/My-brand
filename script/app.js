document.addEventListener("DOMContentLoaded", () => {
  fetchBlogs();
})

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




// ====== displaying the blogs ========

let blogPosts;

const loader = document.getElementById("loader-element");

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
    const blogIdOne = blogPosts[0]._id;
    const likes = await getLikes(blogIdOne)
    blogPosts.forEach(item => {
      const blogsContainer = document.querySelector('.blogs-container');
      // blogsContainer.innerHTML = '';
      const blogHTML = `
      <div class="blog-card">
                <a href="./screens/singleBlog.html?id=${item._id}"><img alt="" src=${item.image} /></a>
                <div class="blog-text">
                    <h3>${item.title}</h3>
                    <div class="date-stats">
                        <p>Oct 9, 2023</p>
                        <button class="like">12 <i class="fa-regular fa-heart"></i></button>
                        <button class="like">10 <i class="fa-regular fa-comment"></i></button>
                    </div>
                    <p>
                    <div>${item.description.slice(0, 20) + "..."}</div>
                </div>
            </div>
      `;
      blogsContainer.innerHTML += blogHTML;
    });
    slideBlogs();
  } catch(err){
    loader.style.display = "none";
    console.log(err)
  }
};

fetch("https://mybrand-be-x023.onrender.com/api/v1/blogs/65f9aa6d3c4fd09e2022a223")
.then(response => response.json())
.then(data => console.log(data))
.catch(err => console.log(err));


const getLikes = async (blogId) => {
  try{
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/likes`);
    const data = await response.json();
    const likes = await data.likes
    console.log(likes)
    return likes
  } catch(err){
    console.log("Error" + err)
  }
}

// logged user tracking

// const user = JSON.parse(sessionStorage.getItem('accessToken'));


// const navList = document.querySelector('.nav-list');
// const signInLink = document.querySelector('.nav-list a[href="./screens/signin.html"]');
// const contactBtn = document.querySelector('.contact-btn');
// const navbar = document.querySelector('nav')

// if (user) {
//   const avatar = document.createElement('div');
//   avatar.classList.add('avatar');
//   // avatar.textContent = user.fullName.split(' ').map(name => name[0]).join('').toUpperCase();

//   signInLink.remove();

//   navbar.appendChild(avatar);
//   navList.innerHTML += '<li><a href="#" id="signOut">SignOut</a></li>';
//   contactBtn.remove()

//   const signOutLink = document.getElementById('signOut');
//   signOutLink.addEventListener('click', () => {
//     sessionStorage.removeItem('user');
//     location.reload();
//   });
// } else {
//   document.querySelector('.avatar').remove();
//   document.getElementById('signOut').remove();
//   navList.innerHTML += '<li><a href="./screens/signin.html">SignIn</a></li>';
// }

// if (user) {
//   contactBtn.innerHTML = '<a href="#contact"><i class="fa-regular fa-envelope"></i> Contact me</a>';
// } else {
//   contactBtn.innerHTML = '<a href="./screens/signin.html"><i class="fa-regular fa-envelope"></i> Contact me</a>';
// }

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

function validateForm() {
  const isValidName = validateName();
  const isValidEmail = validateEmail();
  const isValidMessage = validateMessage();

  if (isValidName && isValidEmail && isValidMessage) {
    const formData = JSON.parse(localStorage.getItem("messages")) || [];
    formData.push({
      name: name.value,
      email: email.value,
      message: message.value,
    });
    localStorage.setItem("messages", JSON.stringify(formData));
    alert("your message was sent successfully!");
    form.reset();
  }
}


function slideBlogs() {
  const container = document.querySelector(".blogs-container");
  const cards = document.querySelectorAll(".blog-card");
  if (cards.length <= 3) {
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

// window.addEventListener("load", slideBlogs);
