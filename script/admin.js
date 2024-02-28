const sideBar = document.getElementById('side-bar');
const menu = document.getElementById('menu');
const menuClose = document.querySelector('.menu-close');
let profile = document.querySelector('.dashboard-profile');
let avatar = document.querySelector('.avatar');

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

// messagesContainer.innerHTML = '';

console.log(messages)

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

  // Attach an event listener to the delete icon
  deleteIcon.addEventListener('click', () => {
    // Show a confirmation box
    const confirmDelete = confirm('Are you sure you want to delete this message?');
    if (confirmDelete) {
      // Remove the message from local storage
      messages.splice(index, 1);
      localStorage.setItem('messages', JSON.stringify(messages));

      // Remove the message from the DOM
      messagesContainer.removeChild(messageDiv);
    }
  });

  messageDiv.appendChild(detailsDiv);
  messageDiv.appendChild(deleteIcon);

  messagesContainer.appendChild(messageDiv);
}





  



