const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

const table = document.querySelector(".blogs-table");

const headerRow = document.createElement("tr");
headerRow.innerHTML = `
  <th>Title</th>
  <th>Content</th>
  <th>Date</th>
  <th>Actions</th>
`;
table.appendChild(headerRow);

blogPosts.forEach((blogPost) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${blogPost.title}</td>
    <td>${blogPost.body.slice(0, 10) + "..."}</td>
    <td>${blogPost.date}</td>
    <td class="actions">
      <i class="fa-regular fa-pen-to-square edit" data-id="${blogPost.id}"></i>
      <i class="fa-solid fa-trash delete" data-id="${blogPost.id}"></i>
    </td>
  `;

  table.appendChild(row);
});

document.querySelectorAll(".delete").forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    const confirmDelete = confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (confirmDelete) {
      const index = blogPosts.findIndex((blogPost) => blogPost.id === id);
      if (index !== -1) {
        blogPosts.splice(index, 1);
        localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
        window.location.reload();
        table.innerHTML = "";
        table.appendChild(headerRow);
        blogPosts.forEach((blogPost) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${blogPost.title}</td>
              <td>Jabo</td>
              <td>${blogPost.date}</td>
              <td class="actions">
                <i class="fa-regular fa-pen-to-square edit" data-id="${blogPost.id}"></i>
                <i class="fa-solid fa-trash delete" data-id="${blogPost.id}"></i>
              </td>
            `;
          table.appendChild(row);
        });
      }
    }
  });
});

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

let blogPost;

document.querySelectorAll(".edit").forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    modal.style.display = "block";
    blogPost = JSON.parse(localStorage.getItem("blogPosts")).find(
      (post) => post.id === id
    );
    document.getElementById("title").value = blogPost.title;
    document.getElementById("image").files[0] = blogPost.image;
    quill.setText(blogPost.body);
  });
});

let isChanged = false;
let newImage;

document.getElementById("title").addEventListener("input", function () {
  isChanged = true;
  updateButtonState();
});

document.getElementById("image").addEventListener("change", function (e) {
  isChanged = true;
  updateButtonState();
  newImage = e.target.files[0];
});

quill.on("text-change", function () {
  isChanged = true;
  updateButtonState();
});


document.querySelector(".edit-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const body = quill.getText().trim();

  if (title && body) {
    const update = {
      id: blogPost.id,
      title: document.getElementById("title").value,
      image: newImage ? await readFile(newImage) : blogPost.image,
      body: quill.getText(),
      date: new Date().toLocaleString(),
      likes: blogPost.likes,
      comments: blogPost.comments,
    };

    const index = blogPosts.findIndex((post) => post.id === blogPost.id);
    if (index !== -1) {
      blogPosts[index] = update;
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
      alert("blog was updated successfully!");
      modal.style.display = "none";
      window.location.href = `/screens/singleBlog.html?id=${blogPost.id}`

    }
  }
});

async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


function updateButtonState() {
  const updateButton = document.querySelector(".edit-form button[type='submit']");
  if (isChanged) {
    updateButton.removeAttribute("disabled");
  } else {
    updateButton.setAttribute("disabled", "disabled");
  }
}



