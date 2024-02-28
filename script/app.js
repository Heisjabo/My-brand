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




// =======  contact me validation =======

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function validateForm() {
  const nameEl = name.value.trim();
  const emailEl = email.value.trim();
  const messageEl = message.value.trim();

  if (nameEl == "") {
    document.getElementById("name-err").innerHTML = "please enter your name";
  } else if (nameEl !== "") {
    document.getElementById("name-err").innerHTML = "";
  }
  if (emailEl == "") {
    document.getElementById("email-err").innerHTML = "please enter your email";
  } else if (emailEl.match(emailRegex)) {
    document.getElementById("email-err").innerHTML = "";
  } else {
    document.getElementById("email-err").innerHTML =
      "please enter a valid email";
  }

  if (messageEl == "") {
    document.getElementById("msg-err").innerHTML = "please type a message";
  } else if (messageEl !== "" && nameEl !== "" && emailEl.match(emailRegex)) {
    document.getElementById("msg-err").innerHTML = "";
    const formData = JSON.parse(localStorage.getItem("messages")) || [];
    formData.push({
      name: name.value,
      email: email.value,
      message: message.value,
    });
    localStorage.setItem("messages", JSON.stringify(formData));
    alert("your message was sent successfully!");
    form.reset();
  } else {
    return false;
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
