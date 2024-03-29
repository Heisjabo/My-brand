document.addEventListener("DOMContentLoaded", () => {
  fetchBlog()
  fetchComments()
  displayComments()
  
})

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



// logged user tracking end


const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

let blogPost;
const loader = document.getElementById("loader-element");

const fetchBlog = async () => {
  try{
    loader.style.display = "flex"
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}`, {
      method: "GET"
    });
    loader.style.display = "none"
    const data = await response.json();
    blogPost = data.data;
    console.log(blogPost)
    const blogImage = document.querySelector('.single-blog-container img');
const blogTitle = document.querySelector('.blog-title');
const blogStats = document.querySelector('.single-blog-container .blog-headers .blog-stats');
const blogContent = document.querySelector('.single-blog-container .blog-content');


blogImage.src = blogPost.image;
blogImage.alt = blogPost.title;
blogTitle.textContent = blogPost.title;

blogStats.innerHTML = `
  <button class="like">${ await getLikes()} <i class="fa-regular fa-heart"></i></button>
  <button class="comment">${ await fetchComments()} <i class="fa-regular fa-comment"></i></button>
`;

blogContent.innerHTML = `
  <p>${blogPost.description}</p>
`;
  } catch(err){
    loader.style.display = "none"
    console.log(err)
  }
}

const getLikes = async () => {
  try{
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/likes`);
    const data = await response.json();
    console.log(data.likes)
    return data.likes
  } catch(err){
    console.log(err)
  }
}

const fetchComments = async () => {
  try{
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/comments`);
    const data = await response.json();
    return data.comments
  } catch(err){
    console.log(err)
  }
}

const commentsContainer = document.querySelector('.single-blog-container .comment-section .comments-container');

const displayComments = async () => {
  const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/comments`)
  const data = await response.json();
  const comments = data.data
  console.log(comments)

  commentsContainer.innerHTML = '';

  comments.forEach(comment => {
  const commentItem = document.createElement('div');
  commentItem.classList.add('comment-item');
  commentItem.innerHTML = `
    <div class="avatar">${generateAvatar(comment.name)}</div>
    <div class="comment-text">
      <h4>${comment.name}</h4>
      <p>${comment.commentText}</p>
      <span class="time">${comment.date}</span>
    </div>
  `;
  commentsContainer.appendChild(commentItem);
});
}

// ==== comment form ========
function generateAvatar(name) {
  return name.split(' ').map(name => name[0]).join('').toUpperCase();
}

const commentForm = document.querySelector('.single-blog-container .add-comment form');
const submitBtn = document.getElementById("submit-comment")

commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const commentTextarea = commentForm.querySelector('textarea');
  const commentText = commentTextarea.value.trim();
  if (commentText){
    const authorization = sessionStorage.getItem('accessToken');
    if (authorization) {
      try{
        submitBtn.textContent = "Submitting..."
        const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/comments`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authorization}`
          },
          body: { content: commentTextarea.value }
        });
        submitBtn.textContent = "Submit"
        console.log(response)
        // window.location.reload()
      } catch(err){
        submitBtn.textContent = "Submit"
        console.log(err)
      }
    } else {
      window.location.href = "./signin.html"
    }
  }
});


// logged user tracking

// const user = JSON.parse(sessionStorage.getItem('accessToken'));


// const navList = document.querySelector('.nav-list');
// const signInLink = document.querySelector('.signin');
// const contactBtn = document.querySelector('.contact-btn');
// const navbar = document.querySelector('nav')

// if (user) {
//   const avatar = document.createElement('div');
//   avatar.classList.add('avatar');
//   avatar.textContent = user.fullName.split(' ').map(name => name[0]).join('').toUpperCase();

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





