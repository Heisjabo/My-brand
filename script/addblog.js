const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');


const addBlogForm = document.querySelector(".addBlogForm");

addBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateAndSubmit();
});

const token = sessionStorage.getItem("accessToken");
const addBtn = document.getElementById("add-button");

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
}

const validateAndSubmit = async () => {
  const title = document.getElementById('title').value.trim();
  const image = document.getElementById('image').files[0];
  const body = quill.getText().trim(); 

  if (title == "") {
      document.querySelector('.title-err').innerHTML = "Title is required";
  } else {
      document.querySelector('.title-err').innerHTML = "";
  }

  if (!image) {
      document.querySelector('.image-err').innerHTML = "Image is required";
  } else {
      document.querySelector('.image-err').innerHTML = "";
  }

  if (body == "") {
      document.querySelector('.body-err').innerHTML = "Body is required";
  } else {
      document.querySelector('.body-err').innerHTML = "";
  }

  if (title && image && body) {
      const formData = new FormData();
      formData.append("title", document.getElementById('title').value);
      formData.append("description", quill.root.innerHTML);
      formData.append("image", image)

      try{
        addBtn.textContent = "Loading..."
        const response = await fetch("https://mybrand-be-x023.onrender.com/api/v1/blogs", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData
        });
        addBtn.textContent = "Add Blog"
        const data = await response.json();
        console.log(data)
        openPopup("Blog created successfully!");
        addBlogForm.reset();
        quill.setText("")
      } catch(err){
        addBtn.textContent = "Add Blog"
        console.log(err)
      }
      };
}

