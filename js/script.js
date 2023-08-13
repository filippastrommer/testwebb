function init() {
  document.getElementById("scrollBtn1").addEventListener("click", scrollToDiv1);
  document.getElementById("scrollBtn2").addEventListener("click", scrollToDiv2);
  document.getElementById("scrollBtn3").addEventListener("click", scrollToDiv3);
  document.getElementById("scrollBtn4").addEventListener("click", scrollToDiv4);
}
window.onload = init;
function scrollToDiv1() {
  document.getElementById("bildkronoberg").scrollIntoView({ behavior: 'smooth' });

}

function scrollToDiv2() {
  document.getElementById("bildkalmar").scrollIntoView({ behavior: 'smooth' });

}

function scrollToDiv3() {
  document.getElementById("bildjönköping").scrollIntoView({ behavior: 'smooth' });

}

function scrollToDiv4() {
  document.getElementById("bildöland").scrollIntoView({ behavior: 'smooth' });

}


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("scroll", function () {
  let scrollToTopButton = document.getElementById("scrollToTopButton");
  if (window.pageYOffset > 30) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

