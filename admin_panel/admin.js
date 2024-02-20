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


