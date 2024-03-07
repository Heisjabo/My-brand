const sideBar = document.getElementById('side-bar');
const menu = document.getElementById('menu');
const menuClose = document.querySelector('.menu-close');
let profile = document.querySelector('.dashboard-profile');
let avatar = document.querySelector('.avatar');
const users = JSON.parse(localStorage.getItem("users"));
const blogPosts = JSON.parse(localStorage.getItem("blogPosts"));
let blogsCount = document.getElementById("blogs-count");
let usersCount = document.getElementById("users-count");
let likesCount = document.getElementById("likes-count");
let commentsCount = document.getElementById("comments-count");
usersCount.textContent = users.length;
blogsCount.textContent = blogPosts.length;

if(users.length < 10){
  usersCount.textContent = "0" + users.length;
}
if(blogPosts.length < 10){
  blogsCount.textContent = "0" + blogPosts.length;
}

const totalLikes = blogPosts.reduce((total, blog) => total + blog.likes, 0);
const totalComments = blogPosts.reduce((total, blog) => total + blog.comments.length, 0);
commentsCount.textContent = totalComments;
likesCount.textContent = totalLikes;

if(totalLikes < 10){
  likesCount.textContent = "0" + totalLikes;
}
if(totalComments < 10){
  commentsCount.textContent = "0" + totalComments;
}

const messages = JSON.parse(localStorage.getItem('messages')) || [];
const messagesContainer = document.querySelector('.messages-container');

menu.onclick = () => {
	sideBar.classList.toggle('side-open');
};

menuClose.onclick = () => {
    sideBar.classList.remove('side-open');
};

avatar.onclick = () => {
    profile.classList.toggle('profile-open');
}


for (let index = 0; index < messages.length; index++) {
  const message = messages[index];

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('details');

  const nameHeading = document.createElement('h3');
  nameHeading.textContent = message.name;

  const messageParagraph = document.createElement('p');
  messageParagraph.textContent = message.message;

  detailsDiv.appendChild(nameHeading);
  detailsDiv.appendChild(messageParagraph);

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid', 'fa-trash');

  deleteIcon.addEventListener('click', () => {
    const confirmDelete = confirm('Are you sure you want to delete this message?');
    if (confirmDelete) {
      messages.splice(index, 1);
      localStorage.setItem('messages', JSON.stringify(messages));

      messagesContainer.removeChild(messageDiv);
    }
  });

  messageDiv.appendChild(detailsDiv);
  messageDiv.appendChild(deleteIcon);

  messagesContainer.appendChild(messageDiv);
}

const logout = () => {
  sessionStorage.removeItem("user");
  window.location.href = "/";
}







  



