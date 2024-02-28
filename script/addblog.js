const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');


const addBlogForm = document.querySelector(".addBlogForm");

addBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateAndSubmit();
});

const validateAndSubmit = () => {
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
      formData.append('title', title);
      formData.append('image', image);
      formData.append('body', body);

      const reader = new FileReader();
      reader.onload = function(e) {
        const blogPost = {
          id: generateUniqueId(),
          title: document.getElementById('title').value,
          image: e.target.result,
          body: quill.getText(),
          date: new Date().toLocaleString(),
          likes: 0,
          comments: []
        };

        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts.push(blogPost);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

        const img = document.createElement('img');
        img.src = e.target.result;

        alert("Blog created successfully!");
        addBlogForm.reset();
        quill.setText("")

      };
      reader.readAsDataURL(image);
  }
}

function generateUniqueId() {
    return '' + Math.random().toString(36).substr(2, 9);
}

function likeBlogPost(blogId) {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  const blogPost = blogPosts.find(post => post.id === blogId);
  if (blogPost) {
    blogPost.likes++;
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }
}

function addCommentToBlogPost(blogId, comment) {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  const blogPost = blogPosts.find(post => post.id === blogId);
  if (blogPost) {
    blogPost.comments.push(comment);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }
}
