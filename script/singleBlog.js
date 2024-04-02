document.addEventListener("DOMContentLoaded", () => {
  fetchBlog()
  fetchComments()
  displayComments()
  fetchUser()
  
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

const isLiked = await checkUserLikedBlog()
console.log(isLiked)

blogStats.innerHTML = `
  <button class="like">${ await getLikes()} <i class="fa-regular fa-heart like-icon ${isLiked ? ' liked' : ''}" onClick="likeBlog()"></i></button>
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
      window.location.href = "./signin.html"
}


const likeBlog = async () => {
  const authorization = sessionStorage.getItem("accessToken");
  if(!authorization){
    openPopup("please login first, to like this blog");
    return
  }
  try{
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/likes`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authorization}`
      }
    });
    const data = await response.json();
    console.log(data)
    window.location.reload()
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
  if(comments.length === 0){
    commentsContainer.innerHTML = `
    <p>No comments added</p>
    `
  }
  comments.forEach(comment => {
  const commentItem = document.createElement('div');
  commentItem.classList.add('comment-item');
  commentItem.innerHTML = `
    <div class="avatar">${generateAvatar(comment.name)}</div>
    <div class="comment-text">
      <h4>${comment.name}</h4>
      <p>${comment.content}</p>
      <span class="time">${comment.createdAt.slice(0,10)}</span>
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
          body: JSON.stringify({ content: commentTextarea.value })
        });
        submitBtn.textContent = "Submit"
        const data = await response.json();
        console.log(data)
        // openPopup("your comment was added!");
        window.location.reload()
      } catch(err){
        submitBtn.textContent = "Submit"
        console.log(err)
      }
    } else {
      window.location.href = "./signin.html"
    }
  }
});

const accesssToken = sessionStorage.getItem("accessToken");

function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const decoded = decodeJwt(accesssToken);
const userId = decoded.userId;
console.log(userId)


const checkUserLikedBlog = async () => {
  try {
    if (!accesssToken) {
      return false;
    }
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${blogId}/likes`, {
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
      window.location.href = "./screens/signin.html";
    });
    
    avatarContainer.appendChild(avatar);
    avatarContainer.appendChild(signOutLink);

    signInLink.remove();
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




