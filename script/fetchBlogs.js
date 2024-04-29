const sideMenu = document.getElementById('side-bar');
let menuBtn = document.getElementById('menu');
const closeMenu = document.querySelector('.menu-close');
let profile = document.querySelector('.dashboard-profile');
let avatar = document.querySelector('.avatar');

menuBtn.onclick = () => {
	sideMenu.classList.toggle('side-open');
};

closeMenu.onclick = () => {
  sideMenu.classList.remove('side-open');
};

avatar.onclick = () => {
    profile.classList.toggle('profile-open');
}

const confirmationModal = document.getElementById('confirmationModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

const popupContent = document.getElementById("popup-content");
const openPopup = (messageText) => {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
  
    popupMessage.innerHTML = messageText;
    popup.style.display = "block";

    const closeBtn  = document.getElementById("popup-ok-button");
    closeBtn.addEventListener("click", () => {
        closePopup()
    })
  }
  
  const closePopup = () => {
      const popup = document.getElementById("popup");
      popup.style.display = "none";
      window.location.reload()
}

function openConfirmationModal(message, callback) {
  document.getElementById('confirmationMessage').textContent = message;
  confirmationModal.style.display = 'block';

  confirmDeleteBtn.onclick = function() {
    callback(true);
    confirmationModal.style.display = 'none';
  };

  cancelDeleteBtn.onclick = function() {
    callback(false);
    confirmationModal.style.display = 'none';
  };
}

function closeConfirmationModal() {
  confirmationModal.style.display = 'none';
}

let blogs;


const table = document.querySelector(".blogs-table");

const headerRow = document.createElement("tr");
headerRow.innerHTML = `
  <th>Title</th>
  <th>Content</th>
  <th>Date</th>
  <th>Actions</th>
`;



const fetchBlogs = async () => {
  // table.style.display = "none"
  const loader = document.getElementById("blogs-loader");
  try{
    loader.style.display = "flex"
    const response = await fetch("https://mybrand-be-x023.onrender.com/api/v1/blogs")
    loader.style.display = "none"
    // table.style.display = "block"
    const data = await response.json();
    blogs = await data.data
    console.log(blogs)
    table.appendChild(headerRow);
    
    blogs.forEach((blogPost) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${blogPost.title}</td>
        <td>${blogPost.description.slice(0, 30) + "..."}</td>
        <td>12/03/2024</td>
        <td class="actions">
          <i class="fa-regular fa-pen-to-square edit" data-id="${blogPost._id}"></i>
          <i class="fa-solid fa-trash delete" data-id="${blogPost._id}"></i>
        </td>
      `;
      
      table.appendChild(row);

      document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          openConfirmationModal("Are you sure you want to delete this blog post?", function(confirmed){
            if (confirmed) {
              deleteBlog(id);
            }
          });
        });
      });
    });

    let blogPost;

document.querySelectorAll(".edit").forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    modal.style.display = "block";
    blogPost = blogs.find(
      (blog) => blog._id === id
    );
    document.getElementById("title").value = blogPost.title;
    document.getElementById("image").files[0] = blogPost.image;
    quill.root.innerHTML = blogPost.description;

    document.querySelector(".edit-form").addEventListener("submit", (e) => {
      e.preventDefault();
      editBlog(id)
    });
  });
  
});
  } catch(err){
    loader.style.display = "none"
    console.log(err)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBlogs()
})

let authorization = sessionStorage.getItem("accessToken");

const deleteBlog = async (id) => {
  try{
    const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authorization}`
      }
    });
    window.location.reload()
  } catch(err){
    console.log(err)
  }
} 



const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("editModal");

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


const upButton = document.getElementById("update-button");
const originalButton = upButton.textContent;

const editBlog = async (id) => {
  const title = document.getElementById("title").value;
const image = document.getElementById("image").files[0];
const body = quill.root.innerHTML;

const formData = new FormData()

if (title){
  formData.append("title", title)
}
if(body){
  formData.append("description", body)
}
if(image){
  formData.append("image", image)
}

try{
  upButton.textContent = "Loading..."
  const response = await fetch(`https://mybrand-be-x023.onrender.com/api/v1/blogs/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${authorization}`
    },
    body: formData
  });
  upButton.textContent = originalButton
  const data = await response.json()
  console.log(data)
  openPopup(`${data.message}`)
} catch(err){
  upButton.textContent = originalButton
  console.log(err)
}
}




