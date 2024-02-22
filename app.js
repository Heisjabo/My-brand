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

//  contact me validation

const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const form = document.getElementById('form');
const error = document.getElementById('error');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	validateForm();
});

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function validateForm(){
	const nameEl = name.value.trim();
	const emailEl = email.value.trim();
	const messageEl = message.value.trim();

	if(nameEl == ""){
		document.getElementById('name-err').innerHTML = "please enter your name";
	} else if(nameEl !== ""){
		document.getElementById('name-err').innerHTML = "";
	}
	if(emailEl == ""){
		document.getElementById('email-err').innerHTML = "please enter your email";
	}
	else if (emailEl.match(emailRegex)) {
		  document.getElementById('email-err').innerHTML = "";
	  } else {
		document.getElementById('email-err').innerHTML = "please enter a valid email";
	  }

	if(messageEl == ""){
		document.getElementById('msg-err').innerHTML = "please type a message";
    }
	
	else if(messageEl !== "" && nameEl !== "" && emailEl.match(emailRegex)){
		document.getElementById('msg-err').innerHTML = "";
		alert('message sent successfully');
		form.reset();
	}	else {
		return false;
	}
}



