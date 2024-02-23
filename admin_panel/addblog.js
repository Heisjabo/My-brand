const addBlogForm = document.querySelector(".addBlogForm")
console.log(addBlogForm)

addBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateAndSubmit();
});


const validateAndSubmit = () => {
  const title = document.getElementById('title').value.trim();
  const image = document.getElementById('image').value.trim();
  const body = quill.getText().trim(); 

  if (title == "") {
      document.querySelector('.title-err').innerHTML = "Title is required";
  } else {
      document.querySelector('.title-err').innerHTML = "";
  }

  if (image == "") {
      document.querySelector('.image-err').innerHTML = "Image is required";
  } else {
      document.querySelector('.image-err').innerHTML = "";
  }

  if (body == "") {
      document.querySelector('.body-err').innerHTML = "Body is required";
  } else {
      document.querySelector('.body-err').innerHTML = "";
  }

  // Accessing the rich text editor value

  // If all fields are valid, submit the form
  if (title && image && body) {
      console.log("title:", title)
      console.log("image:", image)
      console.log("body:", body)
  }
}