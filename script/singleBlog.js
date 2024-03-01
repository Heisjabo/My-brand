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

// logged user tracking

const user = JSON.parse(sessionStorage.getItem('user'));


const navList = document.querySelector('.nav-list');
const signInLink = document.querySelector('.signin');
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


const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');


const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
const blogPost = blogPosts.find(post => post.id === blogId);


const blogImage = document.querySelector('.single-blog-container img');
const blogTitle = document.querySelector('.blog-title');
const blogStats = document.querySelector('.single-blog-container .blog-headers .blog-stats');
const blogContent = document.querySelector('.single-blog-container .blog-content');
const commentsContainer = document.querySelector('.single-blog-container .comment-section .comments-container');

blogImage.src = blogPost.image;
blogImage.alt = blogPost.title;
blogTitle.textContent = blogPost.title;



blogStats.innerHTML = `
  <button class="like">${blogPost.likes} <i class="fa-regular fa-heart"></i></button>
  <button class="like">${blogPost.comments.length} <i class="fa-regular fa-comment"></i></button>
`;

blogContent.innerHTML = `
  <p>${blogPost.body}</p>
`;

commentsContainer.innerHTML = '';
blogPost.comments.forEach(comment => {
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


const likeButton = document.querySelector('.single-blog-container .blog-headers .blog-stats .like');
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

// ==== comment form ========
function generateAvatar(name) {
  return name.split(' ').map(name => name[0]).join('').toUpperCase();
}



const commentForm = document.querySelector('.single-blog-container .add-comment form');
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentTextarea = commentForm.querySelector('textarea');
  const commentText = commentTextarea.value.trim();
  if (commentText) {
    const loggedUser = JSON.parse(sessionStorage.getItem('user'));
    const avatarContent = generateAvatar(loggedUser.fullName);
    if (loggedUser) {
      const username = loggedUser.fullName;
      blogPost.comments.push({ name: username, commentText, date: new Date().toLocaleString() });

      localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

      commentTextarea.value = '';

      const commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');
      commentItem.innerHTML = `
      <div class="avatar">${avatarContent}</div>
        <div class="comment-text">
          <h4>${username}</h4>
          <p>${commentText}</p>
          <span class="time">${new Date().toLocaleString()}</span>
        </div>
      `;
      commentsContainer.prepend(commentItem);
    } else {
      alert('Please log in to leave a comment.');
    }
  }
});





