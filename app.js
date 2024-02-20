let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.nav-list');


menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = function() {myFunction()};

let header = document.querySelector("nav");

window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 100);
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

// tracking the active tab

(function activeNav(){
	const nav = document.querySelector('nav').querySelectorAll('a');

nav.forEach(element => {
	element.addEventListener("click", function(){
		nav.forEach(a => a.classList.remove("active"));
		this.classList.add("active");
	})
});

})();



