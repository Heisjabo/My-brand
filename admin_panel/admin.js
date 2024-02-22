const sideBar = document.getElementById('side-bar');
const menu = document.getElementById('menu');
const menuClose = document.querySelector('.menu-close');
let profile = document.querySelector('.dashboard-profile');
let avatar = document.querySelector('.avatar');


menu.onclick = () => {
	sideBar.classList.toggle('side-open');
};

menuClose.onclick = () => {
    sideBar.classList.remove('side-open');
};

avatar.onclick = () => {
    profile.classList.toggle('profile-open');
}

var modal = document.getElementById("editModal");

var btn = document.getElementById("edit");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
  



