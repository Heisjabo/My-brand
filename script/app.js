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

const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

const blogsContainer = document.querySelector('.blogs-container');

blogsContainer.innerHTML = '';

blogPosts.forEach(blogPost => {
  const blogCardDiv = document.createElement('div');
  blogCardDiv.classList.add('blog-card');

  const blogLink = document.createElement('a');
  blogLink.href = `./screens/singleBlog.html?id=${blogPost.id}`;

  const blogImage = document.createElement('img');
  blogImage.src = blogPost.image;
  blogImage.alt = blogPost.title;

  const blogTextDiv = document.createElement('div');
  blogTextDiv.classList.add('blog-text');

  const blogTitleHeading = document.createElement('h3');
  blogTitleHeading.textContent = blogPost.title;

  const dateStatsDiv = document.createElement('div');
  dateStatsDiv.classList.add('date-stats');

  const dateParagraph = document.createElement('p');
  dateParagraph.textContent = blogPost.date;

  const likeButton = document.createElement('button');
  likeButton.classList.add('like');
  const likeIcon = `<i class="fa-regular fa-heart"></i>`
  likeButton.innerHTML = `${blogPost.likes} ${likeIcon}`;
  if(blogPost.liked){
    likeButton.classList.add("blog-liked")
  }
  likeButton.addEventListener('click', () => {
    if (!blogPost.liked) {
      blogPost.likes++;
      blogPost.liked = true;
      localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
      likeButton.innerHTML = `${blogPost.likes} <i class="fa-regular fa-heart"></i>`;
    }
  });

  const commentButton = document.createElement('button');
  commentButton.classList.add('like');
  commentButton.innerHTML = `${blogPost.comments.length} <i class="fa-regular fa-comment"></i>`;

  const blogBodyParagraph = document.createElement('p');
  blogBodyParagraph.textContent = blogPost.body.slice(0, 50) + "...";

  dateStatsDiv.appendChild(dateParagraph);
  dateStatsDiv.appendChild(likeButton);
  dateStatsDiv.appendChild(commentButton);

  blogTextDiv.appendChild(blogTitleHeading);
  blogTextDiv.appendChild(dateStatsDiv);
  blogTextDiv.appendChild(blogBodyParagraph);

  blogLink.appendChild(blogImage);

  blogCardDiv.appendChild(blogLink);
  blogCardDiv.appendChild(blogTextDiv);

  blogsContainer.appendChild(blogCardDiv);
});

// logged user tracking

const user = JSON.parse(sessionStorage.getItem('user'));


const navList = document.querySelector('.nav-list');
const signInLink = document.querySelector('.nav-list a[href="./screens/signin.html"]');
const contactBtn = document.querySelector('.contact-btn');
const navbar = document.querySelector('nav')

if (user) {
  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.textContent = user.fullName.split(' ').map(name => name[0]).join('').toUpperCase();

  signInLink.remove();

  navbar.appendChild(avatar);
  navList.innerHTML += '<li><a href="#" id="signOut">SignOut</a></li>';
  contactBtn.remove()

  const signOutLink = document.getElementById('signOut');
  signOutLink.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    location.reload();
  });
} else {
  document.querySelector('.avatar').remove();
  document.getElementById('signOut').remove();
  navList.innerHTML += '<li><a href="./screens/signin.html">SignIn</a></li>';
}

if (user) {
  contactBtn.innerHTML = '<a href="#contact"><i class="fa-regular fa-envelope"></i> Contact me</a>';
} else {
  contactBtn.innerHTML = '<a href="./screens/signin.html"><i class="fa-regular fa-envelope"></i> Contact me</a>';
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


function slider() {
  const container = document.querySelector(".projects-container");
  const cards = document.querySelectorAll(".project-card");
  const firstCard = cards[0];
  const cardWidth =
    firstCard.offsetWidth +
    parseInt(window.getComputedStyle(firstCard).marginRight);

  container.appendChild(firstCard.cloneNode(true));

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

  cards.forEach((card, index) => {
    const paginationDot = document.createElement("span");
    paginationDot.classList.add("pagination-dot");
    paginationDot.addEventListener("click", () => {
      position = -index * cardWidth;
      container.style.transform = `translateX(${position}px)`;
      container.style.transition = "transform 1s ease-in-out";
    });
    paginationContainer.appendChild(paginationDot);
  });

  function highlightPaginationDot() {
    const activeIndex = Math.abs(position / cardWidth);
    const paginationDots =
      paginationContainer.querySelectorAll(".pagination-dot");
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

window.addEventListener("load", slider);

function slideBlogs() {
  const container = document.querySelector(".blogs-container");
  const cards = document.querySelectorAll(".blog-card");
  const firstCard = cards[0];
  const cardWidth =
    firstCard.offsetWidth +
    parseInt(window.getComputedStyle(firstCard).marginRight);

  // container.appendChild(firstCard.cloneNode(true));

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

  cards.forEach((card, index) => {
    const paginationDot = document.createElement("span");
    paginationDot.classList.add("pagination-dot");
    paginationDot.addEventListener("click", () => {
      position = -index * cardWidth;
      container.style.transform = `translateX(${position}px)`;
      container.style.transition = "transform 1s ease-in-out";
    });
    paginationContainer.appendChild(paginationDot);
  });

  function highlightPaginationDot() {
    const activeIndex = Math.abs(position / cardWidth);
    const paginationDots =
      paginationContainer.querySelectorAll(".pagination-dot");
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
window.addEventListener("load", slideBlogs);
